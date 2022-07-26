const { readFileSync, writeFileSync } = require("fs");
console.log("start");
// Returns the contents of the path.
// File을 동기적으로 읽음.
const first = readFileSync("./content/first.txt", "utf8");
const second = readFileSync("./content/second.txt", "utf8");

// When file is a filename, asynchronously writes data to the file, replacing the file if it already exists.
// data can be a string or a buffer.
// flag에 들어갈 수 있는 값은 'w' 또는 'a'이다. python과 동일.
writeFileSync(
  "./content/result-sync.txt",
  `Here is the result : ${first}, ${second}`,
  { flag: "a" }
);
console.log("done with this task");
console.log("starting the next one");
