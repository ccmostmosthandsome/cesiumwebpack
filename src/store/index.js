import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    tableColumns: [],
    tableRows : [],
    isLoggedIn : !!localStorage.getItem("token"),
    account: {}
}

const mutations = {
    changeColumns(state, col) {
        state.tableColumns = col
    },
    changeRows(state, row){
        state.tableRows = row
    },
    LOGIN(state){
        state.pending = true;
    },
    LOGIN_SUCCESS(state){
        state.isLoggedIn = true;
        state.pending = false; 
    },
    LOGOUT(state) {
        state.isLoggedIn = false;
    },
    CHANGE_ACCOUNT(state, account){
        state.account = {};
        state.account = Object.assign(account,{});
    }
}

const actions = {
    changeColumns: ({commit}, state) => commit('changeColumns',state),
    changeRows: ({commit}, state) => commit('changeRows',state),
    changeToken: ({commit}, state)=> commit('changeToken', state),
    changeAccount: ({commit}, state) => commit('CHANGE_ACCOUNT',state),
    login:({commit}, creds)=>{
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

            fetch('/services/auth',requestLogin)
                .then((response)=>{
                    if(!response.ok){
                        throw Error(response.statusText);
                    } 
                    return response.json();
                })
                .then((response)=>{
                    localStorage.setItem("token",response.token);
                    commit('LOGIN_SUCCESS');
                    resolve();
                })
        });
    },
    logout({commit}){
        console.log("Removing the token!!!");
        localStorage.removeItem("token")
        commit('LOGOUT');
    },
    register: ({commit}, creds)=>{
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

            fetch('/services/auth/register',requestLogin)
                .then((response)=>{
                    if(!response.ok){
                        throw Error(response.statusText);
                    } 
                    return response.json();
                })
                .then((response)=>{
                    localStorage.setItem("token",response.token);
                    commit('LOGIN_SUCCESS');
                    resolve();
                })          
        })
    }
}

const getters = {
    isLoggedIn : state => {
        return state.isLoggedIn
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})