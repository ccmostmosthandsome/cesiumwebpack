<style>
.navBarDisplay {
    display: inline-block;
}

.prompt {
    font-size: 14px;
    font-weight: bold;f
    height: 15px;
    padding: 20px 30px 20px 30px;
    letter-spacing: 1px;
    -moz-border-radius: 0px 0px 3px 3px;
    -webkit-border-radius: 0px 0px 3px 3px;
    border-radius: 0px 0px 3px 3px;
}

.prompt--state-error {
    background-color: #d03e3e;
    font-weight: bold;
    padding: 20px 10px 20px 10px;
    color: #fff;
    height: 75px;
}

.prompt--state-success {
    background-color: #41B883;
    padding-bottom: 35px;
    text-align: center;
    color: #fff;
}

.badge {
    padding: 1px 9px 2px;
    font-size: 12.025px;
    font-weight: bold;
    white-space: nowrap;
    color: #ffffff;
    background-color: #999999;
    -webkit-border-radius: 9px;
    -moz-border-radius: 9px;
    border-radius: 9px;
}

.badge:hover {
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
}

.badge-info {
    background-color: #3a87ad;
}
</style>
<script>

import mixDropDown from '../../mixins/mixDropDown'
import { EventBus } from '../../eventbus/index';
import { getAuthHeader } from '../../auth/modAuth';
import VueRouter from 'vue-router'
import casTraditionallayout from '../layout/casTraditionallayout.vue'
import clientNavbar from '../layout/clientNavbar.vue';
import casKoanTree from '../questions/casKoanTree.vue';
import mixAuth from '../../auth/mixAuth';
import mixPersistence from '../../mixins/mixPersistence'
import clientToggle from '../buttons/clientToggle.vue'
import menuSchema from '../../schemas/treeDropdown'
import casTree from '../tree/casTree.vue'
import modelData from '../tree/casTreeMock'
import lodash from 'lodash';
import RX from 'rxjs';

export default {
    name: 'casRoot',
    components: { casTraditionallayout, clientNavbar, clientToggle, casTree, casKoanTree },
    computed: {
        isLoggedIn() {
           // return this.$store.getters.isLoggedIn;
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
        programStatus: {
            get(){
                return this.program
            },
            set(obj){
                console.log("dingo")
                 console.log("dingo")
                  console.log("dingo",obj)
                   console.log("dingo",Object.values(obj)[0]);
                   this.$set(this.program.grades,Object.keys(obj)[0],Object.values(obj)[0])
                 console.log("dingo",this.program);
            }
        },
        dashboardTree: {
            get(){
                return this.$store.getters.tree;
            }
        }

    },
    created() {
        this.$store.dispatch("getQuestions", 'GED')
            .then((response) => {
                console.log("Creating tree!!!!!!!!!!",response);
                this.loading = false;
                this.createTree();
            })
        this.persistenceGet('services/program/find/', this.account.sub)
            .then(response => {

                Object.assign(this.program, response[0]);
                console.log("this.program", this.program);

            })
    },
    data: function () {
        return {
            program: {},
            coursetype: null,
            schema: menuSchema,
            modelData: modelData,
            questionsCategory: '',
            grading: {},
            tree: {},
            questionHint: [],
            grade: {}
        }
    },
    subscriptions() {
        var gradeObservable = this.$watchAsObservable('grade')
            .map((e) => {
                console.log("dingo subscription...",e);
                return {
                    coursetype: e.newValue.coursetype,
                    percent: e.newValue.correct ? 100 : 0,
                    correct: e.newValue.correct,
                    id: e.newValue.id
                }
            })
            .filter((e) => e.id)
            .scan((acc, curr) => {
                if (acc[curr.coursetype] !== undefined) {

                    console.log("dingo subscription reduce...",acc);
                    if (!acc[curr.coursetype][curr.id]) {
                        this.$set(acc[curr.coursetype], 'count', acc[curr.coursetype].count + 1);
                        this.$set(acc[curr.coursetype], 'percent', curr.percent + acc[curr.coursetype].percent);
                        this.$set(acc[curr.coursetype], 'grade', grade(acc[curr.coursetype].count, acc[curr.coursetype].percent));
                        this.$set(acc[curr.coursetype], curr.id, { 'count': 1 });

                        console.log("Observable reduce", acc);
                    }
                } else {
                    console.log("dingo subscription reduce...",acc,curr);
                    this.$set(acc, curr.coursetype, { percent: curr.percent, count: 1 })
                    this.$set(acc[curr.coursetype], curr.id, { count: 1 });
                    this.$set(acc[curr.coursetype], 'grade', grade(1, curr.percent));


                }
                return acc

                function grade(totalcount, totalpercent) {
                    return (totalpercent / (totalcount * 100)) * 100;
                }
            }, {})
            .do((grade) => {
                console.log("doing dingo");
                for(let course in grade){
                    let courseStatus = {}
                    courseStatus[course] = grade[course].grade;
                    this.programStatus = courseStatus;
                }                
                this.persistencePut('services/program/update', this.programStatus)
                    .then(response => {
                        console.log("TODO: Need to be returning the program's grade");
                    })
                return grade;

            })


        return {
            $gradeObservable: gradeObservable
        }
    },
    methods: {
        auth() {
            console.log("in auth");
            if (this.$store.getters.isLoggedIn) {
                console.log("logging out...");
                // this.userAccount = ??{};
                //this.$gradeObservable= [];
                this.$store.dispatch('logout');

                this.$router.push('/');
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

            let context = this;
            context.parent = 'Root';

            this.$set(this.tree, 'id', 'Root')
            this.$set(this.tree, 'attr', { type: 'course' })
            this.$set(this.tree, 'parent', 'false')
            this.$set(this.tree, 'children', this.getCourses());




        },

    },
    mixins: [mixAuth, mixDropDown, mixPersistence],
    mounted() {
   

        EventBus.$on('grade', function (value, model) {
            
            console.log("dingo grade",value);

            if (value.correct || value.exceededTries) {
                console.log("dingo setting grade observable =>",value, this.$gradeObservable);
                
                this.$set(this,'grade',value);
                console.log("dingo setting grade observable =>",this.$gradeObservable);
                
            }

        }.bind(this));

        EventBus.$on('dropdownPayload', (payload) => {
            console.log("dingo payload!!!!!!!!!!!!!!!!!!!!!!!!!!!!", payload);
            this.fetchResults(payload)
                .then(function () {
                     console.log("dingo running payload!!!!!!!!!!!!!!!!!!!!!!!!!!!!", payload);

                    this.questionsByCourse = payload.item;
                    this.$store.dispatch('initDashboardQuestions',this.questionsByCourse);
                    this.$store.dispatch('initDashboard');
                    this.coursetype = payload.item;
                }.bind(this))


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
    
               
                <span v-if="isLoggedIn" class="navBarDisplay">
                    <span>

                        <span style="color:#337A87 ; cursor: pointer" @click="auth">
                            <i class="glyphicon glyphicon-user" aria-hidden="true"></i> &nbsp; Log out {{account.sub}}
                        </span>
                    </span>
    
                </span>
                <div v-if="!isLoggedIn">
                    <router-link to="/login">
                        <i class="glyphicon glyphicon-user"></i> Log In or Register
                    </router-link>
    
                </div>
                
    
            </span>
    
        </client-navbar>
        <cas-traditionallayout :asideViews="['questionView']">
            <div slot="sidebar">
                <ul class="nav navbar-nav" id="sidenav01">
                    <li>
                        <router-link to="/home">
                            <i class="fa fa-home fa-fw"></i> Home
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/map">
                            <span class="glyphicon glyphicon-road"></span> Life Map
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'questionView', params: {model : tree, menuSchema : schema.menuSchema, showRoot: false}}">
                            <span class="glyphicon glyphicon-list-alt"></span> ~Koans~
    
                            <router-view name="treeMenu">
    
                            </router-view>
                        </router-link>
                    </li>

                    <li v-if="isAdmin">
    
                        <router-link to="/admin">
                            <span class="glyphicon glyphicon-list-alt"></span> Admin Tool
                        </router-link>
    
                    </li>

                </ul>
    
            </div>
            <div slot="content" >

                <router-view :questions="questionsByCourse" :programStatus="programStatus" :gradeStream="$gradeObservable" ></router-view>
            </div>
            <div slot="aside" style="margin-left: 0;">
    
                <router-view name="aside" :course="coursetype">
    
                </router-view>
    
            </div>
        </cas-traditionallayout>
    </div>
</template>