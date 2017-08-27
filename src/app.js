import Vue from 'vue';
import casRoot from './components/root/casRoot.vue'
import {router} from './routes'
import store from './store'
import VueRouter from 'vue-router';
import VueFormGenerator from "./components/vue-form-generator";
import BootstrapVue from 'bootstrap-vue';
import VueHtml5Editor from 'vue-html5-editor';
import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription' // Disposable if using RxJS4
import { Subject } from 'rxjs/Subject' // required for domStreams option
import 'font-awesome/css/font-awesome.css';
import richEditorOptions from './schemas/editor';
Vue.use(VueRouter);
Vue.use(VueFormGenerator);
Vue.use(BootstrapVue);
Vue.use(VueHtml5Editor,richEditorOptions);
Vue.use(VueRx, {
  Observable,
  Subscription,
  Subject
})

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './utilities/imagehover.min.css'

const app = new Vue({
    router,
    store,
    components: {casRoot} 
})

export {app}
