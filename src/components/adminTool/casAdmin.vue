<script>

import VueFormGenerator from "../vue-form-generator";
import mixQuestions from "./mixQuestions";
import mixAuth from "../../auth/mixAuth";
import mixXlsx from "../../mixins/mixXlsx";
import mixSchemaForms from "../../mixins/mixSchemaForms";
import clientGrid from "../grids/clientGrid.vue";
//import clientModal from "../layout/clientModal.vue";
import clientModal from "../modal/clientModal.vue"
import s2aAdminModal from "./s2aAdminModal.vue"
import clientRadio from "../buttons/clientRadio.vue";
import clientSpinner from "../spinner/clientSpinner.vue";
import clientFileselect from "../buttons/clientFileselect.vue";
import clientAccordion from "../layout/clientAccordion.vue";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import mixPersistence from '../../mixins/mixPersistence';
import mixGrids from '../../mixins/mixGrids'
import { EventBus } from '../../eventbus/index';

export default {
    name: 'casAdmin',
    computed: {
        spinnerLoading() {
            return this.$store.getters.getLoading;
        }
    },
    data: function () {
        return {
            color: 'green',
            loading: false,
            editorValue: null,
            editorContent: "<h4>Editor</h4>",
            loading: false,
            submit: 'question',
            bulkExcelDocuments: {},
            questionScreen: false,
            radioNewQuestion: [
                { text: 'Upload Questions', value: 'upload' },
                { text: 'Enter New Question', value: 'input' },
            ],
            latex: null,
            modalstatus: false,
            tabIndex: null,
            tabs: [],
            tabCounter: 0
            //id	question	answer	selections	explanation	coursetype	modtype	type
        }
           
    },
    components: {
        clientModal,
        clientGrid,
        clientRadio,
        clientFileselect,
        clientSpinner,
        clientAccordion,
        s2aAdminModal,
        PulseLoader
    },
    methods: {
        addAProgramProgram(){
            console.log("Adding program dingo",this.programModel);

            let submitModel = {
                name: this.programModel.name,
                grades : Object.keys(this.programModel)
                                .reduce((acc,curr)=>{
                                    if(curr.indexOf('_') !== -1){
                                        console.log(curr,curr.split('_')[1])
                                        acc[this.programModel[curr]]= 0; 
                                    }
                                    return acc; 
                                },{}),
                testerId : this.account.sub,
                koan: this.programModel.name

            }

             this.persistencePost('services/program/add',submitModel)
                .then(response => {
                    if(response.ok){
                        return response.json
                    } 
                    console.log("API Call failed")
                })
                .then(response => {
                    console.log("Added Program",response);
                })

        },
        getEditorValue(data) {
            console.log(" this is the data =>", data);
        },
        handleFileUpload(file) {
            console.log("handling spreadsheet", file);

            this.$set(this.bulkExcelDocuments, 'sheets', file.sheets);
            this.submit = "bulk";


        },
        displayQuestionScreen(selected) {
            console.log("dingo this was selected...", selected);
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
                            "label": 'Question ' +  questionIndex

                        }
                    )

                }


            })
        },
        bulkAddQuestion() {
            this.loading = true;
            let normalizedQuestions = this.bulkExcelDocuments.sheets.Questions.map(function (newquestion) {
                console.log("dingo");
                let selections = this.bulkExcelDocuments
                    .sheets
                    .Selections.filter(selection => selection.QuestionID === newquestion.ID)
                    .reduce((acc, curr) => {
                        console.log("curr", curr, curr[0])
                        for (var selection in curr) {
                            console.log("selection", selection)
                            if (selection !== 'QuestionID') {
                                acc.push(curr[selection]);
                            }

                        }

                        return acc;
                    }, []);

                return {
                    question: newquestion.Question,
                    answer: newquestion.Answer,
                    selections: selections,
                    explanation: newquestion.Explanation,
                    coursetype: newquestion.CourseType,
                    modtype: newquestion.Module,
                    questionId: newquestion.ID,
                    creator: this.account.sub
                }
            }.bind(this))

            let normalizedContent = this.bulkExcelDocuments.sheets.Content.map(function (content) {
                return {
                    questionId: content.QuestionID,
                    questionhint: content.Hint,
                    videoHint: content.Video,
                    creator: this.account.sub

                }
            }.bind(this))


            Promise.all(normalizedQuestions.map((question => {
                console.log("###########Question#########", question);
                return this.persistencePost('/services/questions/add', question)
            })))
                .then((response) => {
                    console.log("dingo", this.bulkExcelDocuments.sheets.Questions[0]);
                    console.log("dingo", normalizedQuestions);

                    console.log("dingo")

                    console.log("dingo")

                    console.log("dingo")
                    console.log("all promises complete!!", response);
                    return Promise.all(normalizedContent.map((content) => {
                        console.log("###########Content#########", content);
                        return this.persistencePost('/services/questions/add/content', content);
                    }))
                })
                .then((response) => {
                    console.log("###########Completed#########", response);
                    this.loading = false;
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

            this.loading = true;
            this.questionFormModel.values = this.questionFormSchema.fields.reduce(function(acc, curr){
                
                //Check if an additional value
                let value = +curr.model.split('_')[1];
                //Grab the value's 
                
                if (!isNaN(value)) {
                    let questionIndexNumber = parseInt(curr.label.split(' ')[1]);
                    let questionId = Math.floor(Math.random() * 9999);
                    acc.push({
                        name: this["questionFormModel"][curr.model],
                        valueId: questionId
                    });
                    //If the question index matches the user's correct answer# than replace the answerId with the question-value's questionId. 
                    questionIndexNumber === parseInt(this.questionFormModel.answerId) ? this.questionFormModel.answerId = questionId : '';

                    console.log("WTF??",this.questionFormModel);
                }
                return acc;
            }.bind(this), [])

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
                    this.loading = false;
                    for(var prop in this.questionFormModel){
                        this.questionFormModel[prop] = null;
                    }
                })
                .catch(response => {
                    this.loading = false
                })

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
           // this.$refs.dialog.openModal();
           this.modalstatus = true;

        },
        handleModal(event) {
            this.modalstatus = false;
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
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        throw ('error in question update')
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

    mixins: [mixQuestions, mixAuth, mixPersistence, mixXlsx, mixGrids, mixSchemaForms],
    mounted() {
        this.$nextTick(function () {
            MathJax.Hub.Typeset()
        });


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
    
        <b-tabs  ref="tabs" v-model="tabIndex">
            <b-tab title="Add Questions" active>
                <div class="panel panel-default">
                    <div class="panel panel-header">
                        <h3>Add Question or Upload Questions</h3>
                        <vue-form-generator :schema="throwAwaySchema" :model="throwAwayModel"></vue-form-generator>
                        {{throwAwayModel}}
                        <client-radio :options="radioNewQuestion" @radioSelected="displayQuestionScreen"></client-radio>
                    </div>
                    <div class="panel panel-body">
                        <div v-if="questionScreen === 'input' && spinnerLoading === false">
                            <vue-form-generator :schema="questionFormSchema" :model="questionFormModel"></vue-form-generator>
                        </div>

                        <div v-if="questionScreen === 'upload' && spinnerLoading === false">
                            <client-accordion>
                                <panel is-open type="primary">
                                    <strong slot="header">
                                        <u>Panel #1</u>
                                    </strong>
                                    
                                </panel>
                            </client-accordion>
                            <div class="btn-group" role="group" aria-label="Bulk Upload Group Bar">
    
                                <div style="display: inline-block;">
                                    <client-fileselect @input="handleFileUpload" type="excel" />
                                </div>
    
                            </div>
    
                        </div>
                        <div v-if="spinnerLoading">
                            <client-spinner></client-spinner>
                        </div>
                        
    
                    </div>
                    <div class="panel panel-footer">
                        <span v-if="questionScreen==='input'">
                            <pulse-loader :loading="loading" :color="color" ></pulse-loader>
                            <button class="btn btn-default" @click="addSelectionValue('questionForm')">Add Value</button>
                           
                                
                            <button class="btn btn-primary" @click="createQuestion">Submit Question</button>
                                
                           
                            
                        </span>
                        <span v-else-if="questionScreen === 'upload'">
                            <button class="btn btn-primary" @click="bulkAddQuestion">Upload Excel Questions</button>
    
                        </span>
                        <span v-else>
                            <label>
                                <h4>Select a Value</h4>
                            </label>
                        </span>
    
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
                        <button class="btn btn-default" @click="submitContractQuestion" v-if="submit === 'question'">Submit -- {{submit}}</button>
    
                    </div>
                </div>
            </b-tab>
            <b-tab title="Add Programs">
                 <div class="panel panel-default">
                    <div class="panel panel-body">
                        <vue-form-generator :schema="programSchema" :model="programModel" />
                    </div>
                    <div class="panel panel-footer">
                        <button class="btn btn-default" @click="addSelectionValue('program')">Add Course</button>
                        <button class="btn btn-default" @click="addAProgramProgram">Submit</button>
    
                    </div>
                </div>               
            </b-tab>
            <b-tab title="Sharpening Questions" @click="getQuestions">
                <div style="overflow-x: scroll">
                    <client-grid gridid="adminQuestions" v-on:rowSelected="openModal"></client-grid>
    
                </div>
    
            </b-tab>
    
        </b-tabs>
        <span style="padding-top: 30px;">


            <s2a-admin-modal :open="modalstatus" 
                @formSubmitted="handleModal"
                @formCanceled="modalstatus = false">
                <div slot="form">
                    <vue-form-generator :model="manageQuestionModel" :schema="manageQuestionSchema"></vue-form-generator>
                </div>
            </s2a-admin-modal>
        </span>
    
    </div>
</template>