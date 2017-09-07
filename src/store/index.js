import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode';
import { getAuthHeader } from '../auth/modAuth';
import admin from './modules/admin';
Vue.use(Vuex)

const state = {
    program: {},
    mission: {},
    tableColumns: {},
    tableRows: {},
    isLoggedIn: !!localStorage.getItem("token"),
    account: {},
    accountRoles: [],
    course: {},
    questions: {},
    answeredQuestions: [],
    contractQuestions: [],
    contractAnswers: [],
    scroll: {},
    hints: {},
    dropdownPayload: {},
    file: null,
    loading: false
}
let mutations = {
    SUBSCRIBE_KOAN(state,payload){

    },
    SET_PROGRAM(state, payload){
            console.log("dingo program vuex",state,payload,payload.name);
            if(payload.length){
                let account = jwtDecode(localStorage.getItem('token'));
                Vue.set(state.program, 'userId',account.sub);
                Vue.set(state.program,'id', payload.id);
                Vue.set(state.program, payload[0].name, true);
                
                Vue.set(state.program,'koans', payload[0].koans);
            }

        
    },
    QUESTIONS_MERGE_ANSWERS(state) {
        console.log("running question merge..");
        if(state.contractAnswers.length && state.contractQuestions.length){
            state.answeredQuestions = state.contractAnswers.map((answer) => {
                console.log("questionName dingo", answer.qaQuestionId, state.contractQuestions);
                let question = state.contractQuestions.filter(question => question.qcontractId === answer.qaQuestionId)[0];
                console.log("questionName filtered", question);
                Vue.set(answer, 'questionName', question.qcontractName);
                return answer;
            });

            console.log("dingo");

                        console.log("dingo")

            console.log("dingo")
            console.log("dingo")

        } else {
            console.log("Contract Questions have not been answered...")
        }


    },
    FETCH_MISSION(state, payload) {
        Vue.set(state.mission, 'state', payload);
    },
    SET_SCROLL(state, payload) {
        Object.keys(payload)
            .forEach(scroll => {
                let documentElement = scroll;
                let scrollStatus = payload[scroll]
                Vue.set(state.scroll, documentElement, scrollStatus);
            })
        console.log("dingo")
        console.log("dingo")
        console.log("dingo")


    },
    ADD_FILE(state, payload) {
        state.file = payload;
    },
    START_LOADING(state) {
        state.loading = true;
    },
    STOP_LOADING(state) {
        state.loading = false;
    },
    QUESTIONS_CONTRACT(state, payload) {
        state.contractQuestions = payload;
    },
    ANSWERS_CONTRACT(state, payload) {
        state.contractAnswers = payload;
    },
    UPDATE_HINT(state, payload) {

        if (!state.hints[payload.coursetype]) {
            Vue.set(state.hints, payload.coursetype, []);
        }
        let hintExists = state.hints[payload.coursetype].some((hint) => {
            if (!hint.questionId) {
                return false
            }
            return hint.questionId === payload.questionId;
        })

        !hintExists ? state.hints[payload.coursetype].push(payload) : state.hints[payload.coursetype] = state.hints[payload.coursetype];
    },
    REMOVE_HINT(state, payload) {
        state.hints[payload.coursetype] = state.hints[payload.coursetype].filter(hint => hint.questionId !== payload.questionId);
    },
    ADD_DROPDOWN_PAYLOAD(state, payload) {
        Object.assign(state.dropdownPayload, payload);
    },
    ADD_QUESTIONS(state, returnObject) {
        Vue.set(state.questions, returnObject.type, returnObject.records);
    },
    changeColumns(state, col) {
        console.log("dingo dingo")
        col.columns = col.columns.filter(function (col) {
            return col.name.trim() !== 'sum' && col.name.trim() !== 'storeid';
        });
        Vue.set(state.tableColumns, col.storeid, col.columns);

    },
    changeRows(state, row) {
        console.log("dingo");
        Vue.set(state.tableRows, row.name.storeid, row.name.rows);
    },
    ADMIN_REGISTERED(state) {
        state.adminAccount = Object.assign(state, {});
    },
    LOGIN(state) {

        state.pending = true;
    },
    LOGIN_SUCCESS(state) {
        state.isLoggedIn = true;
        state.pending = false;
    },
    LOGOUT(state) {
        state.isLoggedIn = false;
        state.contractAnswers = [];
        state.mission = {};
    },
    CHANGE_ACCOUNT(state, account) {
        state.account = {};
        state.account = Object.assign(account, {});
    },
    CHANGE_COURSE(state, account) {
        state.course = Object.assign(account, {})
    }
}

const actions = {
    //changeColumns: ({commit}, state) => commit('changeColumns',state),
    //changeRows: ({commit}, state) => commit('changeRows',state),
    subscribeProgram: function({commit},state){

       


        let account = jwtDecode(localStorage.getItem('token'));
        let request = new Request('services/program/subscribe/?hasProgram=' + state.hasProgram + '&userId=' + account.sub, {
            method: 'POST',
            mode: 'cors',
            headers: getAuthHeader(),
            body: JSON.stringify(state)             
        });

        return new Promise((resolve, reject) => {
            fetch(request)
                .then(response => {
                    if(response.ok){
                        return response.json()
                    } else {
                        return reject('failed to get user program',response);
                    }
                })
                .then(response => {
                    commit('SET_PROGRAM',response);
                    resolve(response);
                })
                .catch(response => resolve(response));
        });

    }.bind(this),
    questionsMerge: ({commit},state) => commit('QUESTIONS_MERGE_ANSWERS',state),
    scrollStatus: ({ commit }, state) => commit('SET_SCROLL', state),
    addFile: ({ commit }, state) => commit('ADD_FILE', state),
    startLoading: ({ commit }, state) => commit('START_LOADING', state),
    stopLoading: ({ commit }, state) => commit('STOP_LOADING', state),
    sendDropdownPayload: ({ commit }, state) => commit('ADD_DROPDOWN_PAYLOAD', state),
    changeToken: ({ commit }, state) => commit('changeToken', state),
    changeRows: ({ commit }, state) => commit('changeRows', state),
    changeColumns: ({ commit }, state) => {

        const returnObject = {
            columns: []
        };
        for (var i in state.name) {
            let columnDisplayName = state.name[i].display || i;
            let firstLetter = columnDisplayName.charAt(0);
            let upperCase = firstLetter.toUpperCase();
            columnDisplayName = upperCase + columnDisplayName.slice(1);
            console.log("dingo")

            console.log("dingo")

            var columnObject = {
                name: i,
                displayName: columnDisplayName,
                order: state.name[i].order
            }

            returnObject.columns.push(columnObject)
        }


        //  if (state.name.type === "manySelection") {
        //      returnObject.columns.splice(0, 0, { name: "checked", displayName: null })
        //  }

        returnObject.storeid = state.name.storeid;
        commit('changeColumns', returnObject);
    },
    changeAccount: ({ commit }, state) => commit('CHANGE_ACCOUNT', state),
    changeCourse: ({ commit }, state) => commit('CHANGE_COURSE', state),
    updateHint: ({ commit }, state) => commit('UPDATE_HINT', state),
    removeHint: ({ commit }, state) => commit('REMOVE_HINT', state),
    fetchUserProgram:  ({ commit }, state) => {
        console.log("fetchUserProgram dingo program")
        let account = jwtDecode(localStorage.getItem('token'));
        return new Promise((resolve, reject) => {
            let request = new Request('services/program/' + account.sub, {
                method: 'GET',
                mode: 'cors',
                headers: getAuthHeader()                
            });
  

            fetch(request)
                .then(response => {
                      console.log("response dingo program")
                    if(response.ok){
                        console.log("response ok dingo program",response);
                        return response.json();
                    } else {
                        return reject('failed getting user program');
                    }
                })
                .then(response => {
                    console.log("set program dingo program")
                    commit('SET_PROGRAM',response)
                    console.log("dingo response",response); 
                    console.log("dingo response",response); 
                    
                    return response
                })
                .then(response => resolve(response))
                .catch(response => {
                    resolve('Error getting user program... ', response);
                });
        });
    },
    fetchMissionStatement: ({ commit }, state) => {
        let account = jwtDecode(localStorage.getItem('token'));
        return new Promise(resolve => {
            let request = new Request('/services/mission/find/' + account.sub, {
                method: 'GET',
                mode: 'cors',
                headers: getAuthHeader()
            });

            fetch(request)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    reject(response)
                })
                .then(response => commit('FETCH_MISSION', response))
                .then(response => resolve(response))
                .catch(response => {
                    resolve('error : ', response);
                })
        })
    },
    getQuestionsByFocusArea: ({commit},payload) =>{

        return new Promise((resolve,reject)=>{
            let request = new Request('/services/questions/' + payload.koan + '/' + payload.parent.coursetype + '/' + payload.item,  {
                method: 'GET',
                mode: 'cors',
                headers: getAuthHeader()
            });
            fetch(request)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                 reject(response)
            })
            .then((response) => {
                var returnObject = {
                    type: payload.item,
                    records: response
                }
    
                
                resolve(commit('ADD_QUESTIONS', returnObject));
            })
            .catch(response =>{
                resolve("Error in getting focus area...",response);
            })
        })

    },
    getQuestionsByKoan: ({commit},payload) =>{
        return new Promise(resolve => {
            let request = new Request('/services/questions/' + payload.koan, {
                method: 'GET',
                mode: 'cors',
                headers: getAuthHeader()
            });
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw (response)
                })
                .then((response) => {
                    var returnObject = {
                        type: payload.item,
                        records: response
                    }

                    commit('ADD_QUESTIONS', returnObject);
                    resolve();
                })
        });      
    },
    getByCourse: ({ commit }, payload) => {
        console.log("getting questions with course + koan dingo !!!!!!!!!!!!!!",payload);
        return new Promise(resolve => {
            let request = new Request('/services/questions/' + payload.koan + '/' + payload.item, {
                method: 'GET',
                mode: 'cors',
                headers: getAuthHeader()
            });
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw (response)
                })
                .then((response) => {
                    var returnObject = {
                        type: payload.item,
                        records: response
                    }

                    commit('ADD_QUESTIONS', returnObject);
                    resolve();
                })
        });

    },
    fetchContractAnswers: ({ commit }, userid) => {
        console.log("dingo")
        console.log("dingo")


        let account = jwtDecode(localStorage.getItem('token'));
        return new Promise(resolve => {
            let request = new Request('services/contract/answer/list/user?userid=' + account.sub, {
                method: 'GET',
                mode: 'cors',
                redirect: 'follow',
                headers: {
                    'X-Auth-Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw (response);
                })
                .then((response) => {
                    console.log("Got response for question dingo =>", response);
                    commit('ANSWERS_CONTRACT', response);
                    resolve(response);
                })
                .catch((exception) => {
                    console.log("Exception getting questions", exception);
                })

        })
    },
    fetchContractQuestions: ({ commit }) => {
        return new Promise(resolve => {
            let request = new Request('services/contract', {
                method: 'GET',
                mode: 'cors',
                redirect: 'follow',
                headers: {
                    'X-Auth-Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw (response);
                })
                .then((response) => {
                    commit('QUESTIONS_CONTRACT', response);
                    resolve();
                })
                .catch((exception) => {
                    console.log("Exception getting questions", exception);
                })

        })
    },
    getQuestions: ({ commit }, type) => {
        return new Promise(resolve => {
            let request = new Request('/services/questions/get', {
                method: 'GET',
                mode: 'cors',
                headers: getAuthHeader()
            });

            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }

                    throw (response);

                })
                .then((response) => {
                    var returnObject = {
                        type: type,
                        records: response
                    }
                    response.type = type;
                    commit('ADD_QUESTIONS', returnObject);
                    resolve();
                })
                .catch((response) => {

                })

        })
    },
    login: ({ commit }, creds) => {
        return new Promise((resolve,reject) => {
            const requestLogin = {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify(creds),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }

            fetch('/services/auth', requestLogin)
                .then((response) => {
                    if (!response.ok) {
                         reject(response.statusText);
                    }
                     return response.json();
                })
                .then((response,err) => {
                    if(!err){
                        localStorage.setItem("token", response.token);
                        commit('LOGIN_SUCCESS');
                        return resolve('success');
                    }

                })
                .catch(response => resolve(response))
        });
    },
    logout({ commit }) {
        console.log("Removing the token!!!");
        state.program = {};
        localStorage.removeItem("token")
        commit('LOGOUT');
    },
    register: ({ commit }, creds) => {
        return new Promise(resolve => {
            const requestLogin = {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify(creds),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }

            fetch('/services/auth/register', requestLogin)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then((response) => {
                    localStorage.setItem("token", response.token);
                    commit('LOGIN_SUCCESS');
                    resolve();
                })
        })
    }
}
const getters = {
    program : state => {
        return state.program;
    },
    hasProgram: state => {
        console.log("dingo program ???",state.program);
        return state.program['userId'] !== undefined;
    },
    getAnsweredQuestions: state => {
        return state.answeredQuestions; 
    },
    hasMissionStatement: state => {
        return state.contractAnswers.length > 0 && state.mission['state'] !== undefined;
    },
    getMission: state => {
        return state.mission;
    },
    dropdownPayload: state => {
        return state.dropdownPayload;
    },
    isLoggedIn: state => {
        return state.isLoggedIn;
    },
    isAdmin: state => {
        return state.isAdmin;
    },
    isContractRegistered: state => {
        console.log("dingo content store", state.contractAnswers)
        return state.contractAnswers.length > 0;
    },
    getContractAnswers: state => {
        return state.contractAnswers;
    },
    getContractQuestions: state => {
        return state.contractQuestions;
    },
    getColState: (state, getters) => (storeid) => {


        return state.tableColumns[storeid]
    },
    questions: (state, getters) => (koans) => {
        let questions = [];
        for(var type in state.questions){
            console.log("dingo store questions type",koans.indexOf(type));
            if(koans.indexOf(type) >= 0){
                questions= questions.concat(state.questions[type]);
            }
        }
        console.log("dingo store questions post concat",questions);
        return questions;
    },
    question: (state, getters) => (storeid, id) => {
        let question = state.questions[storeid].filter((question) => {
            return question.id = id;
        });

        return question[0];
    },
    getRowState: (state, getters) => (storeid) => {
        return state.tableRows[storeid];
    },
    getCourseHints: (state, getters) => (coursetype) => {

        return state.hints[coursetype];
    },
    getFile: state => {
        return state.file;
    },
    getLoading: state => {
        return state.loading;
    },
    scrollStatus: (state, getters) => (document) => {
        console.log("dingo ")
        console.log("dingo ")

        console.log("dingo ")

        return state.scroll[document]
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        admin
    }
})