<template>
    <label class="file-select">
        <div class="select-button">
            <span v-if="value">Selected File: {{value.name}}</span>
            <span v-else>Select File</span>
        </div>
        <input type="file" @change="handleFileChange" />
    </label>
</template>

<script>
export default {
    methods: {
        handleFileChange(e){
            this.$emit('input', e.target.files[0]);
        }
    },
    name: 'clientFileselect',
    props: {
        value: File
    }
}
</script>

<style>
.file-select>.select-button {
    padding: 1rem;

    color: white;
    background-color: #2EA169;

    border-radius: .3rem;

    text-align: center;
    font-weight: bold;
}


/* Don't forget to hide the original file input! */

.file-select>input[type="file"] {
    display: none;
}
</style>
