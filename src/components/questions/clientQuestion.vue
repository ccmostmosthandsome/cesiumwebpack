<style>
    hr.styleGrade{
        border: 0; 
        height: 1px; 
        background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
        background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
        background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
        background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0); 
    }

    
</style>
<script>
    export default {
        name: 'clientQuestions',
        data: function(){
            return {
                num: this.number
            }
        },
        props: ['number']
    }
</script>
<template>
    <div>
        <h4>Question {{num}}</h4>
        <hr class="styleGrade"/>
        <slot name="symbols">
        </slot>
        <slot name="form"></slot>
    </div>
</template>