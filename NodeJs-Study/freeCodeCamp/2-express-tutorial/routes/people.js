const express = require("express");
const router = express.Router();
const people = require("../controllers/people");

// 방법 1
// router.get("/", people.getPeople);
// router.post("/", people.createPerson);
// router.post("/postman", people.createPersonPostman);
// router.put("/:id", people.putID);
// router.delete("/:id", people.deleteID);

// 방법 2
router.route("/").get(people.getPeople).post(people.createPerson);
router.route("/postman").post(people.createPersonPostman);
router.route("/:id").put(people.putID).delete(people.deleteID);

module.exports = router;
