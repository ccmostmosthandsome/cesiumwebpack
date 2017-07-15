<script>

import VueFormGenerator from "../vue-form-generator";
import mixQuestions from "./mixQuestions"
import {mixAuth} from "../../auth/mixAuth"
import clientGrid from "../grids/clientGrid.vue";
import clientModal from "../layout/clientModal.vue"
export default {
    name: 'casAdmin',
    data: function () {
        return {
            latex: null,
            modalstatus: false,
            //id	question	answer	selections	explanation	coursetype	modtype	type
            manageQuestionModel: {
                id: null,
                question: null,
                answer: null,
                selection: null,
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
                        values: ["Math", "Science", "Language"]
                    },
                    {
                        type: "select",
                        label: "modtype",
                        model: "modtype",
                        values: ["Intro", "Algebra", "Statistics", "Geometry"]
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
                        label: "Admin Name",
                        model: "username"
                    },
                    {
                        type: "input",
                        label: "Admin Password",
                        model: "password"
                    }
                ]
            },
            questionFormModel: {
                id: 1,
                question: null,
                type: null,
                answer: null,
                explanation: null

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
                        label: "Type",
                        values: ["math", "science", "english", "civics"],
                        model: "type",
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
    components: { clientGrid, clientModal },
    methods: {
        createQuestion() {
            this.questionFormModel.selections = [];
            for (var field in this.selectionFormModel) {
                if (field !== "id") {
                    this.questionFormModel.selections.push(this.selectionFormModel[field]);
                }
>>>>>>> Stashed changes

            }
        },
<<<<<<< Updated upstream
        methods: {
            createQuestion(){
                this.questionFormModel.selections = [];
                for(var field in this.selectionFormModel){
                    if(field !== "id"){
                        this.questionFormModel.selections.push(this.selectionFormModel[field]);
                    }
                   
                }
                //Remove id field to leave only selections in array.
                this.questionFormModel.id = Math.floor(Math.random() * 30000); 

                let request = new Request('/services/questions/add',{
                    method : 'POST',
                    mode: 'cors',
                    redirect: 'follow',
                    body: JSON.stringify(this.questionFormModel),
                    headers: new Headers({
                        'Content-Type' : 'application/json'
                    })
                });

                console.log("request?",request);
                fetch(request)
                    .then((response)=>{
                        console.log("dingo");
                    });

            },
            showMathJax(){
                this.$nextTick(function() {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                });

            }
        },
        mounted(){
            this.$nextTick(function () {
            MathJax.Hub.Typeset()    
            })  
=======
        openModal(event) {
            console.log("dingo")
            console.log("dingo")
            console.log("dingo")
            for(var i in this.manageQuestionModel){
                
                this.$set(this.manageQuestionModel,i,event[i])
            }
            console.log("dingo")
            console.log("dingo")
            console.log("dingo")            
            this.$refs.dialog.openModal();

        },
        handleModal(event) {

            const requestLogin = {
                method: 'PUT',
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify(this.manageQuestionModel),
                headers: this.getAuthHeader()
            }
            
            fetch('/services/questions/update', requestLogin)
                .then((response)=>{
                    if(response.OK){
                        return response.json()
                    }
                    else{
                        throw(e)
                    }
                })
                .then((response)=>{
                    console.log("success response for updating question",response);
                })
                .catch((response)=>{
                    console.log("response caught...",response)
                })

        },
        showMathJax() {
            this.$nextTick(function () {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            });

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
>>>>>>> Stashed changes
        }
    },
    mixins: [mixQuestions, mixAuth],
    mounted() {
        this.$nextTick(function () {
            MathJax.Hub.Typeset()
        })
    }
}

</script>
<style>
</style>
<template>
    <div>
    
<<<<<<< Updated upstream
        
            <b-tabs small card ref="tabs" v-model="tabIndex">
                <b-tab title="Add Questions" active>
                
                   <vue-form-generator :schema="questionFormSchema" :model="questionFormModel" ></vue-form-generator>
                   </br>
                   <label>Add Selections</label>
                   <vue-form-generator :schema="selectionFormSchema" :model="selectionFormModel" ></vue-form-generator>
                   <button class="btn btn-default" @click="showMathJax()">Update Mathjax</button>
                   <br/>
                   <br/>
                   <label>Check Latex</label>
                   <textarea v-model="latex"/>
                   <p>Result... {{latex}}</p>
                   <hr/>
                   <button class="btn btn-primary" @click="createQuestion">submit</button>
                </b-tab>
                <b-tab title="Manage Roles">
                    Role Management
                    <b-card>Using cards might work for each role</b-card>
                </b-tab>
                <b-tab title="Modify Schema" >
                    Schema!
                </b-tab>
            </b-tabs>

        
=======
        <b-tabs small card ref="tabs" v-model="tabIndex">
            <b-tab title="Add Questions" active>
    
                <vue-form-generator :schema="questionFormSchema" :model="questionFormModel"></vue-form-generator>
                </br>
                <label>Add Selections</label>
                <vue-form-generator :schema="selectionFormSchema" :model="selectionFormModel"></vue-form-generator>
                <button class="btn btn-default" @click="showMathJax()">Update Mathjax</button>
                <br/>
                <br/>
                <label>Check Latex</label>
                <textarea v-model="latex" />
                <p>Result... {{latex}}</p>
                <hr/>
                <button class="btn btn-primary" @click="createQuestion">submit</button>
            </b-tab>
            <b-tab title="Manage Roles">
                Role Management
                <b-card>Using cards might work for each role</b-card>
            </b-tab>
            <b-tab title="Modify Schema">
                Schema!
            </b-tab>
            <b-tab title="Manage Questions">
                <div class="panel panel-default">
                    <div class="panel panel-body">
                        <client-grid type="manySelection" gridid="adminQuestions" v-on:rowSelected="openModal"></client-grid>
                    </div>
                    <div class="panel panel-footer">
                        <button class="btn btn-primary" @click="getQuestions">Get Questions...</button>
                    </div>
    
                </div>
    
            </b-tab>
    
        </b-tabs>
        <client-modal modalid="Manage Questions" :open="modalstatus" :modalSchema="manageQuestionSchema" :modalModel="manageQuestionModel" ref="dialog" @modalSubmitted="handleModal">
        </client-modal>
>>>>>>> Stashed changes
    </div>

</template>