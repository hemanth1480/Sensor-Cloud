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






