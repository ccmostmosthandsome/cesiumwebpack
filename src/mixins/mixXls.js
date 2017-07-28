import XLSX from 'xlsx';
import _ from 'lodash';
export default {
    data: function () {
        return {
            files: null,
            workbook: null
        }
    },
    methods: {
        handleXlsx(file ,showPreview) {
            
            
            console.log("file keys",file);
            return this.intializeFromFile(file, showPreview, false, function (data) {
                console.log("dingo");
                console.log("dingo");
                console.log("dingo");
                console.log("dingo");
                return data;

            })



        },
        intializeFromFile(obj, file, readCells, toJSON, handler) {
            var reader = new FileReader();

            reader.onload = function(e) {
                var data = e.target.result;
               var arr = String.fromCharCode.apply(null, new Uint8Array(data));
                var workbook = XLSX.read(btoa(arr), {
                    type: 'base64'
                });
               
               
                obj.sheets = XLSXReader.utils.parseWorkbook(workbook, readCells, toJSON);
            
                handler(obj);
            }
            
           
            reader.readAsArrayBuffer(file);
        },
        parseWorkbook(workbook, readCells, toJSON) {
            if (toJSON === true) {
                return XLSXReader.utils.to_json(workbook);
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
                sheets[sheetName] = XLSXReader.utils.parseSheet(sheet, readCells);
            });


            return sheets;
        },
        parseSheet(sheet, readCells) {
            var range = XLSX.utils.decode_range(sheet['!ref']);
            var sheetData = [];

            if (readCells === true) {
                _.forEachRight(_.range(range.s.r, range.e.r + 1), function (row) {
                    var rowData = [];
                    _.forEachRight(_.range(range.s.c, range.e.c + 1), function (column) {
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
        to_json(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function (sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            return result;
        }
    }
}