<style>

</style>
<script>
    import nrlGrid from './nrlGrid.vue'
    export default {
        name : "nrlForm",
        components: {nrlGrid}
    }
</script>
<template>
    <div>
        <h4>Analytis Form</h4>
        <nrl-grid type="manySelection"></nrl-grid>
    </div>

</template>