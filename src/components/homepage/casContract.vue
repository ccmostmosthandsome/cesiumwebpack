<template>
    <div class="contractQuestions">
        <p>{{hasAnsweredQuestions}}</p>
        <span v-if="hasAnsweredQuestions">
            <div class="container">
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="well">
    
                            <ul class="wellUl">
                                <li v-for="(value, key) in answeredQuestions" v-bind:key="key" class="wellUl__li">
                                    <span class="fa fa-check fa-2x icon-success fa-fw"></span>
                                    <span class="wellUl__span">
                                        <strong>{{value.questionName}}</strong>
                                        <br/> {{value.qaQuestionAnswer}}
                                    </span>
                                    <span></span>
                                </li>
    
                            </ul>
                        </div>
    
                    </div>
                </div>
            </div>
    
        </span>
        <span v-else>
    
            <vue-form-generator :schema="contractQuestionSchema" :model="contractQuestionModel">
    
            </vue-form-generator>
            <button class="btn btn-success" @click="processContractQuestions">Submit</button>
    
        </span>
    
    </div>
</template>

<script>
import mixAuth from '../../auth/mixAuth';
import mixPersistence from '../../mixins/mixPersistence';

export default {
    name: 'casContract',
    computed: {
        contractQuestions(){
            return this.$store.getters.getContractQuestions;
        },
        contractAnswers(){
            return this.$store.getters.getContractAnswers;
        },
        answeredQuestions() {
            let answers = this.contractAnswers.map((answer) => {
                console.log("questionName dingo",answer.qaQuestionId,this.contractQuestions);
                let question = this.contractQuestions.filter(question => question.qcontractId === answer.qaQuestionId)[0];
                 console.log("questionName filtered",question);
                this.$set(answer, 'questionName', question.qcontractName);
                return answer;
            });
            console.log("dingo")
            console.log("dingo")

            console.log("dingo")

            return answers;
        },
        contractQuestionModel() {
            let questionModel = {};
            this.contractQuestions.forEach((contractQuestion) => {
                return this.$set(questionModel, contractQuestion.qcontractModel, null);
            });

            return questionModel;
        },
        contractQuestionSchema() {
            //Filter out potential null values
            let returnObject = {}
            this.$set(returnObject, 'fields', []);
            this.contractQuestions.forEach((contractQuestion) => {
                console.log("Is this the broken filter??", contractQuestion);
                if (contractQuestion.qcontractValues !== null) {
                    let values = contractQuestion.qcontractValues.filter((value) => {
                        return value;
                    });
                    let responsiveContract = {};
                    this.$set(responsiveContract, 'type', contractQuestion.qcontractType);
                    this.$set(responsiveContract, 'label', contractQuestion.qcontractName);
                    this.$set(responsiveContract, 'model', contractQuestion.qcontractModel);
                    this.$set(responsiveContract, 'values', values);
                    returnObject.fields.push(responsiveContract);

                }


            })
            return returnObject
        }

    },
    methods: {
        init() {

            fetch(request)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log("got dingo response... => ", response);
                    response.forEach(function (contractQuestion) {
                        this.contractQuestionModel[contractQuestion.qcontractModel] = null;
                        console.log("Checking null", contractQuestion);
                        if (contractQuestion.qcontractType !== null) {
                            this.contractQuestionSchema.fields.push({
                                type: contractQuestion.qcontractType,
                                label: contractQuestion.qcontractName,
                                model: contractQuestion.qcontractModel,
                                values: contractQuestion.qcontractValues.filter(value => value)
                            });
                        } else {
                            console.log("fucking null")
                        }




                    }.bind(this));
                }.bind(this))
        },

        processContractQuestions() {
            console.log("running questions");
            console.log("dingo processed questions => ", this.contractQuestions[0]);
            let questions = Object.keys(this.contractQuestionModel)
                .filter(e => e !== 'null')
                .map(function (question) {
                console.log("dingo processed model => ", question);
                let values = this.contractQuestionSchema.fields.filter(field => field.model === question);

                values = values[0] ? values[0].values : null
                
                let qaQuestionId = this.contractQuestions.filter(cQuestion => cQuestion.qcontractModel == question)[0].qcontractId;
                
                console.log("values!!!!!!!", values);
                return {
                    qcontractName: question,
                    qaQuestionAnswer: this.contractQuestionModel[question],
                    qaUserId: this.account.sub,
                    qaQuestionId: qaQuestionId,
                    qcontractId: Math.floor(Math.random() * 3307)
                }
            }.bind(this))
            console.log("dingo processed questions => ", questions);
            
            console.log("running promises");
            Promise.all(questions.map(question => {
                console.log("###########Question#########", question);
                this.persistencePost('services/contract/answer/give', question)
            }))
                .then((response) => {
                    console.log("all promises complete!!", response);
                    console.log("all promises complete!!", response);
                    console.log("all promises complete!!", response);
                    this.$emit('questionAnswered',true);

                });

                

        }
    },
    mixins: [mixAuth, mixPersistence],
    mounted() {
        

        let request = new Request('services/contract', {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            headers: {
                'X-Auth-Token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        this.$store.dispatch("fetchContractQuestions")
            .then(() => {
                this.contractQuestions = this.$store.state.contractQuestions;
            })
        fetch(request)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                console.log("got dingo response... => ", response);
                response.forEach(function (contractQuestion) {
                    this.contractQuestionModel[contractQuestion.qcontractModel] = null;
                    console.log("Checking null", contractQuestion);
                    if (contractQuestion.qcontractType !== null) {
                        this.contractQuestionSchema.fields.push({
                            type: contractQuestion.qcontractType,
                            label: contractQuestion.qcontractName,
                            model: contractQuestion.qcontractModel,
                            values: contractQuestion.qcontractValues.filter(value => value)
                        });
                    } else {
                        console.log("fucking null")
                    }




                }.bind(this));
            }.bind(this))
    },
    props: ['hasAnsweredQuestions']


}
</script>

<style>
.contractQuestions {
    padding-bottom: 100px;
    padding-left: 30px;
}


.wellUl {
    display: block;
    list-style-type: disc;
    list-style: none;
    margin-left: 0;
    padding-left: 0;
    margin-bottom: 20px;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
}

.wellUl__li {
    margin: 0 0 20px 0;
    line-height: 1.6em;
}

.wellUl__span {
    display: inline-block;
    margin: 0 0 0 10px;
}



.icon-success {
    color: #7db53b;
}
</style>
