<template>
    <div class="container">
    
        <div class="jumbotron">
            <h1 class="display-3">Castello</h1>
            <p class="lead"> Mapping Your Life, Building your Defenses</p>
        </div>
    
    </div>
</template>

<script>
export default {
    name: 'casDisplay'
}
</script>

<style>
    .jumbotron {
       /* background: url('../../images/rocks.jpg'); */ 
       /* background: url('../../images/metroMap.jpg'); */
        background-color: rgb(55,56,61);
        margin-bottom: 20px;
        min-height: 50%;
        width: 100%;
        background-repeat: no-repeat;
        background-position: center;
        -webkit-background-size: cover;
        background-size: cover;
        color: white;
        text-shadow: #444 0 1px 1px;
    }
</style>
