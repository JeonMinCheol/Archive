const http = require("http");
const express = require("express");
const app = express();

// end와 비슷
// 응답코드 304 : 페이지의 상태가 변경된 것이 없음.
app.get("/", (req, res) => {
  console.log("user hit the resource");
  res.status(200).send("Home Page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About page");
});

// 모든 경로 (default page)
app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});

app.listen(5000, () => {
  console.log("listen on 5000");
});

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use (get,post,put,delete)통합
// app.listen
