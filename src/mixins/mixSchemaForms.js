export default {
    data: function () {
        return {

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
                type: null
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
                answer: null,
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
                    },
                    {
                        type: "editor",
                        label: "Answer",
                        model: "answer",
                        height: 200,
                        content: "<h3>Answer</h3>"

                    },
                    {
                        type: "text-area",
                        label: "Explanation",
                        model: "explanation"
                    },
                    {
                        type: "input",
                        label: "Selection Value",
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