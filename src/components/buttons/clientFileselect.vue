<template>
    <label class="file-select" >
        <div class="select-button">
            <span v-if="value">Selected File: {{value.name}}</span>
            <span v-else>Select File</span>
        </div>
        <input type="file" v-on:change="handleFileChange" accept="aapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
    </label>
</template>

<script>
import mixXls from '../../mixins/mixXls'
import {EventBus} from '../../eventbus/index'
export default {
    data: function () {
        return {
            reader: null,
            obj: {}
        }
    },
    methods: {
        handleFileChange(e) {
            //this.value = e;
            console.log("Eventbus???",EventBus);
            
            if (this.type === 'excel') {
               
                
                this.reader = new FileReader();
                console.log("Caught onchange event....", e);
                this.reader.readAsArrayBuffer(e.target.files[0]);
                
                this.reader.onload = function (e) {
                    
                    var workbook = this.encodeWorkbook(e.target.result)


                    this.obj.sheets = this.parseWorkbook(workbook, true, true);
                    console.log("obj and sending =>", this.obj);
                    this.$emit('input', this.obj);
                    //handler(obj);
                }.bind(this)
            }

            
        },

    },
    mixins: [mixXls],
    name: 'clientFileselect',
    props: {
        value: File,
        type: String,
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
