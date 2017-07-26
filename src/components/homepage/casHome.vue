<style>

</style>
<script>
import casContract from './casContract.vue';
export default {
    components: {casContract},
    name: 'nrlHome'
}
</script>
<template>
    <div>
        <div class="jumbotron">
            <h1 class="display-3">Castello</h1>
            <p class="lead"> Mapping Your Life, Building your Defenses</p>
        </div>
        <div>
            <cas-contract></cas-contract>
        </div>
    </div>
</template>