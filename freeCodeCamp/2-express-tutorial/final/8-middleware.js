const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require("./public/logger");
const authorize = require("./public/authorize");
// req => middleware => res

// 아래의 코드들이 실행될 때 마다 미들웨어인 logger를 실행한다.
// app.use(logger);

// /api로 시작하는 주소로 접속할 때 실행
// app.use("/api", logger);

// 적은 순서대로 실행이 된다.
//app.use([authorize, logger]);

// morgan은 써드파티 미들웨어로 HTTP 요청에 대한 정보를 콘솔 로그로 남겨주는 로거의 기능을 한다.
// app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", [authorize, logger], (req, res) => {
  res.send("Products");
});
app.get("/api/items", (req, res) => {
  res.send("Products");
});
app.listen(5000);
