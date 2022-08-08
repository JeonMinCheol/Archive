const fs = require("fs");
// sample.txt에서 받아온 정보가 data로 들어감.
fs.readFile("sample.txt", "utf8", function (err, data) {
  console.log(data);
});
