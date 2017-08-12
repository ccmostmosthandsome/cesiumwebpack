<template>
    <cas-tree :model="tree" :menuSchema="schema.menuSchema" />
</template>

<script>
import casTree from "../tree/casTree.vue";
import menuSchema from '../tree/courseQuestionDropdown';
export default {
    'name': 'casKoanTree',
    components: { casTree },
    computed: {
        questions: {
            cache: false,
            get() {
                return this.$store.getters.questions('GED');
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
        }
    },
    created() {
        this.$store.dispatch("getQuestions", 'GED')
            .then((response) => {
                console.log("Creating tree!!!!!!!!!!", this.schema, this.questions);
                this.loading = false;
                this.createTree();
            })
    },
    data: function () {
        return {
            tree: {},
            schema: menuSchema
        }
    },
    methods: {
        getCourses() {

            var questionObject = this.questions.reduce(function (acc, curr) {
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
            var moduleObject = this.questions.reduce(function (acc, curr) {
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
            this.$set(this.tree, 'attr', { type: 'course' })
            this.$set(this.tree, 'parent', 'false')
            this.$set(this.tree, 'children', this.getCourses());
            console.log("dingo");
            console.log("dingo")

            console.log("dingo")



        },
    }
}
</script>

<style>

</style>
