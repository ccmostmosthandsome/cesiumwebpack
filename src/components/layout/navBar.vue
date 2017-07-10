<template>
    <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Castello</a>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
            <ul class="navbar-nav navbar-right">
                <li> 
                    <div v-if="isLoggedIn">
                        <!-- <button @click="testAccount">TestAccount</button> -->
                        {{account.sub}}
                        <button class="btn btn-default" @click="logout"><i class="glyphicon glyphicon-user" aria-hidden="true"></i> &nbsp; Log out {{account.sub}}</button>  
                    </div> 
                    <div v-if="!isLoggedIn">
                            <router-link to="/login">
                              <i class="glyphicon glyphicon-user"></i> Log In
                            </router-link>  
                            

                        
                    </div>
                    
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
    import mixAuth from '../../auth/mixAuth';
    import jwtDecode from 'jwt-decode';
    export default {
        name: 'navBar',
        methods: {
            logout(){
                console.log("logging out...");
                 this.userAccount = {}; 
                 this.$store.dispatch('logout');
            },
            testAccount(){
               let account =  jwtDecode(localStorage.getItem('token'));
               console.log("dingo account =",account);
            }
        },
        computed: {

        },
        mixins: [mixAuth]
        
    }
</script>
<style>
    .navbar { margin-bottom: 0 !important }
</style>
