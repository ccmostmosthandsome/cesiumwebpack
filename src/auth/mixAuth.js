import jwtDecode from 'jwt-decode';


export default  {

    data: function(){
        return {
            tokenAuth: {},
            notComputedLabeld: {"unchecked" : 'Logout', "checked" : 'Login'}
        }
    },
    computed: {
        isLoggedIn(){
            
            return this.$store.getters.isLoggedIn;
        },
        account: {
            cache: false,
            get(){
                if(this.$store.getters.isLoggedIn){
                    console.log("getting jwt token account:?????", jwtDecode(localStorage.getItem('token')))
                    return jwtDecode(localStorage.getItem('token'));
                } else {
                    return {
                        sub: 'guest'
                    }
                }
                
            }
        },
        labels: {
            cache: false,
            get(){
                if(this.$store.getters.isLoggedIn){
                   return {"unchecked" : 'Logout', "checked" : 'Login'}
                } else {
                    return {"unchecked" : 'Login', "checked" : 'Logout'}
                    
                }              
            },
            set(value){
                return value; 
            }
        },
        isAdmin: {
            cache: false,
            get(){
                
                if(this.$store.getters.isLoggedIn){
                     return jwtDecode(localStorage.getItem("token")).auth.some((role) => role.authority === 'ROLE_ADMIN')
                } else {
                   return false;
                }
                
                
                    
            }
        }
    },
    methods: {
        getAuthHeader(){
            return {
                'X-Auth-Token' : localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
    }

}