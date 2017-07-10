import Vue from 'vue';
import casRoot from './components/root/casRoot.vue'
import {router} from './routes'
import store from './store'
import VueRouter from 'vue-router';
import VueFormGenerator from "./components/vue-form-generator";
import BootstrapVue from 'bootstrap-vue';
Vue.use(VueRouter);
Vue.use(VueFormGenerator);
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = new Vue({
    router,
    store,
    components: {casRoot} 
})

export {app}
