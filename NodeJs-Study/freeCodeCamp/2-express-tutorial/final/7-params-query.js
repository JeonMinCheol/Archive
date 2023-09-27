const express = require("express");
const app = express();
const { products, people } = require("./data");
app.get("/", (req, res) => {
  res.send('<h1>title</h1> <a href = "/api/products">go to api link</a>');
});

// map을 이용해서 api에서 원하는 정보만 꺼내서 사용할 수 있다.
app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  const singleProduct = products.find(
    (product) => product.id === Number(req.params.productID)
  );
  const singlePerson = people.find(
    (review) => review.id === Number(req.params.reviewID)
  );
  res.json(singlePerson);
  console.log(singlePerson, singleProduct);
});

// Route parameter: /:anything
// /api/products/1에 접속했다고 가정한다면 이때 productID는 1이 된다.
// 이때 productID는 req.params로 호출할 수 있다.
app.get("/api/products/:productID", (req, res) => {
  // id값이 1인 것만 찾을 수 있음.
  const singleProduct = products.find(
    (product) => product.id === Number(req.params.productID)
  );
  if (!singleProduct) {
    return res.status(404).send("Product does not exists.");
  }
  console.log(singleProduct);
  res.json(singleProduct);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search)
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)
    );
  if (limit) sortedProducts = sortedProducts.slice(0, Number(limit));
  if (sortedProducts.length < 1)
    res.status(200).json({ success: true, data: [] });
  else res.status(200).json(sortedProducts);
});

app.listen(5000);
