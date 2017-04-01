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



import VueRouter from 'vue-router'

const routes = [
    {path: '/home', component: nrlHome},
    {path: '/map', component: nrlMap},
    {path: '/form', component: nrlForm}
]

const router = new VueRouter({
    routes
})

export {router}