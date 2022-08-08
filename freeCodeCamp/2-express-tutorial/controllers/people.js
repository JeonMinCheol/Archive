// routes 폴더에 있는 함수들을 모아놓은 파일

let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};
const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ success: false, msg: "please provide name value" });
  } else res.status(201).send({ success: true, person: name });
};

const createPersonPostman = (req, res) => {
  // req.body에 있는 name
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ success: false, msg: "please provide name value" });
  } else res.status(201).send({ success: true, data: [...people, name] });
};

const putID = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((p) => p.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.map((p) => {
    if (p.id === Number(id)) {
      p.name = name;
    }
    return p;
  });
  res.status(200).send({ success: true, data: newPeople });
};

const deleteID = (req, res) => {
  const { id } = req.params;
  const person = people.find((p) => p.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.filter((person) => person.id != id);
  res.status(200).send({ success: true, data: newPeople });
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  putID,
  deleteID,
};
