// get은 req.query에 json에 저장되어있다.
// post는 req.body에 json이 저장되어있다.

const express = require("express");
const app = express();

// ============== parsing ==============
// router에서도 사용하기 때문에 그들보다 위에 있어야함.
// post
app.use(express.urlencoded({ extended: false }));
// json
app.use(express.json());
// ====================================

// ============== router ==============
const people = require("./routes/people");
const login = require("./routes/login");
// people.js router 전용
app.use("/api/people", people);
// login.js router 전용
app.use("/login", login);
// ====================================

// static assets
app.use(express.static("./methods-public"));

app.get("/api/products", (req, res) => {
  res.send("Products");
});

app.get("/api/items", (req, res) => {
  res.send("Products");
});

app.listen(5000);
