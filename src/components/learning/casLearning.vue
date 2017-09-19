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
<template>
    <div>
        <div 
            
            v-for="hint in hints" v-bind:key="hint.questionId">
            
            <span v-html="hint.questionhint"></span>
            
            <hr class="styleGrade"/>
        </div>
    
    </div>
</template>
<script>
export default {
    name: 'casLearning',
    props: ['course'],
    computed: {
        hints() {
            console.log("dingo")
            console.log("dingo")
            console.log("dingo")
            console.log("dingo")
            console.log("dingo")
            return this.$store.getters.getCourseHints(this.course);
        }
    }
}
</script>
