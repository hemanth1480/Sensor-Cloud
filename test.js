// require('crypto').randomBytes(16, function(err, buffer) {
//     var token = buffer.toString('hex');
//     console.log(token);
//   });

// var datetime = new Date();
// console.log(datetime);

// let now = new Date()
// now = now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
// console.log(now);

// const UTCTime = new Date() 
// const time = UTCTime.toTimeString()

// console.log(time);

// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    
// for( var i = 0; i < arr.length; i++){ 

//     if ( arr[i] === 5) { 

//         arr.splice(i, 1); 
//     }

// }

// console.log(arr)

// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//     path: 'data.csv',
//     header: [
//         {id: 'name', title: 'NAME'},
//         {id: 'lang', title: 'LANGUAGE'}
//     ]
// });
 
// const records = [
//     {name: 'Bob',  lang: 'French, English'},
//     {name: 'Mary', lang: 'English'}
// ];
 
// csvWriter.writeRecords(records)       // returns a promise
//     .then(() => {
//         console.log('...Done');
//     });
  
// var h1 = 10;

// let s1 = 0;
// let s2=1,s3;

// for(var i=1; i<=h1;i++) {
//     console.log(s1);
//     s3 = s1+s2;
//     s1 =s2;
//     s2 = s3;
// }

// var fs = require('fs');
 
// // writeFile function with filename, content and callback function
// // fs.writeFile(__dirname + '/views/newfile.txt', 'Learn Node FS module', function (err) {
// //   if (err) throw err;
// //   console.log('File is created successfully.');
// // });

// var fd = fs.openSync(__dirname + "/download-data/jk.csv", 'w')

// const stringify = require('csv-stringify');
// var fs = require('fs');

// let data = [];
// let columns = {
//   id: 'id',
//   name: 'Name'
// };

// for (var i = 0; i < 10; i++) {
//   data.push([i, 'Name ' + i]);
// }

// stringify(data, { header: true, columns: columns }, (err, output) => {
//   if (err) throw err;
//   fs.writeFile('my.csv', output, (err) => {
//     if (err) throw err;
//     console.log('my.csv saved.');
//   });
// });

// let h = ([]);
// let p =[0];
// h.push(p);

// console.log(h);

// function onke(k) {
//     console.log(k);
// }

// function jk(q) {
//     onke(q);
// }

// jk(90);

// var hh = {
//     a:"kl",
//     b:"op"
// }

// console.log(hh.a);

// console.log(hh["a"]);
// const j = ["op","p","i"];

// const h = j.slice(0,1)[0];

// var k =[];

// k.push(h[0])

// console.log(h);

// important code

// var xValues = [ < %= xdata % > ];
                    // var yValues = [ < %= ydata % > ];

                    // if (yValues[0] == undefined) {
                    //     newY = [];
                    //     for (var l = 0; l < xValues.length; l++) {
                    //         newY.push(l);
                    //     }
                    //     xValues = newY
                    //     yValues = [ < %= xdata % > ]
                    // }

                    // var data = {
                    //     labels: xValues,
                    //     datasets: [{
                    //         data: yValues,
                    //         label: "<%=dat[i].yLabel%>",
                    //         borderColor: "black",
                    //         fill: false
                    //     }]
                    // }

                    // var options = {
                    //     legend: {
                    //         display: false
                    //     },
                    //     title: {
                    //         display: true,
                    //         text: '<%=dat[i].title%>'
                    //     },
                    //     scales: {
                    //         yAxes: [{
                    //             scaleLabel: {
                    //                 display: true,
                    //                 labelString: '<%=dat[i].yLabel%>'
                    //             }
                    //         }],
                    //         xAxes: [{
                    //             scaleLabel: {
                    //                 display: true,
                    //                 labelString: '<%=dat[i].xLabel%>'
                    //             }
                    //         }]
                    //     }
                    // }

                    // const configdata < %= i % > = {
                    //     type: "line",
                    //     data,
                    //     options
                    // }

                    // const configdatap < %= i % > = {
                    //     type: "pie",
                    //     data: {
                    //         labels: xValues,
                    //         datasets: [{
                    //             data: yValues,
                    //             label: "<%=dat[i].yLabel%>",
                    //             backgroundColor: ["#2596be", "#be4d25", "#49be25", "#145369", "#041014",
                    //                 "#bea925", "#000000", "#134b5f", "42032C", "E6D2AA", "7FB77E",
                    //                 "319DA0", "C21010", "F675A8"
                    //             ],
                    //             fill: false
                    //         }]
                    //     },
                    //     options
                    // }
                    // const configdatab < %= i % > = {
                    //     type: "bar",
                    //     data: {
                    //         labels: xValues,
                    //         datasets: [{
                    //             data: yValues,
                    //             label: "<%=dat[i].yLabel%>",
                    //             backgroundColor: ["#2596be", "#49be25", "#134b5f", "#be4d25", "#145369",
                    //                 "#041014", "#bea925", "#000000", "42032C", "E6D2AA", "7FB77E",
                    //                 "319DA0", "C21010", "F675A8"
                    //             ],
                    //             fill: false
                    //         }]
                    //     },
                    //     options
                    // }

                    // let myChart < %= i % > = new Chart(
                    //     document.getElementsByClassName("chart")[ < %= i % > ],
                    //     configdata < %= i % >
                    // );

                    // function grptyp < %= i % > (type) {
                    //     myChart < %= i % > .destroy();
                    //     if (type === "bar") {
                    //         myChart < %= i % > = new Chart(
                    //             document.getElementsByClassName("chart")[ < %= i % > ],
                    //             configdatab < %= i % >
                    //         );
                    //     }
                    //     if (type === "line") {
                    //         myChart < %= i % > = new Chart(
                    //             document.getElementsByClassName("chart")[ < %= i % > ],
                    //             configdata < %= i % >
                    //         );
                    //     }
                    //     if (type === "pie") {
                    //         myChart < %= i % > = new Chart(
                    //             document.getElementsByClassName("chart")[ < %= i % > ],
                    //             configdatap < %= i % >
                    //         );
                    //     }
                    // }



// var ad =[];
                    // let gh;
                    // for(var i=0; i< ;i++) {
                    //     gh = "{t:<%= dat[0].timeStamp[i] %>,y:<%= dat[0].para2[i] %>},";
                    //     ad.push(gh);
                    // }
                    // console.log(ad);

                    // var data = {
                    //     labels: xValues,
                    //     datasets: [{
                    //         data: xValues,
                    //         borderColor: "black",
                    //         fill: false
                    //     }, {
                    //         data: yValues,
                    //         borderColor: "blue",
                    //         fill: false
                    //     }, {
                    //         data: zValues,
                    //         borderColor: "orange",
                    //         fill: false
                    //     }, {
                    //         data: hValues,
                    //         borderColor: "green",
                    //         fill: false
                    //     }]
                    // }

                    // var options = {
                    //     legend: {
                    //         display: false
                    //     },
                    //     title: {
                    //         display: true,
                    //         text: '<%=dat[0].title%>'
                    //     },
                    //     scales: {
                    //         yAxes: [{
                    //             scaleLabel: {
                    //                 display: true,
                    //             }
                    //         }],
                    //         xAxes: [{
                    //             scaleLabel: {
                    //                 display: true,
                    //             }
                    //         }]
                    //     }
                    // }

                    // const configdata = {
                    //     type: "line",
                    //     data,
                    //     options
                    // }

                    // const configdatap = {
                    //     type: "pie",
                    //     data: {
                    //     labels: xValues,
                    //     datasets: [{
                    //         data: yValues,
                    //         label:"<%=dat[0].yLabel%>",
                    //         backgroundColor:["#2596be", "#be4d25","#49be25","#145369","#041014","#bea925","#000000","#134b5f","42032C","E6D2AA","7FB77E","319DA0","C21010","F675A8"],
                    //         fill:false
                    //     }]
                    // },
                    //     options
                    // }

                    // const configdatab = {
                    //     type: "bar",
                    //     data: {
                    //     labels: xValues,
                    //     datasets: [{
                    //         data: yValues,
                    //         label:"<%=dat[0].yLabel%>",
                    //         backgroundColor:["#2596be", "#be4d25","#49be25","#145369","#041014","#bea925","#000000","#134b5f","42032C","E6D2AA","7FB77E","319DA0","C21010","F675A8"],
                    //         fill:false
                    //     }]
                    // },
                    //     options
                    // }

                    // let myChart = new Chart(
                    //     document.getElementsByClassName("chart")[0],
                    //     configdata
                    // );\


// var j =["p","o"];

// console.log(j.length);

// j.length=0;

// console.log(j.length);

// var l =[90,89];
// var h=[90,80];
// var j =[];

// l.map( op => {
//     h.map(io =>{
//         if (op == io) {
//             j.push(op)
//         }
//     })
// });

// console.log(l.slice(0));
// console.log(l,h,j);


// <!-- <div class="updatelabel-div">
// <div style="display: flex; margin: 15px 0 0 0; align-items: center; justify-content: space-between;">
//     <p style="margin:0 0 0 30px;">Graph <%=i +1%></p>
//     <img class="close-img2" onclick="closeit_up(<%=i%>)" src="images/close_FILL0_wght400_GRAD0_opsz48.png"
//         alt="">
// </div>
// <div class="rename-div">
//     <form id="formupdate" action="/labelchange?gateway=stored-data" method="post">
//         <input type="text" name="id" value="<%=dat[i].id%>" style="display: none;">
//         <div class="label-btn">
//             <h6 class="label-head" style="margin: 0 18px">Title</h6>
//             <input type="text" name="title" class="form-control" autocomplete="off"
//                 value="<%=dat[i].title%>" id="formGroupExampleInput" placeholder="Title">
//         </div>
//         <div class="label-btn">
//             <h6 class="label-head">xLabel</h6>
//             <input type="text" name="xlabel" class="form-control" autocomplete="off"
//                 value="<%=dat[i].xLabel%>" id="formGroupExampleInput" placeholder="x-Label">
//         </div>
//         <div class="label-btn">
//             <h6 class="label-head">yLabel</h6>
//             <input type="text" name="ylabel" class="form-control" autocomplete="off"
//                 value="<%=dat[i].yLabel%>" id="formGroupExampleInput" placeholder="y-Label">
//         </div>
//         <button type="btnsubmit" onclick="submitform(<%=i%>)" id="your-id" class="btn">Update</button>
//     </form>
// </div>
// </div> -->

var hj0 = 90;
var h =0;

if (hj0 >80 && h>1) {
    console.log(hj0);
}




