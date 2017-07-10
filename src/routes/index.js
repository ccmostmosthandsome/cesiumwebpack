const nrlHome = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(['../components/nrlHome.vue'], () => {
    resolve(require('../components/nrlHome.vue'))
  })
}

const nrlMap = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(['../components/nrlMap.vue'], () => {
    resolve(require('../components/nrlMap.vue'))
  })
}


const nrlForm = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(['../components/nrlForm.vue'], () => {
    resolve(require('../components/nrlForm.vue'))
  })
}

const nrlQuestions = resolve =>{
  require.ensure(['../components/nrlSheet.vue'],() =>{
    resolve(require('../components/nrlSheet.vue'));
  });
}


const casAdmin = resolve =>{
  require.ensure(['../components/adminTool/casAdmin.vue'],() =>{
    resolve(require('../components/adminTool/casAdmin.vue'));
  });
}

const casLogin = resolve =>{
  require.ensure(['../components/loginpage/casLogin.vue'],() =>{
    resolve(require('../components/loginpage/casLogin.vue'));
  });
}

const casRegister = resolve =>{
  require.ensure(['../components/loginpage/casRegister.vue'],() =>{
    resolve(require('../components/loginpage/casRegister.vue'));
  });
}

import VueRouter from 'vue-router'

const routes = [
    {path: '/home', component: nrlHome},
    {path: '/map', component: nrlMap},
    {path: '/form', component: nrlForm},
    {path: '/questions', component: nrlQuestions},
    {path: '/admin', component: casAdmin},
    {path: '/login', component: casLogin},
    {path: '/register', component: casRegister}
]

const router = new VueRouter({
    routes
})

export {router}