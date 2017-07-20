<style>
.navBarDisplay {
    display: inline-block;
}
</style>
<script>


import mixDropDown from '../../mixins/mixDropDown'
import { EventBus } from '../../eventbus/index';
import { getAuthHeader } from '../../auth/modAuth';
import VueRouter from 'vue-router'
import casTraditionallayout from '../layout/casTraditionallayout.vue'
import clientNavbar from '../layout/clientNavbar.vue'
import mixAuth from '../../auth/mixAuth';
import clientToggle from '../buttons/clientToggle.vue'
import menuSchema from '../tree/courseQuestionDropdown'
import casTree from '../tree/casTree.vue'
import casPalmadoro from '../timers/casPalmadoro.vue'
import modelData from '../tree/casTreeMock'
import lodash from 'lodash';
console.log("compoennts =>", casTraditionallayout, clientNavbar, clientToggle, casTree, casPalmadoro);
console.log("mixins =>", mixAuth);
export default {
    name: 'casRoot',
    components: { casTraditionallayout, clientNavbar, clientToggle, casTree, casPalmadoro },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
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
        }
    },
    data: function () {

        return {
            coursetype: null,
            schema: menuSchema,
            modelData: modelData,
            questionsCategory: '',
            tree: {},
            questionHint: []
        }
    },
    methods: {
        auth() {
            console.log("in auth");
            if (this.$store.getters.isLoggedIn) {
                console.log("logging out...");
                // this.userAccount = ??{};
                this.$store.dispatch('logout');
                // this.labels = {"unchecked" : 'Login', "checked" : 'Logout'}          
            } else {
                this.$router.push('/login');
                console.log("this.labels in auth", this.labels);
                this.labels = { "unchecked": 'Logout', "checked": 'Login' };

            }
        },
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

    },
    mixins: [mixAuth, mixDropDown],
    mounted() {

        this.$store.dispatch("getQuestions", 'GED')
            .then((response) => {
                this.loading = false;
                this.createTree();

            })
        EventBus.$on('dropdownPayload', (payload) => {

            console.log("dingo");
            console.log("dingo");
            console.log("dingo");
            console.log("dingo");

            this.fetchResults(payload)
                .then(function () {
                    console.log("dingo");
                    console.log("dingo");
                    console.log("dingo");
                    console.log("dingo", payload);

                    this.questionsByCourse = payload.item;

                    this.coursetype = payload.item;
                }.bind(this))
            console.log("got dropdown payload from eventbus =>>", payload)

        });

        EventBus.$on('showHint', (payload) => {
            console.log("dingo dingo", payload, payload.questionId); //services/questions/find/content/questionid
            let request = new Request('/services/questions/find/content/questionid?questionid=' + payload.questionId, {
                method: 'GET',
                mode: 'cors',
                headers: getAuthHeader()
            });
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                })
                .then((response) => {
                    console.log("response??", response);
                    response.coursetype = this.coursetype;
                    this.$store.dispatch("updateHint", response);

                })
            ///find/questionid
        })
    }
}
</script>
<template>
    <div>
        <client-navbar>
    
            <span slot="right" style="display: inline-block;">
                <cas-palmadoro></cas-palmadoro>   
                <span v-if="isLoggedIn" class="navBarDisplay">
                    <span>
    
                        <span style="color:#337A87 ; cursor: pointer" @click="auth">
                            <i class="glyphicon glyphicon-user" aria-hidden="true"></i> &nbsp; Log out {{account.sub}}
                        </span>
                    </span>
    
                </span>
                <div v-if="!isLoggedIn">
                    <router-link to="/login">
                        <i class="glyphicon glyphicon-user"></i> Log In
                    </router-link>
    
                </div>

            </span>
    
        </client-navbar>
        <cas-traditionallayout>
            <div slot="sidebar">
    
                <ul class="nav navbar-nav" id="sidenav01">
                    <li>
                        <router-link to="/home">
                            <span class="glyphicon glyphicon-home"></span> Home
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/map">
                            <span class="glyphicon glyphicon-road"></span> Map Cesium
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'questionView', params: {model : tree, menuSchema : schema.menuSchema, showRoot: false}}">
                            <span class="glyphicon glyphicon-list-alt"></span> Questions
    
                            <router-view name="treeMenu"></router-view>
                        </router-link>
                    </li>
                    <li v-if="isAdmin">
    
                        <router-link to="/admin">
                            <span class="glyphicon glyphicon-list-alt"></span> Admin Tool
                        </router-link>
    
                    </li>
    
                </ul>
    
            </div>
            <div slot="content">
    
                <router-view :questions="questionsByCourse"></router-view>
            </div>
            <div slot="aside">
    
                <router-view name="aside" :course="coursetype">
    
                </router-view>
    
            </div>
        </cas-traditionallayout>
    </div>
</template>