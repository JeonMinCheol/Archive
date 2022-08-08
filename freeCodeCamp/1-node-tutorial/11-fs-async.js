const { readFile, writeFile } = require("fs");

console.log("start");
readFile("./content/first.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return null;
  }
  const first = result;
  readFile("./content/second.txt", "utf8", (err, result) => {
    if (err) {
      console.log(err);
      return null;
    }
    const second = result;
    writeFile(
      "./content/reasult-async.txt",
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("done with this task");
      }
    );
  });
});
console.log("starting next task");

/*
동기와 비동기

동기는 함수를 호출하면 함수가 종료되고나서 다음 코드를 살펴보고,
비동기는 함수를 호출하고 바로 다음 코드로 넘어간다.

동기식 : 값이 꼭 필요하고 이 값이 순차적으로 나와야 하는 경우
비동기식 : nodejs의 기본동작방식
          함수를 호출하고 함수의 수행여부와 상관없이 진행, callback함수가 존재. 


콜백지옥은 promise 또는 async await으로 해결할 수 있다?(확실하진 않음)
*/
