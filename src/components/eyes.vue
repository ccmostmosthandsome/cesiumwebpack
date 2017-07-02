<style>
</style>
<script>
    import VueRouter from 'vue-router'
    import face from './face.vue'
    export default {
        name: 'eyes',
        components: {face},
        data: function(){
            return {
                mockColumns : {
                    "id" : {
                        "display" : "ID",
                        "sort" : false,
                        "order" : 1
                    },
                    "name" : {
                        "display" : "Name",
                        "sort" : false,
                        "order" : 2
                    },
                    "location" : {
                        "display" : "location",
                         "sort" : false,
                        "order" : 3
                    },
                    "thumbPrint" : {
                        "display" : "Thumb Print",
                         "sort" : false,
                        "order" : 4
                    }
                },

                mockRows: [
                    {id: "1", name: "GFord", location: "Walmart", thumbprint: "exs0"},
                    {id: "2", name: "TYuu", location: "KMart", thumbprint: "ffs0"},
                    {id: "3", name: "MKetzov", location: "LiquorStore", thumbprint: "ffs0"},
                ]
            }
        },
        mounted(){
            this.$store.dispatch('changeColumns',{name: this.mockColumns});
            this.$store.dispatch('changeRows',{name: this.mockRows});
        }
    }
</script>
<template>
    <div>
        <face>
            <li>
                <router-link to="/home">
                <span class="glyphicon glyphicon-home"></span>  Home
                </router-link>
            </li>
            <li>
                <router-link to="/map">
                    <span class="glyphicon glyphicon-road"></span> Map Cesium <span class="badge pull-right">Cesium</span>
                </router-link>  
            </li> 
            <li>
                <router-link to="/form">
                    <span class="glyphicon glyphicon-list-alt"></span> Analysis Form <span class="badge pull-right">Cesium</span>
                </router-link>  
            </li> 
            <li>
                <router-link to="/questions">
                    <span class="glyphicon glyphicon-list-alt"></span> Questions <span class="badge pull-right">Cesium</span>
                </router-link>  
            </li>
           <li>
                <router-link to="/admin">
                    <span class="glyphicon glyphicon-list-alt"></span> Admin Too. <span class="badge pull-right"></span>
                </router-link>  
            </li>           
        </face>    
    </div>

</template>