// ./ == 현재 디렉토리
// readdir 디렉토리에 있는 파일들을 list로 반환
let testFolder = "./data";
let fs = require("fs");

fs.readdir(testFolder, function (err, filelist) {
  console.log(filelist);
});
