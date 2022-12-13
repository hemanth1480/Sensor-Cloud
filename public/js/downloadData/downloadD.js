const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var archiver = require('archiver');
var fs = require('fs');
const {
    resolve
} = require('path');

var downloadData = (uno, type) => {

    var xval = uno[0].para1;
    var yval = uno[0].para2;
    var zval = uno[0].para3;
    var hval = uno[0].para4;
    var len = [];
    for (var c = 1; c <= xval.length; c++) {
        len.push(c);
    }

    const csvWriter = createCsvWriter({
        path: "./download-data/" + uno[0]._id + "/" + uno[0].title + ".csv",
        header: [{
                id: 'number',
                title: 'S.No'
            },
            {
                id: 'Timestamp',
                title: 'Timestamp'
            },
            {
                id: 'Date',
                title: 'Date'
            },
            {
                id: 'time',
                title: "time"
            },
            {
                id: 'xValue',
                title: uno[0].xLabel
            },
            {
                id: 'yValue',
                title: uno[0].yLabel
            },
            {
                id: 'zValue',
                title: uno[0].zLabel
            },
            {
                id: 'hValue',
                title: uno[0].hLabel
            }
        ]
    });
    const records = [];
    var dates = [];
    for (let l = 0; l < xval.length; l++) {
        dates.push(uno[0].timeStamp[l].split("T")[0]);
        var sub = {
            number: len[l],
            xValue: xval[l],
            yValue: yval[l],
            zValue: zval[l],
            hValue: hval[l],
            Date: uno[0].timeStamp[l].split("T")[0],
            time: uno[0].timeStamp[l].split("T")[1],
            Timestamp: uno[0].timeStamp[l]
        }
        records.push(sub);
    }
    var uniqDates = [...new Set(dates)];
    var newx = [];
    var newy = [];
    var newz = [];
    var newh = [];
    var inputLabels = [];
    inputLabels.push({
        id: 'number',
        title: 'S.No'
    }, {
        id: 'Date',
        title: 'Date'
    }, {
        id: 'xMin',
        title: uno[0].xLabel + "Min"
    }, {
        id: 'xMax',
        title: uno[0].xLabel + "Max"
    }, {
        id: 'xAvg',
        title: uno[0].xLabel + "Avg"
    });
    if (!(uno[0].para2.length <= 1)) {
        inputLabels.push({
            id: 'yMin',
            title: uno[0].yLabel + "Min"
        }, {
            id: 'yMax',
            title: uno[0].yLabel + "Max"
        }, {
            id: 'yAvg',
            title: uno[0].yLabel + "Avg"
        })
    }
    if (!(uno[0].para3.length <= 1)) {
        inputLabels.push({
            id: 'zMin',
            title: uno[0].zLabel + "Min"
        }, {
            id: 'zMax',
            title: uno[0].zLabel + "Max"
        }, {
            id: 'zAvg',
            title: uno[0].zLabel + "Avg"
        })
    }
    if (!(uno[0].para4.length <= 1)) {
        inputLabels.push({
            id: 'hMin',
            title: uno[0].hLabel + "Min"
        }, {
            id: 'hMax',
            title: uno[0].hLabel + "Max"
        }, {
            id: 'hAvg',
            title: uno[0].hLabel + "Avg"
        })
    }
    const csvWriter1 = createCsvWriter({
        path: "./download-data/" + uno[0]._id + "/" + "dateSeries-" + uno[0].title + ".csv",
        header: inputLabels
    });
    var newData = [];
    for (let h = 0; h < uniqDates.length; h++) {
        for (let s = 0; s < xval.length; s++) {
            if (uniqDates[h] == uno[0].timeStamp[s].split("T")[0]) {
                newx.push(uno[0].para1[s]);
                newy.push(uno[0].para2[s]);
                newz.push(uno[0].para3[s]);
                newh.push(uno[0].para4[s]);
            }
        }
        var resultx = newx.filter(element => {
            return element !== undefined;
        });
        var resulty = newy.filter(element => {
            return element !== undefined;
        });
        var resultz = newz.filter(element => {
            return element !== undefined;
        });
        var resulth = newh.filter(element => {
            return element !== undefined;
        });
        var nw = {
            number: h,
            Date: uniqDates[h],
            xMin: Math.min(...resultx),
            xMax: Math.max(...resultx),
            xAvg: (Math.max(...resultx) + Math.min(...resultx)) / 2,
            yMin: Math.min(...resulty),
            yMax: Math.max(...resulty),
            yAvg: (Math.max(...resulty) + Math.min(...resulty)) / 2,
            zMin: Math.min(...resultz),
            zMax: Math.max(...resultz),
            zAvg: (Math.max(...resultz) + Math.min(...resultz)) / 2,
            hMin: Math.min(...resulth),
            hMax: Math.max(...resulth),
            hAvg: (Math.max(...resulth) + Math.min(...resulth)) / 2
        }
        newData.push(nw);
        newx.length = 0;
        newy.length = 0;
        newz.length = 0;
        newh.length = 0;
        resultx.length = 0;
        resulty.length = 0;
        resultz.length = 0;
        resulth.length = 0;
    }
    csvWriter.writeRecords(records)
        .then(() => {
            csvWriter1.writeRecords(newData)
                .then(() => {
                    if (type == "download") {
                        var output = fs.createWriteStream('./download-data/zipFiles/' + uno[0]._id + '/' + uno[0].title + '.zip');
                        var archive = archiver('zip');
                        output.on('close', function () {
                            console.log(archive.pointer() + ' total bytes');
                            console.log('archiver has been finalized and the output file descriptor has closed.');
                        });
                        archive.on('error', function (err) {
                            throw err;
                        });
                        archive.pipe(output);
                        archive.directory("./download-data/" + uno[0]._id, false);
                        archive.finalize();
                    }
                });
        });
    return "done"
}


module.exports = downloadData;