<template>
        <div>
            
            <cas-tree :model="tree" :menuSchema="schema.menuSchema" />
        </div>    
</template>

<script>
import casTree from "../tree/casTree.vue";
import menuSchema from '../../schemas/treeDropdown';
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
        koanQuestions(){
            return this.questions.filter(question => this.koans.indexOf(question.koan) >= 0);
        }
    },
    created() {
        
    },
    data: function () {
        return {
            tree: {},
            courseKoanQuestions : {},
            schema: menuSchema
        }
    },
    methods: {
        getKoans(){
            var questionObject = this.koanQuestions.reduce(function (acc, curr) {
                var context = this;
                context.parent = curr;
                
                if (!acc[curr.koan]) {
                    this.courseKoanQuestions[curr.koan] = this.koanQuestions.filter(question => question.koan == curr.koan);
                    this.koanQuestions
                    acc[curr.koan] = {
                        "id": curr.koan,
                        "text": curr.koan,
                        "parent": this.parent,
                        "attr": { "type": 'koan' },
                        "children": this.getCourses.call(context,curr.koan)
                    }
                }
                return acc;
            }.bind(this), {})
            return Object.keys(questionObject)
                .map((question) => { return questionObject[question] })
                .filter(question => question.id);            
        },
        getCourses(koan) {
            

            var questionObject = this.courseKoanQuestions[koan].reduce(function (acc, curr) {
                var context = this;
                context.parent = curr;
                console.log("dingo this.parent.koan", this.courseKoanQuestions[koan] );
                if (!acc[curr.coursetype] && this.parent.koan == curr.koan) {
                    acc[curr.coursetype] = {
                        "id": curr.coursetype,
                        "text": curr.coursetype,
                        "parent": this.parent,
                        "attr": { "type": 'course' },
                        "children": this.getModules.call(context,koan)
                    }
                }
                return acc;
            }.bind(this), {})
            return Object.keys(questionObject)
                .map((question) => { return questionObject[question] })
                .filter(question => question.id);

        },
        getModules(koan) {
            var moduleObject = this.courseKoanQuestions[koan].reduce(function (acc, curr) {
                if (!acc[curr.modtype] && this.parent.coursetype === curr.coursetype) {
                    acc[curr.modtype] = {
                        "id": curr.modtype,
                        "text": curr.modtype,
                        "parent": this.parent,
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
