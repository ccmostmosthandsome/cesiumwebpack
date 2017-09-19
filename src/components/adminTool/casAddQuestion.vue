<template>
    <div class="panel panel-default">
        <div class="panel panel-header">
            <h3>Add Question or Upload Questions</h3>

            <client-radio :options="radioNewQuestion" @radioSelected="displayQuestionScreen"></client-radio>
        </div>
        <div class="panel panel-body">
            <div v-if="questionScreen === 'input' && spinnerLoading === false">

                <vue-form-generator @model-updated="listSelectionChanged" :schema="question.schema" :model="question.model"></vue-form-generator>
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
                <pulse-loader :loading="loading" :color="color"></pulse-loader>
                <button class="btn btn-primary" @click="submitQuestion">Submit Question</button>

                <button class="btn btn-default" @click="addSelectionValue()">Add Value</button>

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
</template>

<script>
import clientFileselect from '../buttons/clientFileselect.vue';
import clientRadio from '../buttons/clientRadio.vue';
import clientAccordion from '../layout/clientAccordion.vue';
import clientSpinner from '../spinner/clientSpinner.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
export default {
    name: 'casAddQuestion',
    components: {
        clientAccordion,
        clientFileselect,
        clientRadio,
        clientSpinner,
        PulseLoader
    },
    data: function() {
        return {
            color: 'green',
            loading: false,
            radioNewQuestion: [
                { text: 'Upload Questions', value: 'upload' },
                { text: 'Enter New Question', value: 'input' },
            ],
            spinnerLoading: false,
            id: Math.floor(Math.random() * 3377),
            submit: 'question',
            bulkExcelDocuments: {},
            questionScreen: false,
            question: {}


        }
    },
    methods: {
        listSelectionChanged(change) {

            console.log("caught change..", change);

            let checkFunction = {
                'koan': function() {
                    console.log("in koan check function dingo with change", change)
                    let coursesForSelectedKoan = this.$store.getters.courseNames(change);
                    this.question.schema.fields = this.question.schema.fields.map(field => {
                        console.log("updating questions here? model ", field);
                        if (field.model === 'coursetype') {
                            console.log("updating questions here? setting ", field);
                            this.$set(field, 'values', coursesForSelectedKoan);
                            this.$set(field, 'disabled', false);
                            console.log("updating questions here? setting", field);
                        }

                        return field;

                    });
                    console.log("updating questions here? =>", this.question.schema, coursesForSelectedKoan);
                    this.$store.dispatch('updateQuestionSchema', this.question.schema, coursesForSelectedKoan);
                }.bind(this),
                'coursetype': function() {
                    console.log("in koan check function dingo for modtype click", change, this.question.model);
                    let focusAreasForSelectedKoan = this.$store.getters.focusAreaNames({ koan: this.question.model.koan, course: this.question.model.coursetype });
                    this.question.schema.fields = this.question.schema.fields.map(field => {
                        console.log("updating questions here? model ", field);
                        if (field.model === 'modtype') {
                            console.log("updating questions here? setting ", field);
                            this.$set(field, 'values', focusAreasForSelectedKoan);
                            this.$set(field, 'disabled', false);
                            console.log("updating questions here? setting", field);
                        }

                        return field;

                    });
                    console.log("updating questions here? =>", this.question.schema, coursesForSelectedKoan);
                    this.$store.dispatch('updateQuestionSchema', this.question.schema, coursesForSelectedKoan);
                }.bind(this),
                'modtype': function() {

                },
                'fellThrough': function() {
                    console.log("no matching property", change);
                }
            }

            for (let property in this.question.model) {
                if (this.question.model[property] === change) {
                    console.log("caught change", change, checkFunction[property]());
                    (checkFunction[property] || checkFunction.fellThrough)();
                }
            }


            //console.log("couldn't walk the model...");
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
        addSelectionValue() {
            this.$store.dispatch('addSelection', this.question);
        },
        submitQuestion() {
            this.loading = true;
            this.$store.dispatch('buildQuestionSelectionField')
            this.$store.dispatch('postQuestionSelectionField', this.question.model)
                .then(response => {
                    console.log("Got resposne")
                    setTimeout(() => { this.loading = false }, 2000);

                })
                .catch(response => console.log("Error posting", response));

        },
        bulkAddQuestion() {
            console.log("bulk add question =>");
        }
    },
    mounted() {
        this.questionSchema = this.questionFormSchema;
        let model = this.$store.getters.questionModel;
        let schema = this.$store.getters.questionSchema;
        schema.fields = schema.fields.map(field => {
            if (field.model === 'koan') {
                field.values = this.$store.getters.koanNames;
            }
            return field;
        })
        console.log("new schema dingo", schema);
        this.$store.dispatch('updateQuestionSchema', schema);
        this.$set(this.question, 'model', model);
        this.$set(this.question, 'schema', schema);

    }
}
</script>

<style>

</style>
