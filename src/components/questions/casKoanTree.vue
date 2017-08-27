<template>
        <div>
            <p>dingo koans: {{koans}}</p>
            <cas-tree :model="tree" :menuSchema="schema.menuSchema" />
        </div>    
</template>

<script>
import casTree from "../tree/casTree.vue";
import menuSchema from '../tree/courseQuestionDropdown';
import store from '../../store/index.js';

export default {
    'name': 'casKoanTree',
    beforeRouteEnter: function(to, from, next){
        //Get Program
        //Q All promise through it to get questins which match koans
        store.dispatch('fetchUserProgram')
                .then(response => next());
    },
    components: { casTree },
    computed: {
        questions: {
            cache: true,
            get() {
                return this.$store.getters.questions(this.koans);
            }
        },
        questionsByCourse: {
            get() {
                return this.$store.getters.questions(this.questionsCategory);
            },
            set(category) {
                this.questionsCategory = category;
                return this.$store.getters.questions(this.questionsCategory);
            }
        },
        grades: {
            get() {
                return this.grading
            },
            set(grades) {
                this.grading = grades;
            }
        },
        koans(){
            console.log("dingo getting koans..")
            let program = this.$store.getters.program
            return program.koans.map(koan => koan.koan)
        },
        parsedQuestions(){
            return this.questions.filter(question => this.koans.indexOf(question.koan) >= 0);
        }
    },
    created() {
        
    },
    data: function () {
        return {
            tree: {},
            schema: menuSchema
        }
    },
    methods: {
        getKoans(){
            var questionObject = this.parsedQuestions.reduce(function (acc, curr) {
                var context = this;
                context.parent = curr;
                if (!acc[curr.koan]) {
                    acc[curr.koan] = {
                        "id": curr.koan,
                        "text": curr.koan,
                        "parent": 'Root',
                        "attr": { "type": 'course' },
                        "children": this.getCourses.call(context)
                    }
                }
                return acc;
            }.bind(this), {})
            return Object.keys(questionObject)
                .map((question) => { return questionObject[question] })
                .filter(question => question.id);            
        },
        getCourses() {
            

            var questionObject = this.parsedQuestions.reduce(function (acc, curr) {
                var context = this;
                context.parent = curr;
                if (!acc[curr.coursetype]) {
                    acc[curr.coursetype] = {
                        "id": curr.coursetype,
                        "text": curr.coursetype,
                        "parent": this.parent,
                        "attr": { "type": 'course' },
                        "children": this.getModules.call(context)
                    }
                }
                return acc;
            }.bind(this), {})
            return Object.keys(questionObject)
                .map((question) => { return questionObject[question] })
                .filter(question => question.id);

        },
        getModules() {
            var moduleObject = this.parsedQuestions.reduce(function (acc, curr) {
                if (!acc[curr.modtype] && this.parent.coursetype === curr.coursetype) {
                    acc[curr.modtype] = {
                        "id": curr.id,
                        "text": curr.modtype,
                        "parent": this.parent.id,
                        "attr": { "type": 'mod' },
                        "children": []
                    }
                }
                return acc;
            }.bind(this), {})
            return Object.keys(moduleObject)
                .map((module) => { return moduleObject[module] })
                .filter(module => module.id);
        },
        createTree() {
            console.log("dingo");
            console.log("dingo")

            console.log("dingo")
            let context = this;
            context.parent = 'Root';

            this.$set(this.tree, 'id', 'Root')
            this.$set(this.tree, 'attr', { 'type': 'course' })
            this.$set(this.tree, 'parent', 'false')
            this.$set(this.tree, 'children', this.getKoans());
            console.log("dingo");
            console.log("dingo")

            console.log("dingo")



        },
    },
    mounted(){
        console.log("Dingo koan tree activated!!!");
        this.createTree();
    }
}
</script>

<style>

</style>
