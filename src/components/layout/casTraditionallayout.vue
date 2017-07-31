<style>
@media (min-width: 768px) {
  .affix-content .container {
    width: 700px;
    height: 100%;
  }

  html,
  body {
    background-color: #f8f8f8;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
  }


  .affix-content .container .page-header {
    margin-top: 0;
  }
  .sidebar-nav,
  #sidebarcontainer {
    position: fixed;
    width: 100%;
    height: 100%
  }
  .affix-sidebar {
    padding-right: 0;
    font-size: small;
    padding-left: 0;
  }
  .affix-row,
  .affix-container,
  .affix-content {
    height: 100%;
    margin-left: 0;
    margin-right: 0;
  }
  .affix-content {
    background-color: white;
  }
  .sidebar-nav .navbar .navbar-collapse {
    padding: 0;
    max-height: none;
    height: 100%;
  }
  .sidebar-nav .navbar {
    border-radius: 0;
    margin-bottom: 0;
    border: 0;
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

@media (min-width: 769px) {
  .affix-content .container {
    width: 600px;
  }
  .affix-content .container .page-header {
    margin-top: 0;
  }
}

@media (min-width: 992px) {
  .affix-content .container {
    width: 900px;
  }
  .affix-content .container .page-header {
    margin-top: 0;
  }
}

@media (min-width: 1220px) {
  .affix-row {
    overflow: hidden;
  }

  .affix-content {
    overflow: auto;
  }

  .affix-content .container {
    width: 1000px;
  }

  .affix-content .container .page-header {
    margin-top: 0;
  }
  .affix-content {
    padding-right: 30px;
    padding-left: 30px;
  }
  .affix-title {
    border-bottom: 1px solid #ecf0f1;
    padding-bottom: 10px;
  }
  .navbar-nav {
    margin: 0;
  }
  .navbar-collapse {
    padding: 0;
  }
  .sidebar-nav .navbar li a:hover {
    background-color: #428bca;
    color: white;
  }
  .sidebar-nav .navbar li a>.caret {
    margin-top: 8px;
  }
  .viewPort {
    padding-bottom: 25px;
  }
}
</style>
<script>
export default {
  computed: {
      contentCol(){
        if(this.asideViews.indexOf(this.$route.name) > -1){
          return 'col-sm-9 col-md-7 affix-content'
        } else {
          return 'col-sm-9 col-md-10 affix-content'
        }
      }
  },
  data: function () {
    return {
      nav: true,
      authenticated: false
    }
  },
  name: 'casTraditionallayout',
  method: {
    openNav() {
      return this.nav = !this.nav
    }
  },
  mounted() {


  },
  props: {
    'asideViews': Array
  }
}
</script>
<template>
  <div class="row affix-row">
   
      <div class="col-sm-3 col-md-2 affix-sidebar">
        <div class="sidebar-nav">
          <div id="sidebarcontainer" class="navbar navbar-default" role="navigation">
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
  
              <slot name="sidebar"></slot>
  
            </div>
            <!--/.nav-collapse -->
          </div>
        </div>
      </div>
      <div :class="contentCol" style="overflow-y: scroll">
        
          <div class="page-header viewPort">
  
            <slot name="content"></slot>
  
          </div>
  
        
      </div>
      <div class="col-sm-9 col-md-3 affix-content" style="overflow-y: scroll" v-if="asideViews.indexOf($route.name) > -1">
        <div class="container">
  
          <div class="page-header viewPort">
            <slot name="aside">
  
            </slot>
  
          </div>
  
        </div>
      </div>
    
  </div>
</template>


// WEBPACK FOOTER //
// casTraditionalayout.vue?7d68e2c0