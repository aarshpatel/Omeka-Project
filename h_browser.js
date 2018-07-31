$(document).ready(function() {
    
    $("#submitCourseID").click(function(e) {
        e.preventDefault();
        var courseID = Number($('#courseID').val());
        $("#courseID").val("");

        // get all of the data needed for that course item
        rest_api_url_item= "http://resourcescopy.5colldh.org/api/items/" + String(courseID);
        get_context_for_course(courseID);

    });

    function get_item_request(rest_api_url, callback) { 
        request("GET", rest_api_url).done(function(response) {
            callback(response["body"]);
        });
    }
    
    function get_item_data(rest_api_url) {
        get_item_request(rest_api_url_item, function(body) {
            var item_data = JSON.parse(body);
            if(item_data["o:resource_template"]["o:id"] == 5) {
                // parse course data
                parsed_course = parse_course(item_data);
                console.log(parsed_course);
                write_course_contents(parsed_course);
            } 
            else if(item_data["o:resource_template"]["o:id"] == 2 || item_data["o:resource_template"]["o:id"] == 3 || item_data["o:resource_template"]["o:id"] == 9 || item_data["o:resource_template"]["o:id"] == 7) {
                // parse leaf items (course media, syllabus, final assignments/reports)
                // these leaf items must be connected to some upper level element in the tree structure
    
                parsed_leaf_item = parse_leaf_item(item_data);
                console.log(parsed_leaf_item);
            }
    
        });
    }

    function parse_course(course_data) {
        parsed_course = {}
    
        // parse course id  
        course_id = course_data["o:id"];
        parsed_course["CourseID"] = course_id;
    
        // parse title
        title = course_data["dcterms:title"][0]["@value"];
        parsed_course["Title"] = title;
    
        // parse Department Name
        department_name = course_data["HERO_:DepartmentName"][0]["@value"];
        parsed_course["DepartmentName"] = department_name;
    
       // parse professors
        professors = [];
        all_professors = course_data["gvp:ulan2675_professor_was"];
        for(var idx in all_professors) {
            professor_name = all_professors[idx]["display_title"];
            professor_id = all_professors[idx]["value_resource_id"];
            professors.push([professor_name, professor_id]);
        }
        parsed_course["professors"] = professors;
    
        // parse colleges
        colleges = [];
        all_colleges = course_data["HERO_:College"];
        for(var idx in all_colleges) {
            college_name = all_colleges[idx]["display_title"];
            college_id = all_colleges[idx]["value_resource_id"];
            colleges.push([college_name, college_id]);
        }
        parsed_course["colleges"] = colleges;
    
        // parse university
        universities = [];
        all_universities = course_data["HERO_:University"];
        for(var idx in all_universities) {
            university_name = all_universities[idx]["display_title"];
            university_id = all_universities[idx]["value_resource_id"];
            universities.push([university_name, university_id]);
        }
        parsed_course["universities"] = universities;
    
        // parse description
        description = course_data["dcterms:description"][0]["@value"];
        parsed_course["Description"] = description;
    
        // parse course code
        if("HERO_:CourseCode" in course_data) {
            course_code = course_data["HERO_:CourseCode"][0]["@value"];
            parsed_course["CourseCode"] = course_code;
        }
    
        // parse course date
        if("dcterms:date" in course_data) {
            course_date = course_data["dcterms:date"][0]["@value"];
            parsed_course["Date"] = course_date;
        }
        return parsed_course;
    }

    function parse_leaf_item(leaf_data) {
        parsed_leaf_data = {}

        // parse title of the leaf
        title = leaf_data["dcterms:title"][0]["@value"]
        parsed_leaf_data["Title"] = title;

        // parse professors that relate to this leaf item
        if("gvp:ulan2675_professor_was" in leaf_data) {
            professors = [];
            all_professors = leaf_data["gvp:ulan2675_professor_was"];
            for(var idx in all_professors) {
                professor_name = all_professors[idx]["display_title"];
                professor_id = all_professors[idx]["value_resource_id"];
                professors.push([professor_name, professor_id]);
            }
            parsed_leaf_data["professors"] = professors; 
        }

        // parse the description
        if("dcterms:description" in leaf_data) {
            description = leaf_data["dcterms:description"][0]["@value"];
            parsed_leaf_data["Description"] = description;
        }

        // parse the course that relates to this leaf item
        course_title = leaf_data["HERO_:CourseTitle"][0]["display_title"];
        parsed_leaf_data["CourseTitle"] = course_title;

        course_id = leaf_data["HERO_:CourseTitle"][0]["value_resource_id"];
        parsed_leaf_data["CourseID"] = "http://resourcescopy.5colldh.org/api/items/" + String(course_id);

        // type of leaf item
        if(leaf_data["o:resource_template"]["o:id"] == 3) {
            relationship = "Course Syllabus";
        } else if(leaf_data["o:resource_template"]["o:id"] == 2) {
            relationship = "isPartOf";
        } else if(leaf_data["o:resource_template"]["o:id"] == 9) {
            relationship = "Final Report";
        } else if(leaf_data["o:resource_template"]["o:id"] == 7) {
            relationship = "isPartOf";
        } else if(leaf_data["o:resource_template"]["o:id"] == 10) {
            relationship = "isPartOf";
        }

        parsed_leaf_data["relationship"] = relationship;

        // parse the uses
        if("gvp:aat2418_uses" in leaf_data) {
            all_uses = [];
            for(var idx in leaf_data["gvp:aat2418_uses"]) {
                use = leaf_data["gvp:aat2418_uses"][idx]["display_title"];
                use_id = leaf_data["gvp:aat2418_uses"][idx]["value_resource_id"];
                all_uses.push([use, use_id]);
            }
            parsed_leaf_data["gvp:aat2418_uses"] = all_uses;
        }
        
        return parsed_leaf_data;
    }

    function connect_course_to_leaf_items(course_id) {
        all_items_rest_url = "http://resourcescopy.5colldh.org/api/items";
        get_item_request(all_items_rest_url, function(body) {
            var all_data = JSON.parse(body);

            // parse through all items and find the course items
            var all_course_leaf_items = [];
            for(var item_idx in all_data) {
                if("HERO_:CourseTitle" in all_data[item_idx]) {
                    if(all_data[item_idx]["HERO_:CourseTitle"][0]["value_resource_id"] == course_id) {
                        course_leaf_item = all_data[item_idx];
                        parsed_course_item = parse_leaf_item(course_leaf_item);
                        all_course_leaf_items.push(parsed_course_item);
                    }
                }
            }

            $("#courseContent").append("<br /> <br /> <strong>Course Leaf Items<strong>: <hr id='course_leaf_items_line'/>");
            
            for(var idx in all_course_leaf_items) {
                write_leaf_item(all_course_leaf_items[idx]);
            }

        });
    }

    function get_context_for_course(course_id) {
        rest_api_url_item= "http://resourcescopy.5colldh.org/api/items/" + String(course_id);

        // get the course contents
        get_item_data(rest_api_url_item);

        // get course leaf items
        connect_course_to_leaf_items(course_id);

    }

    function write_course_contents(course_contents) {

        $("#courseContent").append("<strong>Title</strong>: " + course_contents["Title"]);
        $("#courseContent").append("<br/>");

        // professors
        $("#courseContent").append("<strong>Professors (ulan2675_professor_was) </strong>: ");
        for(var idx in course_contents["professors"]) {
            prof_external_link = "http://resourcescopy.5colldh.org/s/blend/item/" + course_contents["professors"][idx][1];
            prof_link = "<a href='" + prof_external_link + "'>" + course_contents["professors"][idx][0] + "</a>   ";
            console.log(prof_link);
            $("#courseContent").append(prof_link);
        }

        $("#courseContent").append("<br/>");

        // department name
        $("#courseContent").append("<strong>Department Name</strong>: " + course_contents["DepartmentName"]); 
        $("#courseContent").append("<br/>");
        
        // date
        $("#courseContent").append("<strong>Date</strong>: " + course_contents["Date"]); 
        $("#courseContent").append("<br/>");
    
        
        // colleges
        if(course_contents["colleges"].length > 0) {
            $("#courseContent").append("<strong>Colleges</strong>: "); 
            for(var idx in course_contents["colleges"]) {
                college_external_link = "http://resourcescopy.5colldh.org/s/blend/item/" + course_contents["colleges"][idx][1];
                college_link = "<a href='" + college_external_link + "'>" + course_contents["colleges"][idx][0] + "</a>   ";
                $("#courseContent").append(college_link);
            }
        }
        
        // universities
        if(course_contents["universities"].length > 0) {
            $("#courseContent").append("<strong>Universities</strong>: "); 
            for(var idx in course_contents["universities"]) {
                university_external_link = "http://resourcescopy.5colldh.org/s/blend/item/" + course_contents["universities"][idx][1];
                university_link = "<a href='" + university_external_link + "'>" + course_contents["universities"][idx][0] + "</a>   ";
                $("#courseContent").append(university_link);
            }
        }

        // description
        $("#courseContent").append("<br />");
        $("#courseContent").append("<strong>Description</strong>: " + course_contents["Description"]); 
        $("#courseContent").append("<br />");

    }

    function write_leaf_item(leaf_contents) {
        // title of leaf
        $("#courseContent").append("<strong>Title</strong>: " + leaf_contents["Title"]);
        $("#courseContent").append("<br />");

        // relationship to the course
        $("#courseContent").append("<strong>Relationship to Course</strong>: " + leaf_contents["relationship"]);
        $("#courseContent").append("<br /> <br /> <br />");

    }

    function get_all_institutions() {
        institutions_api_link = "http://resourcescopy.5colldh.org/api/items?item_set_id=7"
        request("GET", institutions_api_link).done(function(response) {
            all_institutions = JSON.parse(response["body"])
            console.log(all_institutions);
            institutions_parsed = {}
            for(var idx in all_institutions) {
                institution_name = all_institutions[idx]["dcterms:title"][0]["@value"];
                institution_id = all_institutions[idx]["o:id"];
                institutions_parsed[institution_name] = institution_id;
            }
        });

    }

    function find_all_departments(institution) {
    }

    // get_all_institutions();

});
