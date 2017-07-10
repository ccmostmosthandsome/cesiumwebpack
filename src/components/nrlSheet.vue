<template>
  <div class="panel-body">
    <div v-for="(question, index) in questionsMath">

        <client-question :number="index + 1">
          
          <span slot="symbols">
            <!--
              <p> Given `f(x) = 2x^2 - 3x + 7`, find `f(2.5) .` </p>
            -->
            
              <p v-html="question.question"></p>
          </span>
          <span slot="form">
            
            <vue-form-generator :schema="schema[question.id]" :model="model[question.id]" ></vue-form-generator>
            
          </span>       
          
        </client-question>
        <br/>
      </div>
     
    </div>


    
    

  </div>
</template>

<script>

import VueFormGenerator from "./vue-form-generator";
import clientQuestion from "./questions/clientQuestion.vue";
import mixAuth from '../auth/mixAuth'
export default {
  components: {clientQuestion},
  mounted(){

    
    this.$nextTick(function() {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      });


    let request = new Request('/services/questions/get',{
        method : 'GET',
        mode: 'cors',
        headers: this.getAuthHeader()
    });

    fetch(request)
      .then((response)=>{
        return response.json()
      })
      .then((response)=>{
        console.log("dingo",response);
        response.forEach((question)=>{
          console.log("verifying question return data...",question);
          this.questionsMath.push(question);
          this.model[question.id] = { id: question.id};
          this.model[question.id][question.question] = null; 
          let questionSchema = {
            model: question.id,
            label: question.quesion,
            type: "questions",
            values: question.selections
          }
          this.schema[question.id] = {
            fields : []
          }
          this.schema[question.id].fields.push(questionSchema);
          this.$nextTick(function() {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
          });
        });

       console.log('dingo this.questionsMath',this.questionsMath);

      })
  },
  data: function(){
    return {
        questionsMath : [],
        field: null,
        model: {},  
        schema:{},
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        }
    }
  },
  mixins:[mixAuth]
}
</script>