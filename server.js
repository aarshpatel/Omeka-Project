const express = require("express");
const app = express();
const path = require("path");
const request = require("then-request");
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM('<html></html>');
var $ = require('jquery')(window);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/src"));

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/search/:query", function(req, res) {
    query_term = req.params.query;

    resource_template_ids = {
        6: "Professor",
        5: "Course",
        9: "Final Report",
        2: "Class Material or Assignment",
        10: "Moodle Course",
        3: "Syllabus"
    };

    text_color = {
        6: "blue",
        5: "green",
        9: "red",
        2: "red",
        10: "red",
        3: "red"
    };

    all_items_api_link = "http://resourcescopy.5colldh.org/api/items";

    request("GET", all_items_api_link).done(function(response){
        all_items = JSON.parse(response["body"]);
        all_relevant_items = [];
        for(var idx in all_items) {
            if('dcterms:title' in all_items[idx] && all_items[idx]["dcterms:title"][0]["@value"].toLowerCase().includes(query_term) ) {
                if(all_items[idx]["o:resource_template"]["o:id"] == 6 || all_items[idx]["o:resource_template"]["o:id"] == 5) {
                    title_of_item = all_items[idx]["dcterms:title"][0]["@value"];
                    id_of_item = all_items[idx]["o:id"];
                    type = resource_template_ids[all_items[idx]["o:resource_template"]["o:id"]];
                    color = text_color[all_items[idx]["o:resource_template"]["o:id"]];
                    all_relevant_items.push({"title": title_of_item, "id": id_of_item, "type": type, "color": color});
                }
            }
        }
        console.log(all_relevant_items);
        res.render("search-results", {"results": all_relevant_items});
    });
});

app.get("/institution/:id", function(req, res) {
    all_professors_api_link = "http://resourcescopy.5colldh.org/api/items?resource_template_id=6";
    request("GET", all_professors_api_link).done(function(response) {
        all_professors = JSON.parse(response["body"]);
        professors_in_institution = [];
        for(var idx in all_professors) {
            if("HERO_:College" in all_professors[idx]) {
                if(all_professors[idx]["HERO_:College"][0]["value_resource_id"] == req.params.id) {
                    name = all_professors[idx]["dcterms:title"][0]["@value"];
                    id = all_professors[idx]["o:id"];
                    department = "";
                    if("HERO_:Departmentname" in all_professors[idx]) {
                        department = all_professors[idx]["HERO_:DepartmentName"][0]["@value"];
                    }
                    professors_in_institution.push({"name": name, "id": id, "department": department});
                }
            }
            else if("HERO_:University" in all_professors[idx]) {
                if(all_professors[idx]["HERO_:University"][0]["value_resource_id"] == req.params.id) {
                    name = all_professors[idx]["dcterms:title"][0]["@value"];
                    id = all_professors[idx]["o:id"];
                    department = "";
                    if("HERO_:Departmentname" in all_professors[idx]) {
                        department = all_professors[idx]["HERO_:DepartmentName"][0]["@value"];
                    }
                    department = all_professors[idx]["HERO_:DepartmentName"][0]["@value"];
                    professors_in_institution.push({"name": name, "id": id, "department": department});
                }
            }
        }

        console.log(professors_in_institution);
        res.render("professors", {"professors": professors_in_institution});
    });

});

app.get("/professor/:id", function(req, res) {
    // show all courses taught by the professor
    console.log(req.params.id);
    professor_api_link = "http://resourcescopy.5colldh.org/api/items/" + String(req.params.id);

    request("GET", professor_api_link).done(function(response) {
        professor_data = JSON.parse(response["body"]);
        professor_parsed_data = {}

        professor_parsed_data["Name"] = professor_data["dcterms:title"][0]["@value"];
        if("HERO_:TeacherRank" in professor_data) {
            professor_parsed_data["TeacherRanks"] = [];
            for(var idx in professor_data["HERO_:TeacherRank"]) {
               professor_parsed_data["TeacherRanks"].push(professor_data["HERO_:TeacherRank"][idx]["@value"]);
            }
        }

        if("HERO_:DepartmentName" in professor_data) {
            professor_parsed_data["DepartmentName"] = professor_data["HERO_:DepartmentName"][0]["@value"];
        }

        if("HERO_:University" in professor_data) {
            professor_parsed_data["University"] = professor_data["HERO_:University"][0]["display_title"];
            professor_parsed_data["UniversityID"] = professor_data["HERO_:University"][0]["value_resource_id"];
        }

        if("HERO_:College" in professor_data) {
            professor_parsed_data["College"] = professor_data["HERO_:College"][0]["@value"];
            professor_parsed_data["CollegeID"] = professor_data["HERO_:College"][0]["value_resource_id"];
        }

        if("HERO_:TeacherHomePageURL" in professor_data) {
            professor_parsed_data["TeacherHomePageURL"] = professor_data["HERO_:TeacherHomePageURL"][0]["@id"];
        }

        // res.render("professor", {"professor": professor_parsed_data});

        all_courses_api_link = "http://resourcescopy.5colldh.org/api/items?resource_template_id=5";
        request("GET", all_courses_api_link).done(function(response) {
            all_courses = JSON.parse(response["body"]);
            courses_taught_by_professor = [];
            for(var idx in all_courses) {
                all_profs = []
                for(var idx_prof in all_courses[idx]["gvp:ulan2675_professor_was"]) {
                    all_profs.push(all_courses[idx]["gvp:ulan2675_professor_was"][idx_prof]["value_resource_id"])
                }

                // this is the course that was taught by the requested professor
                if(all_profs.includes(Number(req.params.id))) {
                    course_title = all_courses[idx]["dcterms:title"][0]["@value"];
                    course_id = all_courses[idx]["o:id"];
                    course_date = "No Date";
                    if("dcterms:date" in all_courses[idx]) {
                        course_date = all_courses[idx]["dcterms:date"][0]["@value"];
                    }
                    courses_taught_by_professor.push({"name": course_title, "id": course_id, "date": course_date});
                }
            }
            console.log(courses_taught_by_professor);
            professor_parsed_data["courses"] = courses_taught_by_professor;
            res.render("professor", {"professor": professor_parsed_data});
        });
    });

});

app.get("/course/:id", function(req, res) {
    // show course info
    course_id = req.params.id;
    course_data_api_url = "http://resourcescopy.5colldh.org/api/items/" + String(course_id);
    request("GET", course_data_api_url).done(function(response){
        course_data = JSON.parse(response["body"]);
        parsed_course_data = parse_course(course_data);
        parsed_course_data["leaf_items"] = [];

        all_items_rest_url = "http://resourcescopy.5colldh.org/api/items";
        request("GET", all_items_rest_url).done(function(response) {
            var all_data = JSON.parse(response["body"]);

            // parse through all items and find the course items
            for(var item_idx in all_data) {
                if("HERO_:CourseTitle" in all_data[item_idx]) {
                    if(all_data[item_idx]["HERO_:CourseTitle"][0]["value_resource_id"] == String(course_id)) {
                        course_leaf_item = all_data[item_idx];
                        parsed_course_item = parse_leaf_item(course_leaf_item);
                        parsed_course_data["leaf_items"].push(parsed_course_item);
                    }
                }
            }
            leaf_items_chart = [];
            for(var idx in parsed_course_data["leaf_items"]){
                title = parsed_course_data["leaf_items"][idx]["Title"]
                leaf_items_chart.push({collapsed:true, "text": {"name": title}});
            }

            console.log("leaf charts: ", leaf_items_chart);

            var chart_config = {
                chart: {
                    container: "#collapsable-example",

                    animateOnInit: true,

                    node: {
                        collapsable: true
                    },
                    animation: {
                        nodeAnimation: "easeOutBounce",
                        nodeSpeed: 700,
                        connectorsAnimation: "bounce",
                        connectorsSpeed: 700
                    }
                },
                nodeStructure: {
                    text: {"name": parsed_course_data["universities"][0][0]},
                    children: [
                        {
                            text: {"name": parsed_course_data["DepartmentName"]},
                            collapsed: true,
                            children: [
                                {
                                    text: {"name": parsed_course_data["professors"][0][0]},
                                    children: [
                                        {
                                            text: {"name": parsed_course_data["Title"]},
                                            collapsed: true,
                                            children: leaf_items_chart
                                        }
                                    ],
                                    collapsed: true
                                }
                            ]
                       }
                    ]
                }
            };
            res.render("course", {"course": parsed_course_data, "config": chart_config});
        });
    });
});

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
    parsed_leaf_data["id"] = leaf_data["o:id"];

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

app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});
