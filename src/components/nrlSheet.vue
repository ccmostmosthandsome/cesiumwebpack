<template>
  <div class="panel-body">
    <client-question number="One">
       <span slot="symbols">



          <p> Given `f(x) = 2x^2 - 3x + 7`, find `f(2.5) .` </p>
       </span>
       <span slot="form">
        <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
       </span>
       
       
    </client-question>
    
    
    <br/>
    

  </div>
</template>

<script>

import VueFormGenerator from "./vue-form-generator";
import clientQuestion from "./questions/clientQuestion.vue"
export default {
  components: {clientQuestion},
  methods: {
      newField(){
          this.field = this.field + '_' + Math.floor(Math.random * 10);
          this.model[this.field] = "test"
          this.schema.fields.push({
            type: "input",
            inputType: "text",
            label:  this.model[this.field],
            model: this.model[this.field],
            placeholder: "New Field",
            featured: true,
            required: true           
          })
      }
  },
  mounted(){
                this.$nextTick(function() {
                     MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                 });
  },
  data: function(){
    return {
        field: null,
        model: {             
            id: 1,
            name: "John Doe",
            password: "J0hnD03!x4",
            skills: ["Javascript", "VueJS"],
            email: "john.doe@gmail.com",
            status: true
        },
    
        schema: {
        fields: [{
            type: "questions",
            model: "skills",      
            values: ["5", "12", "19", "24"]
        }]
        },

        formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
        }
    }

  }
}
</script>