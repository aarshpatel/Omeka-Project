var request = require("request");
var argv = require('minimist')(process.argv.slice(2));

// get the item number that you want the context for
item_num = argv["item"];

rest_api_url_item= "http://resourcescopy.5colldh.org/api/items/" + String(item_num)

function get_request_on_items(rest_api_url, callback) {
    // parse course item data
    request(rest_api_url, function(error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
        } else {
            callback(body);
        }
    });
}

get_request_on_items(rest_api_url_item, function(body) {
    var item_data = JSON.parse(body);
    if (item_data["o:resource_template"]["o:id"] === 5) {
        parsed_course_contents = parse_course(item_data);

        course_title = parsed_course_contents["title"];
        console.log("Course Info: ");
        console.log(parsed_course_contents);
        
        rest_api_all_courses = "http://resourcescopy.5colldh.org/api/items"

        console.log("Course HasPart: ");
        get_request_on_items(rest_api_all_courses, function(body) {
            var all_courses = JSON.parse(body);
            for(var course_idx in all_courses) {
                if("dcterms:isPartOf" in all_courses[course_idx] && all_courses[course_idx]["dcterms:isPartOf"][0]["display_title"] == course_title) {
                    console.log(all_courses[course_idx]["dcterms:title"][0]["@value"]);
                }
            }
        });



    } else {
        // parse other items (syllabus, course_media, final reports)
        console.log("Parsing non Course Item");
        parents = parse_leaves(item_data);
        course_id = parents[0]["course_id"];
        new_rest_api_url = "http://resourcescopy.5colldh.org/api/items/" + String(course_id);
        get_request_on_items(new_rest_api_url, function(body) {
            var item_data = JSON.parse(body);
            parsed_course_contents = parse_course(item_data);
            title = parsed_course_contents["title"] + " " + parsed_course_contents["date"];     
            university = parsed_course_contents["University"];
            department = parsed_course_contents["DepartmentName"];
            console.log("Title: ", title);
            console.log("University: ", university);
            console.log("Department: ", department);
            
            
            rest_api_all_courses = "http://resourcescopy.5colldh.org/api/items?resource_template_id=5"

            get_request_on_items(rest_api_all_courses, function(body) {
                    var all_courses = JSON.parse(body);     

                    console.log("All courses taught in the same college and same department: ");
                    all_departments_in_university = find_all_courses_in_dep_at_university(all_courses, department, university);
                    console.log(all_departments_in_university);   


                    // for(var department_idx in all_departments_in_university) {
                    //     department_name = all_departments_in_university[department_idx]
                    //     filtered_courses = find_all_courses_in_dep_at_university(all_courses, department_name, university);
                    //     console.log(department_name, filtered_courses);
                    // }
            });
        });
    }
});

// parse the course data for all of its contents
function parse_course(course_data) {
    course_contents = {};
    
    for(var key in course_data) {
        if(key == "dcterms:title") {
            title = course_data[key][0]["@value"];
            course_contents["title"] = title;
        }
        else if (key == "dcterms:date"){
            date = course_data[key][0]["@value"];
            course_contents["date"] = date;
        }
        else if (key == "HERO_:DepartmentName") {
            department_name = course_data[key][0]["@value"];
            course_contents["DepartmentName"] = department_name;
        }
        else if (key == "HERO_:CourseCode") {
            course_code = course_data[key][0]["@value"];
            course_contents["CourseCode"] = course_code;
        }
        else if (key == "gvp:ulan2675_professor_was") {
            professors = []
            for(var idx in course_data[key]) {
                professors.push(course_data[key][idx]["display_title"]);
            }
            course_contents["Professors"] = professors;            
        }
        else if (key == "HERO_:University") {
            university = course_data[key][0]["display_title"];
            course_contents["University"] = university;
        }
        else if (key == "dcterms:description") {
            description = course_data[key][0]["@value"];
            course_contents["description"] = description;
        }
        else if (key == "HERO_:CourseSyllabus") {
            syllabus = course_data[key][0]["display_title"];
            course_contents["CourseSyllabus"] = syllabus;
        }
        else if (key == "dcterms:hasPart") {
            children = []
            for(var parts in course_data[key]) {
                children.push(course_data[key][parts]["display_title"]);
            }
            course_contents["hasPart"] = children;
        }
    }

    return course_contents;
}

// parse the leaves and get its context
function parse_leaves(item) {
    parents = [];
    if("dcterms:isPartOf" in item) {
        for(var idx in item["dcterms:isPartOf"]) {
            course_id = item["dcterms:isPartOf"][idx]["value_resource_id"];
            course_title = item["dcterms:isPartOf"][idx]["display_title"];
            parents.push({"course_title":course_title, "course_id": course_id});
        }
    }

    return parents;
}

function find_all_departments_in_college(all_courses, university) {
    all_departments = [];
    for(var course_idx in all_courses) {
        course = all_courses[course_idx];
        if("HERO_:DepartmentName" in course && "HERO_:University" in course) {
            if(course["HERO_:University"][0]["display_title"] === university) {
                all_departments.push(course["HERO_:DepartmentName"][0]["@value"]);
            }
        }
    }
    return all_departments;
}
// find all the other courses in the same department and the college
function find_all_courses_in_dep_at_university(all_courses, dep, university) {    
    filtered_courses = [];
    
    for(var course_idx in all_courses) {        
        course = all_courses[course_idx];
        if("HERO_:DepartmentName" in course && "HERO_:University" in course) {
            if(course["HERO_:DepartmentName"][0]["@value"] === dep && course["HERO_:University"][0]["display_title"] === university) {
                parsed_course_contents = parse_course(course);
                filtered_courses.push(parsed_course_contents);
            }
        }
    }
    return filtered_courses;
}


