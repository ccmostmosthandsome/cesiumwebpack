const casHome = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(['../components/homepage/casHome.vue'], () => {
    resolve(require('../components/homepage/casHome.vue'))
  })
}
/*
const nrlMap = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(['../components/lifemap/casMap.vue'], () => {
    resolve(require('../components/lifemap/casMap.vue'))
  })
}
*/



const casSheet = resolve =>{
  require.ensure(['../components/questions/casSheet.vue'],() =>{
    resolve(require('../components/questions/casSheet.vue'));
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

const casTree = resolve =>{
  require.ensure(['../components/tree/casTree.vue'],()=>{
    resolve(require('../components/tree/casTree.vue'));
  });
}

const casLearning = resolve => {
  require.ensure(['../components/learning/casLearning.vue'],()=>{
    resolve(require('../components/learning/casLearning.vue'));
  })
}




import VueRouter from 'vue-router'

const routes = [
    {
      path: '/home', 
      component: casHome,
      beforeEnter: (to, from, next) => {
        // ...
          casHome()
            .then((response)=>{
              console.log("in route guard...",response);
              return next();
            })
      }
    },
    {path: '/map', component: casHome},
    {path: '/questions',
        name: 'questionView',
        components: {
        default: casSheet,
        treeMenu: casTree,
        aside: casLearning
      },
        props: {
          default : true,
          treeMenu: true,
          aside: true
          
        }
    },
    {path: '/admin', component: casAdmin},
    {path: '/login', component: casLogin},
    {path: '/register', component: casRegister}
]

const router = new VueRouter({
    routes
})

export {router}


// WEBPACK FOOTER //
// ./src/routes/index.js