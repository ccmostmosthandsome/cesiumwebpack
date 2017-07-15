<style>

</style>
<script>

import { mapGetters } from 'vuex';
export default {
    name: 'clientGrid',
    props: ['type','gridid'],
    computed: {
        columns() {
            return this.$store.getters.getColState(this.gridid)

        },
        rows() {

            return this.$store.getters.getRowState(this.gridid)
        }
        
    },
    methods: {
        talkToParent(row){
            console.log("clicking row...",row);
            this.$emit('rowSelected',row);
        }
    }
}
</script>
<template>
    <div>
        
        <table class="table table-hover">
            <thead>
                <tr>
                    <th v-for="(header, index ) in columns" v-bind:key="index">{{header.displayName}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows" v-bind:key="index" @click="talkToParent(row)">
                    
                    <td v-for="(type,ky) in row" v-bind:key="ky" >
                        {{type}}
                    </td>
    
                </tr>
            </tbody>
        </table>
    </div>
</template>