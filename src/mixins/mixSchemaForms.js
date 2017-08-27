export default {
    data: function () {
        return {
            contractMissionStatementModel: {
                motivations: null,
                purpose: null,
                values: null,
                userId: this.account.sub
            },
            contractMissionStatementSchema: {
                fields: [
                    {
                        type: "editor",
                        label: "Motivations",
                        model: "motivations",
                        height: 200,
                        content: "<h3>Examples - Host a Podcast, build applications, etc.</h3>"

                    },
                    {
                        type: "editor",
                        label: "Purpose",
                        model: "purpose",
                        height: 200,
                        content: "<h3>What is your intent in this passion? I.E embrace change with technology, improve my neighborhood.</h3>"

                    },
                    {
                        type: "editor",
                        label: "Life's Values",
                        model: "values",
                        height: 200,
                        content: "<h3>Justice, Liberty, Integrity, Clear communication</h3>"

                    }
                ]
            },
            programModel: {
                name: null,
                programId: Math.floor(Math.random() * 3307),
                gradesValue_1: null
            },
            programSchema: {
                fields: [
                     {
                        type: "input",
                        label: "Program Name",
                        model: "name"
                    },{
                        type: "input",
                        label: "Program ID",
                        model: "programId"
                    },{
                        type: "input",
                        label: "Course",
                        model: "gradesValue_1"
                    }                 
                ]
            },
            contractQuestionModel: {
                qcontractName: null,
                qcontractValue_1: null,
                qcontractType: null,
                qcontractModel: null
            },
            contractQuestionSchema: {
                fields: [
                    {
                        type: "input",
                        label: "Question Name",
                        model: "qcontractName"
                    },
                    {
                        type: "input",
                        label: "Form Model Name",
                        model: "qcontractModel"
                    },
                    {
                        type: "select",
                        label: "form type",
                        model: "qcontractType",
                        values: ["select", "text", "text-area"]
                    },
                    {
                        type: "input",
                        label: "Question Value(s)",
                        model: "qcontractValue_1"
                    },

                ]
            },
            manageQuestionModel: {
                id: null,
                question: null,
                answer: null,
                selections: [],
                explanation: null,
                coursetype: null,
                modtype: null,
                koan: null
            },
            manageQuestionSchema: {
                fields: [
                    {
                        type: "text-area",
                        label: "question",
                        model: "question"
                    },
                    {
                        type: "text-area",
                        label: "answer",
                        model: "answer"
                    },
                    {
                        type: "input",
                        label: "explanation",
                        model: "explanation"
                    },
                    {
                        type: "select",
                        label: "coursetype",
                        model: "coursetype",
                        values: ["Math", "Science", "Language", "Civics"]
                    },
                    {
                        type: "select",
                        label: "Selections",
                        model: "selections"
                    },
                    {
                        type: "select",
                        label: "modtype",
                        model: "modtype",
                        values: ["Intro", "Algebra", "Statistics", "Geometry", "Immigration", "US.Gov"]
                    },
                    {
                        type: "select",
                        label: "Koan",
                        model: "koan",
                        values: ["ASVAB", "GED", "CW"]
                    }
                ]
            },
            createAdminModel: {
                id: 33,
                username: null,
                password: null
            },
            createAdminSchema: {
                fields: [
                    {
                        type: "input",
                        label: "Add Content",
                        model: "ContentHints"
                    },
                    {
                        type: "input",
                        label: "Admin Videos",
                        model: "VideoHints"
                    }
                ]
            },
            throwAwayModel: {
                id: "555",
                tradios: null
            },
            throwAwaySchema: {
                fields: [
                    {
                        type: "questions",
                        model: "tradios",

                        values: ["val1", "val2", "val3"]
                    }
                ]
            },
            questionMaterialModel: {
                id: null,
                questionhint: "question hint",
                videoHint: "video hint",
                questionId: "6"
            },
            questionMaterialSchema: {
                fields: [
                    {
                        type: "text-area",
                        label: "Add Material",
                        model: "questionhint"

                    },
                    {
                        type: "input",
                        label: "Add Video",
                        model: "videoHint"

                    },
                    {
                        type: "input",
                        label: "Question Key",
                        model: "questionId"
                    }
                ]
            },
            questionFormModel: {
                id: 1,
                question: null,
                coursetype: null,
                modtype: null,
                koan: null,
                answerId: null,
                explanation: null,
                questionValue_1: null,


            },
            questionFormSchema: {
                fields: [
                    {
                        type: "editor",
                        label: "Create Question,",
                        model: "question",
                        height: 200,
                        content: "<h3>Question Editor</h3>"

                    },
                    {
                        type: "select",
                        label: "coursetype",
                        model: "coursetype",
                        values: ["Math", "Science", "Language", "Civics"]
                    },
                    {
                        type: "select",
                        label: "modtype",
                        model: "modtype",
                        values: ["Intro", "Algebra", "Statistics", "Geometry", "Immigration", "US.Gov"]
                    },{
                        type: "select",
                        label: "Koan",
                        model: "koan",
                        values: ["GED","ASVAB","CW"]
                    },
                    {
                        type: "input",
                        label: "Correct Question #",
                        model: "answerId",

                    },
                    {
                        type: "editor",
                        label: "Explanation",
                        model: "explanation",
                        height: 200,
                        content: "<h3>Provide an Explanation</h3>"
                    },
                    {
                        type: "input",
                        label: "Question 1",
                        model: "questionValue_1"
                    }
                ]
            },
            selectionFormModel: {
                id: 2,
                selection1: null,
                selection2: null,
                selection3: null,
                selection4: null
            },
            selectionFormSchema: {
                fields: [
                    {
                        type: "input",
                        label: "Selection1",
                        model: "selection1"
                    },
                    {
                        type: "input",
                        label: "Selection 2",
                        model: "selection2"
                    },
                    {
                        type: "input",
                        label: "Selection 3",
                        model: "selection3"
                    },
                    {
                        type: "input",
                        label: "Selection 4",
                        model: "selection4"
                    }
                ]
            }




        }
    }





}