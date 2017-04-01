<style>
    
</style>
<script>
    export default {
        name: 'nrlGrid',
        props: ['type'],
        data: function(){
            return {
                columns: [],
                rows: []
            }
        },
        method : {
            
        },
        mounted(){
            var columnState =  this.$store.state.tableColumns.name;
            let self = this;
            
            for(var i in columnState){
                var columnObject = { 
                    name : i,
                    displayName: columnState[i].display
                }
                

                this.columns.push(columnObject)
            }
            if(this.type === "manySelection"){
                this.columns.splice(0, 0, {name: "checked", displayName: null})
            }
            
            this.rows = this.$store.state.tableRows.name.map((item, ix)=>{
                            if(this.type === "manySelection"){
                                
                                item.checked = false;
                            } else {
                                item = item; 
                            }
                            
                            return item;
                        })
            console.log("dingo");
           
        }
    }
</script>
<template>
    <div>
    
        <table class="table table-hover">
            <thead>
                <tr>
                    <th v-for="header in columns">{{header.displayName}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows">
                    <td v-for="type,key in row">
                        {{type}}
                    </td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</template>