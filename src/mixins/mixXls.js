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
        encodeWorkbook(bits) {
            var data = bits;
            var arr = String.fromCharCode.apply(null, new Uint8Array(data));
            return XLSX.read(btoa(arr), {
                type: 'base64'
            });


        },
        intializeFromFile(e) {
            var data = e.target.result;
            var arr = String.fromCharCode.apply(null, new Uint8Array(data));
            console.log("XLSX?", XLSX, Object.keys(XLSX))
            var workbook = XLSX.read(btoa(arr), {
                type: 'base64'
            });

            console.log("dingo");
            console.log("dingo");
            console.log("dingo");
            console.log("dingo", e);
            console.log("dingo", workbook);
            this.obj.sheets = this.parseWorkbook(workbook, true, true);
            console.log("obj =>", this.obj);
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
            console.log("WTF workbook", workbook);
            _.forEachRight(workbook.SheetNames, function (sheetName) {


                var sheet = workbook.Sheets["Sheet1"];
                console.log("Sheet !!1", sheet)
                sheets[sheetName] = this.parseSheet(sheet, readCells);
            });


            return sheets;
        },
        parseSheet(sheet, readCells) {
            console.log("inside of parsesheet, looking at sheet ", sheet)

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