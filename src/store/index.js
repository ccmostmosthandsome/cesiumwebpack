import Vue from 'vue'
import Vuex from 'vuex'

import jwtDecode from 'jwt-decode';
import { getAuthHeader } from '../auth/modAuth';
Vue.use(Vuex)

const state = {
    tableColumns: {},
    tableRows: {},
    isLoggedIn: !!localStorage.getItem("token"),
    account: {},
    accountRoles: [],
    course: {},
    questions: {},
    contractQuestions: [],
    contractAnswers: [],
    scroll: {},
    hints: {},
    dropdownPayload: {},
    file: null,
    loading: false
}

const mutations = {
    SET_SCROLL(state,payload){
        Object.keys(payload)
            .forEach(scroll =>{
                let documentElement = scroll;
                let scrollStatus = payload[scroll]
                Vue.set(state.scroll,documentElement,scrollStatus);
            })
      console.log("dingo")
      console.log("dingo")
      console.log("dingo")

        
    },
    ADD_FILE(state, payload){
        state.file = payload;
    },
    START_LOADING(state){
        state.loading = true;
    },
    STOP_LOADING(state){
        state.loading = false;
    },
    QUESTIONS_CONTRACT(state, payload) {
        state.contractQuestions = payload;
    },
    ANSWERS_CONTRACT(state,payload){
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
        col.columns = col.columns.filter(function(col){
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
    scrollStatus: ({commit}, state) => commit('SET_SCROLL',state),
    addFile: ({commit}, state) => commit('ADD_FILE',state),
    startLoading: ({commit}, state) => commit('START_LOADING',state),
    stopLoading: ({commit}, state) => commit('STOP_LOADING',state),
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
    getByCourse: ({ commit }, course) => {
        return new Promise(resolve => {
            let request = new Request('/services/questions/get/coursetype?coursetype=' + course, {
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
                        type: course,
                        records: response
                    }

                    commit('ADD_QUESTIONS', returnObject);
                    resolve();
                })
        });

    },
    fetchContractAnswers: ({ commit }, userid) => {
        return new Promise(resolve => {
            let request = new Request('services/contract/answer/list/user?userid=' + userid, {
                method: 'GET',
                mode: 'cors',
                redirect: 'follow',
                headers: {
                    'X-Auth-Token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            fetch(request)
                .then((response)=>{
                    if(response.ok){
                        return response.json()
                    }
                    throw(response);
                })
                .then((response)=>{
                    commit('ANSWERS_CONTRACT',response);
                    resolve();
                })
                .catch((exception)=>{
                    console.log("Exception getting questions",exception);
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
                .then((response)=>{
                    if(response.ok){
                        return response.json()
                    }
                    throw(response);
                })
                .then((response)=>{
                    commit('QUESTIONS_CONTRACT',response);
                    resolve();
                })
                .catch((exception)=>{
                    console.log("Exception getting questions",exception);
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

            fetch('/services/auth', requestLogin)
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
        });
    },
    logout({ commit }) {
        console.log("Removing the token!!!");
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
    dropdownPayload: state => {
        return state.dropdownPayload;
    },
    isLoggedIn: state => {
        return state.isLoggedIn;
    },
    isAdmin: state => {
        return state.isAdmin;
    },
    isContractRegistered: state =>{
        return state.contractAnswers.length > 0
    },
    getColState: (state, getters) => (storeid) => {


        return state.tableColumns[storeid]
    },
    questions: (state, getters) => (questionid) => {
        return state.questions[questionid];
    },
    question:(state, getters) => (storeid, id) =>{
        let question = state.questions[storeid].filter((question)=>{
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
    getFile: state=>{
        return state.file;
    },
    getLoading: state=>{
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
    mutations
})