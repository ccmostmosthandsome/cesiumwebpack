<script>

import VueFormGenerator from "../vue-form-generator";
import mixQuestions from "./mixQuestions";
import mixAuth from "../../auth/mixAuth";
import mixXls from "../../mixins/mixXls.js"
import clientGrid from "../grids/clientGrid.vue";
import clientModal from "../layout/clientModal.vue";
import clientRadio from "../buttons/clientRadio.vue";
import clientFileselect from "../buttons/clientFileselect.vue"
import mixPersistence from '../../mixins/mixPersistence';

export default {
    name: 'casAdmin',
    data: function () {
        return {
            questionScreen: false,
            radioNewQuestion: [
                { text: 'Upload Questions', value: 'upload'},
                { text: 'Enter New Question', value: 'input'},
            ],
            latex: null,
            modalstatus: false,
            //id	question	answer	selections	explanation	coursetype	modtype	type

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
                        type: "text-area",
                        label: "Question",
                        model: "question",
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
                        type: "input",
                        label: "Question Answer",
                        model: "answer",
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
            },
            tabIndex: null,
            tabs: [],
            tabCounter: 0


        }
    },
    components: { clientModal, clientGrid, clientRadio, clientFileselect },
    methods: {
        handleFileUpload(file){
            console.log("caught file upload",Object.keys(file),file.name);
            this.handleXlsx(file,true);
        },
        displayQuestionScreen(selected){
            console.log("dingo this was selected...",selected);
            this.questionScreen = selected;
        },
        addSelectionValue(form) {
            //Mutates state
            let model = form + 'Model',
                schema = form + 'Schema';
            let questionNumbers = this.addSelectionValue_getIndexes(model);
            this.addSelectionValue_setNewValue(questionNumbers, model, schema)
        },
        addSelectionValue_getIndexes(model) {
            console.log("dingo")
            return Object.keys(this[model])
                .reduce((acc, curr) => {
                    var indexNum = +curr.split('_')[1]
                    if (!isNaN(indexNum)) {
                        indexNum++
                        acc.push(indexNum);
                    }
                    return acc;
                }, []);
        },
        addSelectionValue_setNewValue(numbers, model, schema) {
            numbers.forEach((questionIndex) => {
                console.log("question index=>", questionIndex, !this.contractQuestionModel["qcontractValue_" + questionIndex], this.contractQuestionModel);
                if (this[model]["selectvalue_" + questionIndex] === undefined) {
                    this[model]["selectvalue_" + questionIndex] = null;
                    this[schema].fields.push(
                        {
                            "type": 'input',
                            "model": 'selectvalue_' + questionIndex,
                            "label": 'Value'
                        }
                    )

                }


            })
        },
        addQuestionMaterial() {



            this.questionMaterialModel.id = Math.floor(Math.random() * 33007);
            let request = new Request('/services/questions/add/content', {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify(this.questionMaterialModel),
                headers: this.getAuthHeader()
            });

            console.log("request?", request);
            fetch(request)
                .then((response) => {
                    console.log("dingo");
                });
            //Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that can later be released to fuel the organisms' activities (energy transformation). This chemical energy is stored in carbohydrate molecules, such as sugars, which are synthesized from carbon dioxide and water – hence the name photosynthesis, from the Greek φῶς, phōs, "light", and σύνθεσις, synthesis, "putting together".In most cases, oxygen is also released as a waste product. Most plants, most algae, and cyanobacteria perform photosynthesis; such organisms are called photoautotrophs. Photosynthesis is largely responsible for producing and maintaining the oxygen content of the Earth's atmosphere, and supplies all of the organic compounds and most of the energy necessary for life on Earth.
        },
        createQuestion() {


          this.questionFormModel.selections = this.questionFormSchema.fields.reduce((acc, curr) => {



                let value = +curr.model.split('_')[1];


                if (!isNaN(value)) {

                    acc.push(this.questionFormModel[curr.model]);

                }

                return acc;
            }, [])

            //Remove id field to leave only selections in array.
            this.questionFormModel.id = Math.floor(Math.random() * 30000);
            this.questionFormModel.questionId = Math.floor(Math.random() * 33007);

            let request = new Request('/services/questions/add', {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify(this.questionFormModel),
                headers: this.getAuthHeader()
            });

            console.log("request?", request);
            fetch(request)
                .then((response) => {
                    console.log("dingo");
                });

        },
        deleteQuestion() {
            const requestLogin = {
                method: 'DELETE',
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify(this.manageQuestionModel),
                headers: this.getAuthHeader()
            }

            fetch('/services/questions/delete', requestLogin)
                .then(function (response) {
                    console.log("dingo")
                    console.log("dingo")
                    console.log("dingo")
                    console.log("dingo")
                    if (response.ok) {

                        this.$refs.dialog.close();
                    }
                    throw (response);
                }.bind(this))
                .catch((response) => {
                    console.log("dingo");
                });
        },
        openModal(event) {
            console.log("dingo")
            console.log("dingo")
            console.log("dingo")
            this.manageQuestionModel = Object.assign(this.manageQuestionModel, {});

            this.manageQuestionModel = _.merge(this.manageQuestionModel, event);
            console.log("managequestion model", this.manageQuestionModel, event);
            console.log("dingo")
            console.log("dingo")
            console.log("dingo")
            this.$refs.dialog.openModal();

        },
        handleModal(event) {

            console.log("dingo")
            console.log("dingo")
            console.log("dingo")
            let storeQuestion = this.$store.getters.question('GED', this.manageQuestionModel.id);
            this.manageQuestionModel.questionId = storeQuestion.questionId;

            const update = {
                method: 'PUT',
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify(this.manageQuestionModel),
                headers: this.getAuthHeader()
            }

            console.log("dingo")
            console.log("dingo")
            console.log("dingo")
            fetch('/services/questions/update', update)
                .then((response) => {
                    if (response.OK) {
                        return response.json()
                    }
                    else {
                        throw (e)
                    }
                })
                .then((response) => {
                    console.log("success response for updating question", response);
                })
                .catch((response) => {
                    console.log("response caught...", response)
                })

        },
        showMathJax() {
            this.$nextTick(function () {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            });

        },
        submitContractQuestion() {


            this.contractQuestionModel.qcontractValues = this.contractQuestionSchema.fields.reduce((acc, curr) => {



                let value = +curr.model.split('_')[1];


                if (!isNaN(value)) {

                    acc.push(this.contractQuestionModel[curr.model]);

                }

                return acc;
            }, [])
            let questionObject = {
                qcontractName: this.contractQuestionModel.qcontractName,
                qcontractValues: this.contractQuestionModel.qcontractValues,
                qcontractType: this.contractQuestionModel.qcontractType,
                qcontractModel: this.contractQuestionModel.qcontractModel,
                qcontractId: Math.floor(Math.random() * 3307)
            }


            this.persistencePost('services/contract/quesiton/add', questionObject)
                .then((response) => {
                    console.log("Question added from admin tool");
                })


        },
        test() {
            console.log("clicked  button");
        },
        registerAdmin() {

            const requestLogin = {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify(this.createAdminModel),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }

            fetch('/services/auth/register/admin', requestLogin)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then((response) => {
                    console.log("created Admin")

                })
                .catch((resonse) => {
                    console.log("caught error =>", resonse);
                    commit('ADMIN_REGISTERED', response);
                    resolve();
                })
        }
    },
    mixins: [mixQuestions, mixAuth, mixPersistence, mixXls],
    mounted() {
        this.$nextTick(function () {
            MathJax.Hub.Typeset()
        })
    }
}

</script>
<style>
.content {
    overflow-y: scroll;
}
</style>
<template>
    <div>
    
        <b-tabs small card ref="tabs" v-model="tabIndex">
            <b-tab title="Add Questions" active>
                <div class="panel panel-default">
                    <div class="panel panel-header">
                        <h3>Add Question or Upload Questions</h3>
                        <client-radio :options="radioNewQuestion" @radioSelected="displayQuestionScreen"></client-radio>
                    </div>
                    <div class="panel panel-body">
                        <div v-if="questionScreen === 'input'">
                            <vue-form-generator :schema="questionFormSchema" :model="questionFormModel"></vue-form-generator>

                        </div>
                        <div v-if="questionScreen === 'upload'">
                            <p>Uploading Content</p>
                            <client-fileselect @input="handleFileUpload"/>
                        </div>
                        </br>
    
                    </div>
                    <div class="panel panel-footer">
                        <button class="btn btn-default" @click="addSelectionValue('questionForm')">Add Value</button>
    
                        <button class="btn btn-primary" @click="createQuestion">submit</button>
                    </div>
    
                </div>
    
    
            </b-tab>
            <b-tab title="Add Question Content">
                <div class="content">
    
                    <vue-form-generator :schema="questionMaterialSchema" :model="questionMaterialModel"></vue-form-generator>
                    </br>
                    <button class="btn btn-default" @click="showMathJax()">Update Mathjax</button>
                    <br/>
                    <br/>
                    <label>Check Latex</label>
                    <textarea v-model="latex" />
                    <p>Result... {{latex}}</p>
                    <hr/>
                    <button class="btn btn-primary" @click="addQuestionMaterial">submit</button>
    
                </div>
    
            </b-tab>
            <b-tab title="Create Contract Questions">
                <div class="panel panel-default">
                    <div class="panel panel-body">
                        <vue-form-generator :schema="contractQuestionSchema" :model="contractQuestionModel" />
                    </div>
                    <div class="panel panel-footer">
                        <button class="btn btn-default" @click="addSelectionValue('contractQuestion')">Add Value</button>
                        <button class="btn btn-default" @click="submitContractQuestion">Submit</button>
    
                    </div>
                </div>
            </b-tab>
            <b-tab title="M Shapening Questions" @click="getQuestions">
                <div style="overflow-x: scroll">
                    <client-grid gridid="adminQuestions" v-on:rowSelected="openModal"></client-grid>
    
                </div>
    
            </b-tab>
    
        </b-tabs>
        <client-modal modalid="Manage Questions" :open="modalstatus" :modalSchema="manageQuestionSchema" :modalModel="manageQuestionModel" ref="dialog" @modalSubmitted="handleModal">
            <div slot="footer">
                <button class="btn btn-warning" @click="deleteQuestion">Delete</button>
    
            </div>
        </client-modal>
    
    </div>
</template>