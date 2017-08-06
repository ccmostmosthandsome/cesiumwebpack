<template>
    <div v-bind:class="promptStyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    computed: {
        promptStyle() {
            if (!this.success) {
                return 'prompt prompt--state-error'
            } else {
                return 'prompt prompt--state-success'
            }
        }
    },
    name: 'clientFeedback',
    props: {
        success: Boolean
    }
}
</script>

<style>
.prompt {
    font-size: 14px;
    font-weight: bold;
    height: 15px;
    padding: 20px 30px 20px 30px;
    letter-spacing: 1px;
    -moz-border-radius: 0px 0px 3px 3px;
    -webkit-border-radius: 0px 0px 3px 3px;
    border-radius: 0px 0px 3px 3px;
}

.prompt--state-error {
    background-color: #d03e3e;
    color: #fff;
    height: 75px;
}

.prompt--state-success {
    background-color: #41B883;
    padding-bottom: 35px;
    text-align: center;
    color: #fff;
}


.button {
    display: inline-block;
    border-radius: 3px;
    padding: 7px 12px;
    border: 1px solid #D5D5D5;
    background-image: linear-gradient(#EEE, #DDD);
    font: 700 13px/18px Helvetica, arial;
}

.button--state-success {
    color: #FFF;
    background: #569E3D linear-gradient(#79D858, #569E3D) repeat-x;
    border-color: #4A993E;
}

.button--state-danger {
    color: #900;
}
</style>
