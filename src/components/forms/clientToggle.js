define(["vue"], function(Vue) {
    'use strict'
// body
    const clientToggle = Vue.component('clientToggle',{
        props: ['status'],
        methods: {
            activate(){
                this.flipStatus = !this.flipStatus;
                this.$emit('flip')
            }
        },
        data: function(){
            return {
                flipStatus : this.status
            }
        },
        template: `
            <span style="toggle">
                <small>
                
                    <span v-show="!flipStatus">
                        <span class="listItemPointer glyphicon glyphicon-plus" v-on:click="activate" ></span>                    
                    </span>
                    <span v-show="flipStatus">
                        <span class="listItemPointer glyphicon glyphicon-minus" v-on:click="activate" ></span>                       
                    </span> 
                                
                </small> 
            </span>
        `
    })

    return clientToggle
});