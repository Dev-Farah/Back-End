// console.log('Server File');
// console.log('Server File Again');

const fs = require("fs"); //    fs = file system
const http = require("http"); //    http = hypertext transfer protocol
let dt = require('./exports.js');

// fs.readdir('./', (error, file) => {
// if(error){
//     console.log(error);
// } else {
//     console.log(file);
// }
// })

// fs.readFile('./abc.txt', 'utf8', (err, file) => {
// if(err){
//     console.log(err);
// } else {
//     console.log(file);
// }
// })

// fs.writeFile('./abc.txt', 'Some new text from server.js...', err => {
//     if(err) {
//         console.log(err);
//     }
// })

// fs.appendFile('./abc.txt', ' \nSome new text from server.js...', (err) => {
//     if(err) {
//         console.log(err);
//     }
// });


//  // HTTP Requests
// let server = http.createServer((req, res) => {
//   res.write("Server is listening...");
//   res.end();
// });

let arr = [
  {
    id: 1,
    course: "ABC",
  },
  {
    id: 2,
    course: "DEF",
  },
  {
    id: 3,
    course: "GHI",
  },
];

let server = http.createServer((req, res) => {
  if (req.url == "/courses") {
    res.write(JSON.stringify(arr));
    res.write("\n\nThe date and time are currently: " + dt.myDateTime())
    res.end();
  }
  res.end();
});


server.listen(5000);