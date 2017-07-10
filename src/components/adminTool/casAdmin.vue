<script>
    import VueFormGenerator from "../vue-form-generator";
    export default {
        name: 'casAdmin',
        data: function(){
            return {
                latex: null,
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
                            values: ["math","science","english","civics"],
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
                selectionFormModel : {
                    id: 2,
                    selection1 : null,
                    selection2 : null,
                    selection3 : null,
                    selection4 : null
                },
                selectionFormSchema : {
                    fields : [
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
        }
    }
</script>
<style>
</style>
<template>
    <div>
    
        
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

        
    </div>

</template>