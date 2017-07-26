<template>
    <b-form-radio v-model="selected" :options="options" @change="notifyParent"></b-form-radio>
</template>

<script>
export default {
    data: function(){
        return {
            selected: null
        }
    },
    methods: {
        notifyParent(){
            this.$emit('radioSelected',this.selected)
        }
    },
    name: "clientRadio",
    props: ['options']
}
</script>

<style>
  
</style>
