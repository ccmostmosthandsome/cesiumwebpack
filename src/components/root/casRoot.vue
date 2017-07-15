<style>

</style>
<script>

import jwtDecode from 'jwt-decode';


import VueRouter from 'vue-router'
import casTraditionalayout from '../layout/casTraditionalayout.vue'
import clientNavbar from '../layout/clientNavbar.vue'
import {mixAuth} from '../../auth/mixAuth'
import clientToggle from '../buttons/clientToggle.vue'
import menuSchema from '../tree/courseQuestionDropdown'
import casTree from '../tree/casTree.vue'
import modelData from '../tree/casTreeMock'
console.log("compoennts =>",casTraditionalayout, clientNavbar, clientToggle, casTree );
console.log("mixins =>",mixAuth);
export default {
    name: 'casRoot',
    components: { casTraditionalayout, clientNavbar, clientToggle, casTree },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        questions: {
            cache: false,
            get() {
                return this.$store.getters.questions('GED');
            }

        }
    },
    data: function () {

        return {
            whatTheFuck:  jwtDecode(localStorage.getItem('token')),
            schema: menuSchema,
            modelData: modelData
        }
    },
    methods: {
        auth() {
            console.log("in auth");
            if (this.$store.getters.isLoggedIn) {
                console.log("logging out...");
                // this.userAccount = {};
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
                if (!acc[curr.coursetype]) {
                    acc[curr.coursetype] = {
                        "id": curr.coursetype,
                        "text": curr.coursetype,
                        "parent": this.parent,
                        "attr": { "type": 'course' },
                        "children": []
                    }
                }
                return acc;
            },{})
            return Object.keys(questionObject).map((question) => { return questionObject[question] });

        },
        getModules() {

        },
        treeEtl() {
            console.log("dingo");
            console.log("dingo")

            console.log("dingo")
            let context = this;
            context.parent = 'Root';
            const tree = {
                id: 'Root',
                attr: { type: 'course' },
                parent: 'false',
                children: this.getCourses()
            }

            console.log("dingo");
            console.log("dingo")

            console.log("dingo")



        },
        mixins: [mixAuth],
        mounted() {

            this.$store.dispatch("getQuestions", 'GED')
                .then((response) => {
                    this.loading = false;
                })

        }
    }
}
</script>
<template>
    <div>
        <client-navbar>
    
            <div slot="right">
                <li>
                    <div v-if="isLoggedIn">
    
                        <span style="color:#337A87 ; cursor: pointer" @click="auth">
                            <i class="glyphicon glyphicon-user" aria-hidden="true"></i> &nbsp; Log out 
                        </span>
    
                    </div>
                    <div v-if="!isLoggedIn">
                        <router-link to="/login">
                            <i class="glyphicon glyphicon-user"></i> Log In
                        </router-link>
    
                    </div>
                </li>
                <li>
                    <button class="btn btn-success btn-xs" @click="treeEtl">ETL</button>
                </li>
            </div>
        </client-navbar>
        <cas-traditionalayout>
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
                        <router-link :to="{name: 'questions', params: {model : modelData.modelData, menuSchema : schema.menuSchema, showRoot: false}}">
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
                <h3>
                    <span class="glyphicon glyphicon-th-list"></span> NRL Prototyping</h3>
                <router-view></router-view>
            </div>
            <div slot="aside">
                <p>
                    WTF?? {{mixAuth}}
                </p>
                <h3>
                    <span class="glyphicon glyphicon-th-list"></span>
                </h3>
                <router-view name="aside">
    
                </router-view>
    
            </div>
        </cas-traditionalayout>
    </div>
</template>