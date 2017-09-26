<template>
  <div style="margin-left: 0">
    <client-dashboard>
      <div class="dashboard-display" slot="body">
        
        <div class="flex-grid" >
          <div class="col">
            <cas-palmadoro></cas-palmadoro>
          </div>
          <div v-for="(val, key) in statusDashboard" :key="key" class="col">             
             <div class="flex-grid ">
                <div v-for="(item, innerKey) in val" :key="innerKey" class="col">
                  <div class="dashboardHeader">{{innerKey}}</div>
                  <div class="dashboardValue">{{item}}</div>
                </div> 
             </div>
          </div>
        </div>

 

      </div>
      <div slot="footer">

      </div>
    </client-dashboard>

    <div style="padding-left: 1em;" v-for="(question, index) in questionsMath" :key="question.id" :number="index + 1">

      <span slot="symbols">
        <!-- <vue-toggle :value="true" :labels="{checked: 'Foo', unchecked: 'Bar'}" /> -->
        <client-checkbox @checked="showHint(question)" :item="question">
          Show Hint
        </client-checkbox>
        <client-checkbox @checked="openModal = true" :item="question">
          Show Video
        </client-checkbox>
        <p v-html="question.question"></p>
      </span>
      <span slot="form">
        <vue-form-generator @model-updated="getChanges" :schema="schema[question.id]" :model="model[question.id]"></vue-form-generator>
        <cas-video-modal :open="openModal"></cas-video-modal>
      </span>

      <br/>
    </div>

  </div>
</template>
<style>

.dashboardHeader{
  display: inline-block;
  font-weight: bold;
}

.dashboardBody{

}
.flex-grid{
  display : flex;
}

.col {
  flex : 1;
}

.dashboard-display {
  display: inline-block;
}

.dashboard-content {
  margin: .5em auto;
}


@media screen and (min-width: 0px) and (max-width: 400px) {
  .dashPanel {
    display: block;
    z-index: 100;
    width: 75%;
    display: none;
    /* padding: 5px;
        color: whitesmoke; */
  }
}

@media screen and (min-width: 401px) and (max-width: 1024px) {
  .dashPanel {
    display: block;
    z-index: 100;
    width: 75%;
    /* padding: 5px;
        color: whitesmoke; */
  }
}
</style>
<script>

import VueFormGenerator from "../vue-form-generator";
import clientQuestion from "./clientQuestion.vue";
import clientCheckbox from "../buttons/clientCheckbox.vue";
import clientDashboard from "../dashboard/clientDashboard.vue";
import casPalmadoro from '../timers/casPalmadoro.vue'
import casVideoModal from './casVideoModal.vue';
import mixAuth from '../../auth/mixAuth';
import { EventBus } from '../../eventbus/index';
import { mapGetters } from 'vuex';
import vueToggle from '../buttons/vueToggle.vue';
import sticky from '../../directives/sticky';
console.log("Eventbus??? ", EventBus);
export default {
  components: { casVideoModal, clientQuestion, clientCheckbox, vueToggle, clientDashboard, casPalmadoro },
  created() {
    this.$eventToObservable('model-updated')
      .subscribe((event) => console.log(event.name, event.msg))
  },
  computed: {
    ...mapGetters(['statusDashboard'])
  },
  directives: {
    sticky
  },
  watch: {

    questions: function(newQuestions) {
      this.questionsMath = [];
      console.log("dingo casSHeet ==========>", this.questions);
      this.questions.forEach(function(question) {
        this.questionsMath.push(question);
        this.$set(this.model, question.id, { id: question.id });
        this.$set(this.model[question.id], question.question, null);
        let questionSchema = {
          model: question.id,
          label: question.quesion,
          answerId: question.answerId,
          coursetype: question.coursetype,
          koan: question.koan,
          focusarea: question.modtype,
          type: "questions",
          values: question.values
        }
        this.schema[question.id] = {
          fields: []
        }
        this.schema[question.id].fields.push(questionSchema);
        this.$nextTick(function() {
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
      console.log("dingo got changes...")
      console.log("dingo")



      //EventBus.$emit('grade', value, model);

      if (value.correct || value.exceededTries) {
        this.$store.dispatch('grade', value);
        console.log("dispatched grade action...");
      }

    }
  },
  mounted() {

    this.$nextTick(function() {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    });

  },
  data: function() {
    return {
      dashboard: {},
      questionsMath: [],
      field: null,
      openModal: false,
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