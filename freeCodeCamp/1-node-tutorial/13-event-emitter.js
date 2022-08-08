const EventEmitter = require("events");

const customEmitter = new EventEmitter();

customEmitter.on("response", (name, id) => {
  console.log(`data recieved user ${name} with id : ${id}`);
});
customEmitter.on("response", () => {
  console.log(`some other logic here`);
});

// response말고 다른 단어를 넣으면 실행이 안됨.
// on으로 이벤트를 만들고 emit으로 실행함.
customEmitter.emit("response", "john", "34");
