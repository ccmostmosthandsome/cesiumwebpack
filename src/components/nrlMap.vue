<style>
</style>
<script>

    export default {
        name: 'nrlMap',
        methods: {
        },
        mounted(){
            require('cesium/Source/Widgets/widgets.css');
            require('cesium/Build/CesiumUnminified/Cesium');



            let Cesium = window.Cesium;
            let BuildModuleUrl = require('cesium/Source/Core/buildModuleUrl');
            //BuildModuleUrl.setBaseUrl('./');
            window.CESIUM_BASE_URL = './';
            var Viewer = require('cesium/Source/Widgets/Viewer/Viewer');
//45.9766° N, 7.6585° E..
//30° 47′ 56″ N, 31° 50′ 9″ E
            
            
var viewer = new Cesium.Viewer('cesiumContainer');
var layers = viewer.scene.imageryLayers;
var billboards = new Cesium.BillboardCollection();
var image = new Image();

viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(31.835833, 30.798889),
    billboard: {
        image: 'ramses.png'
    }
})

viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(32.383333, 30.333333),
     billboard: {
        image: 'mapPositCircle.png'
    }   
})

var polylines = new Cesium.PolylineCollection();

polylines.add({
    positions: Cesium.Cartesian3.fromDegreesArray([
        31.835833, 30.798889,
        32.383333, 30.333333
    ]),
    width: 2
})
viewer.scene.primitives.add(polylines);
var center = Cesium.Cartesian3.fromDegrees(31.835833, 30.798889);
viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, 501000.0));
// set lighting to true


        }
    }
</script>
<template>
    
    <div id="cesiumContainer" ></div>
</template>