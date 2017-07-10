<script>
    import mixAuth from '../../auth/mixAuth.js';
    export default {
        data: function(){
            return {
                loginModel: {
                    'id': 'loginModel',
                    'username': null,
                    'password': null,
                    'authorities': "ROLE_ADMIN, ROLE_EMPLOYEE"
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
                            "type"  : 'input'
                        }
                    ]
                }
            }
        },
        methods: {
            register(){
                console.log(JSON.stringify(this.loginModel));
                 this.$store.dispatch("register",this.loginModel)
                        .then(()=>{
                            console.log("dingo dingo")
                            this.$router.push("/"); 
                        });
                
            }
        },
        mixins: [mixAuth],
        name: 'casLogin'
        
    }
</script>
<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-body">
                <vue-form-generator :schema="loginSchema"  :model="loginModel"/>
            </div>
            <div class="panel-footer">
                <button class="btn btn-primary" @click="register">Create</button>
            </div>
        </div>
    </div>
</template>
<style>
</style>
