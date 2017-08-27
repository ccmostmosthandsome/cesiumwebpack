<script>
    import mixAuth from '../../auth/mixAuth.js';
    export default {
        data: function(){
            return {
                loginModel: {
                    id: 'loginModel',
                    username: null,
                    password: null
                },
                loginSchema: {
                    fields: [
                        {
                            "model" : 'username',
                            "label" : 'User Name',
                            "type"  : 'input'
                        },
                        {
                            "model" : 'password',
                            "label" : 'Password',
                            "type"  : 'input',
                            "inputType" : 'password'
                        }
                    ]
                }
            }
        },
        methods: {
            login(){
                
                this.$store.dispatch("login",this.loginModel)
                        .then(()=>{
                            console.log("dingo dingo")
                           return this.$store.dispatch("fetchContractAnswers",this.account.sub)
 
                        })
                        .then((response)=>{
                            this.$router.push("/home");
                        })

            }
        },
        mixins: [mixAuth],
        name: 'casLogin'
        
    }
</script>
<template>
    <div class="login">
        <div class="panel panel-default">
            <div class="panel-body">
                <vue-form-generator :schema="loginSchema"  :model="loginModel"/>
            </div>
            <div class="panel-footer">
                <button class="btn btn-primary" @click="login">Login</button>
                <span style="float: right;">
                    New User ? <router-link to="/register">Create a new account</router-link>
                </span>
                
            </div>
        </div>
    </div>
</template>
<style>
    .login{
        padding: 1em;
    }
</style>
