<template>
    <div class="contractQuestions">
        <span v-if="hasAnsweredQuestions">
            {{answeredQuestions}}
        </span>
        <span v-else>
            <vue-form-generator :schema="contractQuestionSchema" :model="contractQuestionModel">
    
            </vue-form-generator>
        </span>
    
       
        <button class="btn btn-success" @click="processContractQuestions">Submit</button>
    </div>
</template>

<script>
import mixAuth from '../../auth/mixAuth';
import mixPersistence from '../../mixins/mixPersistence';
export default {
    name: 'casContract',
    computed: {
        hasAnsweredQuestions: {
            cache: false,
            get(){
                return this.$store.getters.isContractRegistered;
            }
            
        },
        answeredQuestions(){
            return this.$store.state.contractAnswers;
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
                let values = contractQuestion.qcontractValues.filter((value) => {
                    return value;
                });
                let responsiveContract = {};
                this.$set(responsiveContract, 'type', contractQuestion.qcontractType);
                this.$set(responsiveContract, 'label', contractQuestion.qcontractName);
                this.$set(responsiveContract, 'model', contractQuestion.qcontractModel);
                this.$set(responsiveContract, 'values', values);
                returnObject.fields.push(responsiveContract);
            })
            return returnObject
        }

    },
    data: function () {
        return {
            contractQuestions: []
        }
    },
    methods: {
        processContractQuestions() {
            console.log("running questions");
            console.log("running questions");
            console.log("running questions");
            let questions = Object.keys(this.contractQuestionModel).map(function (question) {

                let values = this.contractQuestionSchema.fields.filter(function (field) {

                    return field.model === question
                });

                values = values[0] ? values[0].values : null
                let qaQuestionId = this.contractQuestions.filter(cQuestion => cQuestion.qcontractModel == question)[0].qcontractId;


                console.log("values!!!!!!!", values);
                console.log("values!!!!!!!", values);
                console.log("values!!!!!!!", values);
                console.log("values!!!!!!!", values);
                return {
                    qcontractName: question,
                    qaQuestionAnswer: this.contractQuestionModel[question],
                    qaUserId: this.account.sub,
                    qaQuestionId: qaQuestionId,
                    qcontractId: Math.floor(Math.random() * 3307)
                }
            }.bind(this))
            console.log("running promises");
            Promise.all(questions.map((question => {
                console.log("###########Question#########", question);
                this.persistencePost('services/contract/answer/give', question)
            })))
                .then((response) => {
                    console.log("all promises complete!!", response);
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
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log("got dingo response... => ", response);
                response.forEach((contractQuestion) => {
                    this.contractQuestionModel[contractQuestion.qcontractModel] = null;
                    let values = contractQuestion.qcontractValues.filter((value) => {
                        return value;
                    });
                    this.contractQuestionSchema.fields.push({
                        type: contractQuestion.qcontractType,
                        label: contractQuestion.qcontractName,
                        model: contractQuestion.qcontractModel,
                        values: values
                    });
                })
            })
    }


}
</script>

<style>
.contractQuestions {
    padding-bottom: 20px;
}
</style>
