<template>
  <div style="margin-left: 0">
    <client-dashboard>
      <div class="dashboard-display">
        <cas-palmadoro></cas-palmadoro>
       
        <div v-for="(program, key) in dashboardGrades" v-bind:key="key" style="display: inline-block;">
          <strong>{{key}} {{program.grade}}</strong>
        </div>
        
      
      </div>
  
    </client-dashboard>
  
    <div style="padding-left: 1em;" v-for="(question, index) in questionsMath" :key="question.id" :number="index + 1" >
  
      <span slot="symbols" >
        <!-- <vue-toggle :value="true" :labels="{checked: 'Foo', unchecked: 'Bar'}" /> -->
        <client-checkbox @checked="showHint(question)" :item="question">
          Show Hint
        </client-checkbox>
        <p v-html="question.question"></p>
      </span>
      <span slot="form">
        <vue-form-generator @model-updated="getChanges" :schema="schema[question.id]" :model="model[question.id]"></vue-form-generator>
      </span>
  
      <br/>
    </div>
  
  </div>
</template>
<style>
.dashboard-display {
  display: inline-block;

}

.dashboard-content {
  margin: .5em auto;
}
</style>
<script>

import VueFormGenerator from "../vue-form-generator";
import clientQuestion from "./clientQuestion.vue";
import clientCheckbox from "../buttons/clientCheckbox.vue";
import clientDashboard from "../dashboard/clientDashboard.vue";
import casPalmadoro from '../timers/casPalmadoro.vue'
import mixAuth from '../../auth/mixAuth';
import { EventBus } from '../../eventbus/index';
import vueToggle from '../buttons/vueToggle.vue';
import sticky from '../../directives/sticky';
console.log("Eventbus??? ", EventBus);
export default {
  components: { clientQuestion, clientCheckbox, vueToggle, clientDashboard, casPalmadoro },
  created() {
    this.$eventToObservable('model-updated')
      .subscribe((event) => console.log(event.name, event.msg))
  },
  computed: {
    dashboardGrades() {
      
      for(var i in this.gradeStream ){
        this.$set(this.dashboard,i,this.gradeStream[i]);
      }
      
      return this.dashboard;
    }
  },
  directives: {
    sticky
  },
  watch: {

    questions: function (newQuestions) {
      this.questionsMath = [];
      console.log("dingo casSHeet ==========>", this.questions);
      this.questions.forEach(function (question) {
        this.questionsMath.push(question);
        this.$set(this.model, question.id, { id: question.id });
        this.$set(this.model[question.id], question.question, null);
        let questionSchema = {
          model: question.id,
          label: question.quesion,
          answerId: question.answerId,
          coursetype: question.coursetype,
          type: "questions",
          values: question.values
        }
        this.schema[question.id] = {
          fields: []
        }
        this.schema[question.id].fields.push(questionSchema);
        this.$nextTick(function () {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        });
      }.bind(this));

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
        this.$store.dispatch("removeHint", question);
      }
    },
    getChanges(value, model) {
      console.log("dingo")
            console.log("dingo")

      console.log("dingo")

      EventBus.$emit('grade', value, model);

    }
  },
  mounted() {

    this.$nextTick(function () {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    });

  },
  data: function () {
    return {
      dashboard: {},
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
  props: ['questions', 'programStatus', 'gradeStream']
}
</script>


// WEBPACK FOOTER //
// casSheet.vue?0b3b899f