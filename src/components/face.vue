<style>
  @media (min-width: 768px){
  .affix-content .container {
    width: 700px;
  }   

  html,body{
    background-color: #f8f8f8;
    height: 100%;
    overflow: hidden;
  }
    .affix-content .container .page-header{
    margin-top: 0;
  }
  .sidebar-nav{
        position:fixed; 
        width:100%;
  }
  .affix-sidebar{
    padding-right:0; 
    font-size:small;
    padding-left: 0;
  }  
  .affix-row, .affix-container, .affix-content{
    height: 100%;
    margin-left: 0;
    margin-right: 0;    
  } 
  .affix-content{
    background-color:white; 
  } 
  .sidebar-nav .navbar .navbar-collapse {
    padding: 0;
    max-height: none;
  }
  .sidebar-nav .navbar{
    border-radius:0; 
    margin-bottom:0; 
    border:0;
  }
  .sidebar-nav .navbar ul {
    float: none;
    display: block;
  }
  .sidebar-nav .navbar li {
    float: none;
    display: block;
  }
  .sidebar-nav .navbar li a {
    padding-top: 12px;
    padding-bottom: 12px;
  }  
}

@media (min-width: 769px){
  .affix-content .container {
    width: 600px;
  }
    .affix-content .container .page-header{
    margin-top: 0;
  }  
}

@media (min-width: 992px){
  .affix-content .container {
  width: 900px;
  }
    .affix-content .container .page-header{
    margin-top: 0;
  }
}

@media (min-width: 1220px){
  .affix-row{
    overflow: hidden;
  }

  .affix-content{
    overflow: auto;
  }

  .affix-content .container {
    width: 1000px;
  }

  .affix-content .container .page-header{
    margin-top: 0;
  }
  .affix-content{
    padding-right: 30px;
    padding-left: 30px;
  }  
  .affix-title{
    border-bottom: 1px solid #ecf0f1; 
    padding-bottom:10px;
  }
  .navbar-nav {
    margin: 0;
  }
  .navbar-collapse{
    padding: 0;
  }
  .sidebar-nav .navbar li a:hover {
    background-color: #428bca;
    color: white;
  }
  .sidebar-nav .navbar li a > .caret {
    margin-top: 8px;
  }
  .viewPort {
    padding-bottom: 25px;
  }
}

</style>
<script>
    export default {
        name: 'face',
        method : {
            openNav(){
                return this.nav = !this.nav
            }
        },
        data: function(){
            return {
                nav: true,
                authenticated : false
            }
        },
        mounted(){
          let request = new Request('/services/questions/get',{
            method : 'GET',
            mode: 'cors',
          });
          console.log("trying to get request");
          fetch(request)
            .then((response)=>{
              console.log("got response back");
              if(response.headers.get("content-type").indexOf("application/json") !== -1){
                this.authenticated = true; 
                return response.json()
              } else {
                console.log("Redirecting to login page...");
                return  this.$router.push({path: '/map"'}); 
              }
            })
            .then((response)=>{
              console.log("questions");
            })

        }
    }
</script>
<template>
<div class="row affix-row">
    <div>
            <div class="col-sm-3 col-md-2 affix-sidebar">
                <div class="sidebar-nav">
                    <div class="navbar navbar-default" role="navigation">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            </button>
                            <span class="visible-xs navbar-brand">Sidebar menu</span>
                        </div>
                    <div class="navbar-collapse collapse sidebar-navbar-collapse">
                    <ul class="nav navbar-nav" id="sidenav01">
                        <slot></slot>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </div>
        </div>
            <div class="col-sm-9 col-md-10 affix-content" style="overflow-y: scroll">
                <div class="container">

                        <div class="page-header viewPort" >
                            <h3><span class="glyphicon glyphicon-th-list"></span> NRL Prototyping</h3>
                             <router-view></router-view>
                        </div>
                       
                </div>
            </div>
        </div>    
    </div>


</template>