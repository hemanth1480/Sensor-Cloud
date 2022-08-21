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

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'}
    ]
});
 
const records = [
    {name: 'Bob',  lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
];
 
csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
  


