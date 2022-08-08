const express = require("express");
const router = express.Router();
const { people } = require("../data");

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(401).send(`Please Provide Credentials.`);
  } else {
    const person = people.find((p) => name == p.name);
    console.log(person);

    if (person) res.status(200).send(`Welcome ${name}, Good to see you back!`);
    else res.status(401).send(`Sorry ${name}, You are Unauthorized`);
  }
});

module.exports = router;
