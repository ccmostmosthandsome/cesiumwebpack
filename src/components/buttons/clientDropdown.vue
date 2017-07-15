<script>
import EventBus from '../../eventbus/index'
export default {
    props: ['options', 'isSelected'],

    data: function () {
        return {
            selected: null
        }
    },
    store: ['selection'],
    mounted(){
      console.log("In dropdown vue =>",this.options)  
       console.log("In dropdown vue =>",this.options)  
        console.log("In dropdown vue =>",this.options)  
         console.log("In dropdown vue =>",this.options)  
    },
    methods: {
        notify(selected, event) {
            if (event) event.preventDefault();


            //Declaring let or const was converting the this context to the window object. 
            var selectedListItem = this.options.list.filter(function (val) {
                return val.id === selected.id
            }.bind(this));
            selectedListItem = selectedListItem[0];
            selectedListItem.selectedId = this.isSelected;
            selectedListItem.listId = this.options.id;
            EventBus.$emit('dropdownSelected', selectedListItem)
        }
    },
    name: 'clientDropdown'
}
</script>

<style>
    .dropdownCharacters {
        font-size: small;
    }
</style>

<template>
    <b-dropdown text="..."  class="m-md-2">
        <b-dropdown-header  >This is a heading</b-dropdown-header>
        <b-dropdown-item  v-for="option in options.list" v-bind:value="option.id" v-bind:key="option.id" @click="notify(option,$event)">{{option.text}}</b-dropdown-item>
    </b-dropdown>
</template>
