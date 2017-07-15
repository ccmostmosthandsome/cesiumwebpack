/* ES6 Module for VUEX. Appears that mixins are exclusive to components and arenot something normally used via a store */
function  getAuthHeader(){
            return {
                'X-Auth-Token' : localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
}

export {getAuthHeader}