
    var chart_config = {
        chart: {
            container: "#collapsable-example",

            connectors: {
                type: "bCurve",
                style: {
                    "stroke-width": 1.5
                }
            },

            levelSeparation: 60,

            animateOnInit: true,
            animateOnInitDelay: 500,
            node: {
                collapsable: true
            },
            animation: {
                nodeAnimation: "easeOutBounce",
                nodeSpeed: 500,
                connectorsAnimation: "bounce",
                connectorsSpeed: 500
            }
        },
        nodeStructure: {
            text: {
              "name": "Blended Learning"  
            },
            children: [
                {
                    text: {"name": "UMass Amherst"},
                    children: [
                        {
                            text: {
                                "name": "Psychological and Brain Sciences"
                            },
                            HTMLclass: "department",
                            collapsed: true,
                            children: [
                                {
                                    text: {"name": "Ashley Woodman"},
                                    collapsed: true,
                                    stackChildren: true,
                                    children: [
                                        {
                                            text: {"name": "Impact of Disabilities on Families"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Impact of Disabilities on Familes"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Assignment 3"}
                                                },
                                                {
                                                    text: {"name": "Final Report"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        },
                                        {
                                            text: {"name": "Test Course"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Test Course"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    text: {"name": "Aarsh Patel"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Impact of Disabilities on Families"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Impact of Disabilities on Familes"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Assignment 3"}
                                                },
                                                {
                                                    text: {"name": "Final Report"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        },
                                        {
                                            text: {"name": "Test Course"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Test Course"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    text: {"name": "Matthew Mattingly"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Impact of Disabilities on Families"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Impact of Disabilities on Familes"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Assignment 3"}
                                                },
                                                {
                                                    text: {"name": "Final Report"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        },
                                        {
                                            text: {"name": "Test Course"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Test Course"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Visual Journalism"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    text: {"name": "Brian McDermott"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Introduction to Visual Storytelling"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Introduction to Visual Storytelling"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Environmental Conservation"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    text: {"name": "Charlie Schweik"},
                                    children: [
                                        {
                                            text: {"name": "Introduction to Visual Storytelling"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Introduction to Visual Storytelling"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Music and Dance"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    "text": {"name": "Christopher White"},
                                    children: [
                                        {
                                            text: {"name": "Fundamentals of Music Theory"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Fundamentals of Music Theory"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                { 
                    text: {"name": "Smith College"},
                    children: [
                        {
                            text: {
                                "name": "Psychological and Brain Sciences"
                            },
                            HTMLclass: "department",
                            collapsed: true,
                            children: [
                                {
                                    text: {"name": "Ashley Woodman"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Impact of Disabilities on Families"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Impact of Disabilities on Familes"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Assignment 3"}
                                                },
                                                {
                                                    text: {"name": "Final Report"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        },
                                        {
                                            text: {"name": "Test Course"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Test Course"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Visual Journalism"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    text: {"name": "Brian McDermott"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Introduction to Visual Storytelling"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Introduction to Visual Storytelling"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Environmental Conservation"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    text: {"name": "Charlie Schweik"},
                                    children: [
                                        {
                                            text: {"name": "Introduction to Visual Storytelling"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Introduction to Visual Storytelling"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Music and Dance"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    "text": {"name": "Christopher White"},
                                    children: [
                                        {
                                            text: {"name": "Fundamentals of Music Theory"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Fundamentals of Music Theory"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                { 
                    text: {"name": "Hampshire College"},
                    children: [
                        {
                            text: {
                                "name": "Psychological and Brain Sciences"
                            },
                            HTMLclass: "department",
                            collapsed: true,
                            children: [
                                {
                                    text: {"name": "Ashley Woodman"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Impact of Disabilities on Families"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Impact of Disabilities on Familes"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Assignment 3"}
                                                },
                                                {
                                                    text: {"name": "Final Report"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        },
                                        {
                                            text: {"name": "Test Course"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Test Course"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Visual Journalism"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    text: {"name": "Brian McDermott"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Introduction to Visual Storytelling"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Introduction to Visual Storytelling"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Environmental Conservation"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    text: {"name": "Charlie Schweik"},
                                    children: [
                                        {
                                            text: {"name": "Introduction to Visual Storytelling"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Introduction to Visual Storytelling"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Music and Dance"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    "text": {"name": "Christopher White"},
                                    children: [
                                        {
                                            text: {"name": "Fundamentals of Music Theory"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Fundamentals of Music Theory"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                { 
                    text: {"name": "Amherst College"},
                    children: [
                        {
                            text: {
                                "name": "Psychological and Brain Sciences"
                            },
                            HTMLclass: "department",
                            collapsed: true,
                            children: [
                                {
                                    text: {"name": "Ashley Woodman"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Impact of Disabilities on Families"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Impact of Disabilities on Familes"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Assignment 3"}
                                                },
                                                {
                                                    text: {"name": "Final Report"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        },
                                        {
                                            text: {"name": "Test Course"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Test Course"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Visual Journalism"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    text: {"name": "Brian McDermott"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Introduction to Visual Storytelling"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Introduction to Visual Storytelling"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Environmental Conservation"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    text: {"name": "Charlie Schweik"},
                                    children: [
                                        {
                                            text: {"name": "Introduction to Visual Storytelling"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Introduction to Visual Storytelling"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Music and Dance"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    "text": {"name": "Christopher White"},
                                    children: [
                                        {
                                            text: {"name": "Fundamentals of Music Theory"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Fundamentals of Music Theory"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                { 
                    text: {"name": "Mount Holyoke"},
                    children: [
                        {
                            text: {
                                "name": "Psychological and Brain Sciences"
                            },
                            HTMLclass: "department",
                            collapsed: true,
                            children: [
                                {
                                    text: {"name": "Ashley Woodman"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Impact of Disabilities on Families"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Impact of Disabilities on Familes"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Assignment 3"}
                                                },
                                                {
                                                    text: {"name": "Final Report"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        },
                                        {
                                            text: {"name": "Test Course"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Test Course"},
                                                },
                                                {
                                                    text: {"name": "Assignment 1"}
                                                },
                                                {
                                                    text: {"name": "Assignment 2"}
                                                },
                                                {
                                                    text: {"name": "Course Media 1"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Visual Journalism"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    text: {"name": "Brian McDermott"},
                                    collapsed: true,
                                    children: [
                                        {
                                            text: {"name": "Introduction to Visual Storytelling"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Introduction to Visual Storytelling"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Environmental Conservation"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    text: {"name": "Charlie Schweik"},
                                    children: [
                                        {
                                            text: {"name": "Introduction to Visual Storytelling"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Introduction to Visual Storytelling"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: {
                                "name": "Music and Dance"
                            },
                            collapsed: true,
                            HTMLclass: "department",
                            children: [
                                {
                                    "text": {"name": "Christopher White"},
                                    children: [
                                        {
                                            text: {"name": "Fundamentals of Music Theory"},
                                            collapsed: true,
                                            children: [
                                                {
                                                    text: {"name": "Syllabus for Fundamentals of Music Theory"}
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    };

/* Array approach
    var config = {
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
    malory = {
        image: "img/malory.png"
    },

    lana = {
        parent: malory,
        image: "img/lana.png"
    }

    figgs = {
        parent: lana,
        image: "img/figgs.png"
    }

    sterling = {
        parent: malory,
        childrenDropLevel: 1,
        image: "img/sterling.png"
    },

    woodhouse = {
        parent: sterling,
        image: "img/woodhouse.png"
    },

    pseudo = {
        parent: malory,
        pseudo: true
    },

    cheryl = {
        parent: pseudo,
        image: "img/cheryl.png"
    },

    pam = {
        parent: pseudo,
        image: "img/pam.png"
    },

    chart_config = [config, malory, lana, figgs, sterling, woodhouse, pseudo, pam, cheryl];

*/