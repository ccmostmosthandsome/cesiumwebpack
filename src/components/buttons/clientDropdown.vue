<script>
import {EventBus} from '../../eventbus/index'
console.log("dingo event bus =>",EventBus);
export default {
    props: ['options', 'isSelected', 'focusItem'],

    data: function () {
        return {
            selected: null
        }
    },
    methods: {
        notify(selected, event) {
            console.log("running notify!!!!");
            console.log("store keys",this.$store);
            if (event) event.preventDefault();
            console.log("clicking on dropdown",selected,this.options);
            var selectObject = _.assign(selected,{id: this.options.id, item: this.focusItem.text});
            EventBus.$emit('dropdownPayload', selectObject);


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
    <b-dropdown text=""  class="m-md-2 dropdownLayout" >
        <b-dropdown-item  v-for="option in options.list" v-bind:value="option.id" v-bind:key="option.id" @click="notify(option,$event)">{{option.text}}</b-dropdown-item>
    </b-dropdown>
</template> 
