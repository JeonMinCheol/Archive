const express = require("express");
const path = require("path");

const app = express();

// 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공
// 미들웨어 함수인 express.static을 사용하십시오.
// 정적 자산이 포함된 디렉토리의 이름을 express.static 미들웨어 함수에 전달하면 파일의
// 직접적인 제공을 시작할 수 있습니다.
// 정적파일들을 public폴더에 집어넣으면 아래 코드가 public폴더에서 파일을 꺼내와 적용시켜준다.

// setup static and middleware
app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
//   adding to static assets
//   SSR
// });

app.all("*", (req, res) => {
  res.status(400).send("Resource not found");
});

app.listen(5000, () => {
  console.log("listen on 5000");
});
