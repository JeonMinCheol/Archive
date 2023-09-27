let fs = require("fs");

//readFIleSync (동기)
console.log("A");
let result = fs.readFileSync("syntax/sample.txt", "utf-8");
console.log(result);
console.log("C");

//readFIle (비동기)
console.log("A");
fs.readFile("syntax/sample.txt", "utf-8", function (err, result) {
  console.log(result);
});
console.log("C");
