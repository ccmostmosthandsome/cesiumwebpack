<template>
  <div class="panel-body">
    <div is="client-question" v-for="(question, index) in questionsMath" 
          :key="question.id" 
          :number="index + 1">
  
      <span slot="symbols">
        <!-- <vue-toggle :value="true" :labels="{checked: 'Foo', unchecked: 'Bar'}" /> -->
        <client-checkbox @checked="showHint(question)" :item="question">
          Show Hint
        </client-checkbox>
        <p v-html="question.question"></p>
      </span>
      <span slot="form">
        <vue-form-generator :schema="schema[question.id]" :model="model[question.id]"></vue-form-generator>
      </span>
  
      <br/>
    </div>
  
  </div>
</template>
<style>

</style>
<script>

import VueFormGenerator from "../vue-form-generator";
import clientQuestion from "./clientQuestion.vue";
import clientCheckbox from "../buttons/clientCheckbox.vue"
import mixAuth from '../../auth/mixAuth';
import { EventBus } from '../../eventbus/index';
import vueToggle from '../buttons/vueToggle.vue';
console.log("Eventbus??? ", EventBus);
export default {
  components: { clientQuestion, clientCheckbox, vueToggle },
  watch: {
    questions: function (newQuestions) {
      this.questionsMath = [];
      console.log("dingo casSHeet ==========>", this.questions);
      this.questions.forEach(function (question) {
        console.log("verifying question return data...", question);
        this.questionsMath.push(question);
        this.model[question.id] = { id: question.id };
        this.model[question.id][question.question] = null;
        let questionSchema = {
          model: question.id,
          label: question.quesion,
          type: "questions",
          values: question.selections
        }
        this.schema[question.id] = {
          fields: []
        }
        this.schema[question.id].fields.push(questionSchema);
        this.$nextTick(function () {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        });
      }.bind(this));

      console.log('dingo this.questionsMath', this.questionsMath);
    }
  },
  methods: {
    showHint(question) {
      console.log("toggleState", question, EventBus);
      if (question.toggleState === 'accepted') {
        console.log("emiting event...", question);
        EventBus.$emit('showHint', question);
      } else {
        console.log("dingo removing...");
        this.$store.dispatch("removeHint",question);
      }
    }
  },
  mounted() {

    this.$nextTick(function () {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    });

  },
  data: function () {
    return {
      questionsMath: [],
      field: null,
      model: {},
      schema: {},
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      }
    }
  },
  mixins: [mixAuth],
  name: 'casSheet',
  props: ['questions']
}
</script>


// WEBPACK FOOTER //
// casSheet.vue?0b3b899f