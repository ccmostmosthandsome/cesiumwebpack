import Vue from 'vue';
import eyes from './components/eyes.vue'
import {router} from './routes'
import store from './store'
import VueRouter from 'vue-router';
import VueFormGenerator from "./components/vue-form-generator";

Vue.use(VueRouter);
Vue.use(VueFormGenerator);

const heart = new Vue({
    router,
    store,
    components: {eyes} 
})

export {heart}
