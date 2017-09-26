/* ES6 Module for VUEX. Appears that mixins are exclusive to components and arenot something normally used via a store */
import Vue from 'vue';
import store from '../store/index.js';
import jwtDecode from 'jwt-decode';
function  getAuthHeader(){
            return {
                'X-Auth-Token' : localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
}

function getAccount(){
    if(store.getters.isLoggedIn){
        return  jwtDecode(localStorage.getItem('token'));
    } else {
        return null;
    }
}

export {getAuthHeader, getAccount}