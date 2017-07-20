<template>
  <b-form-checkbox v-model="toggleState" value="accepted" unchecked-value="not_accepted" @change="showCheck"> 
     
      <slot></slot> 
  </b-form-checkbox>
</template>

<script>
export default {
    name: 'clientCheckbox',
    methods: {
        showCheck(){
            let returnObject = Object.assign(this.item,{});
            returnObject.toggleState = this.toggleState;
            this.$emit('checked',returnObject);
        }
    },
    props: ['item'],
    data: function(){
        return {
            toggleState: 'Show leaning' + Math.floor(Math.random() * 90000)  + '_' +   this.item.id
        }
    }
}
</script>

<style>
</style>
