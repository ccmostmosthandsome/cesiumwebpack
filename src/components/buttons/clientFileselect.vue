<template>
    <label class="file-select">
        <div class="select-button">
            <span v-if="value">Selected File: {{value.name}}</span>
            <span v-else>Select File</span>
        </div>
        <input type="file" v-on:change="handleFileChange" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
    </label>
</template>

<script>
import jszip from 'jszip';
import XLSX from 'xlsx';
export default {
    data: function () {
        return {
            reader: null,
            obj: {}
        }
    },
    methods: {
        to_json(workbook){
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            return result;
        },
        parseSheet(sheet, readCells) {
            console.log("inside of parsesheet, looking at sheet ",sheet)

            var range = XLSX.utils.decode_range(sheet['!ref']);
            var sheetData = [];

            if (readCells === true) {
                _.forEachRight(_.range(range.s.r, range.e.r + 1), function(row) {
                    var rowData = [];
                    _.forEachRight(_.range(range.s.c, range.e.c + 1), function(column) {
                        var cellIndex = XLSX.utils.encode_cell({
                            'c': column,
                            'r': row
                        });
                        var cell = sheet[cellIndex];
                        //console.log("dingo cell var parseSheet!!! ",cell)
                        rowData[column] = cell ? cell.v : undefined;
                    });
                    sheetData[row] = rowData;
                });
            }

            return {
                'data': sheetData,
                'name': sheet.name,
                'col_size': range.e.c + 1,
                'row_size': range.e.r + 1
            }
        },
        handleFileChange(e) {
            //this.value = e;
            console.log("Caught onchange event....", e);
            this.reader.readAsArrayBuffer(e.target.files[0]);
            this.reader.onload = function (e) {
                var data = e.target.result;
                var arr = String.fromCharCode.apply(null, new Uint8Array(data));
                console.log("XLSX?", XLSX, Object.keys(XLSX))
                var workbook = XLSX.read(btoa(arr), {
                    type: 'base64'
                });

                console.log("dingo");
                 console.log("dingo");
                  console.log("dingo");
                   console.log("dingo");
                    console.log("dingo",this);
                this.obj.sheets = this.parseWorkbook(workbook, true, true);
                console.log("obj =>", this.obj);
                //handler(obj);
            }.bind(this)
            //this.$emit('input', e.target.files[0]);
        },
        parseWorkbook(workbook, readCells, toJSON) {
            if (toJSON === true) {
                return this.to_json(workbook);
            }

            var sheets = {};
            var newWorkBook = {}

            // var sheet = workbook.Sheets.Sheet1
            //  sheets[Sheet1] = XLSXReader.utils.parseSheet(sheet, readCells);
            //   console.log("****Sheets*****",sheets)

            //   console.log("*****Sheets Object*****",sheets)   

            _.forEachRight(workbook.SheetNames, function (sheetName) {


                var sheet = workbook.Sheets["Sheet1"];
                console.log("Sheet !!1", sheet)
                sheets[sheetName] = this.parseSheet(sheet, readCells);
            });


            return sheets;
        }
    },
    mounted() {
        console.log("creating new file reader");
        this.reader = new FileReader();
        console.log("Created file reader");
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
