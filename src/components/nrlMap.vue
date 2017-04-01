<style>
</style>
<script>

    export default {
        name: 'nrlMap',
        mounted(){
            require('cesium/Source/Widgets/widgets.css');
            var BuildModuleUrl = require('cesium/Source/Core/buildModuleUrl');
            BuildModuleUrl.setBaseUrl('./');

            var Viewer = require('cesium/Source/Widgets/Viewer/Viewer');

            var viewer = new Viewer('cesiumContainer');          
        }
    }
</script>
<template>
    
    <div id="cesiumContainer" ></div>
</template>