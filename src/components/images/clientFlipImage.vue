<template>
    <div>
        <figure class="imghvr-fold-up">
            <span v-if="disabled">
                 

                <img
                    
                    :src="loadImage(image.src + '.jpg')" 
                    class="img-responsive imageStyle" 
                    style="opacity: 0.70;">


            </span>
            <span v-else>
                <img :src="loadImage(image.src + '.jpg')" class="img-responsive">

            </span>
            <figcaption style="overflow-y: scroll;">
                <slot></slot>
            </figcaption>
        </figure>
    </div>
</template>

<script>
var images = require.context('../../images/', false, /.jpg$/);
export default {
    methods: {
        loadImage(file) {

            return images('./' + file)
        },
    },
    name: "clientFigure",
    props: {
        image: {
            validator: function(obj) {
                return (obj.src)
            }
        },
        disabled: Boolean
    }

}
</script>

<style>
    imageStyle{
        opacity: 0.39; 
    }
/*
   [class*=" imghvr-"] figcaption,
[class^="imghvr-"] figcaption {
    background-color: #5FCF80;
}

[class*=" imghvr-"],
[class^="imghvr-"] {
    background-color: #5FCF80;
    color: #fff;
}
 */
</style>
