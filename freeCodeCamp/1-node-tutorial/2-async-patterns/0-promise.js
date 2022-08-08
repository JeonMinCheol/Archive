"use strict";

// Promise is a JavaScript object for asynchronus operation.
// Promise 의 특징은 new Promise(...) 하는 순간 여기에 할당된 비동기 작업은 바로 시작됩니다.
// state: pending -> fulfilled or rejected
// Producer: vs Consumer

// 1. Producer
// when new Promise is created, the executor runs automatically.
// promise내부에 비동기적으로 실행할 코드를 작성하고 성공적으로 실행했다면 resolve를 전달하고,
// 실패했다면 reject를 전달한다.
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files...)
  console.log("doing something");
  setTimeout(() => {
    // resolve: 성공했을 때 전달해줄 거.
    resolve("Worked!");
    // reject: 실패했을 때 전달해줄 거.
    reject(new Error("no network"));
  }, 2000);
});

// 2. Consumers: then, catch, finally
// value: resolve, reject에서 넘어온 값 (='Worked!')
// then: resolve, reject에서 전달한 값이 인자로 들어옴.
// catch: error를 잡아서 함수를 실행시킴.
// finally: 항상 실행됨.
promise
  .then((value) => {
    console.log(value); // = Worked!
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });

// 3. Promise chaning
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .catch((num) => num + 1) //위 코드가 오류발생시 실행되서 멈추지 않고 계속 이어나감.
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

// 4. useful Promise API
function pickAllFruits() {
  // Promise.all(): 인자로 전달된 promise들을 병렬적으로 실행시킨다음 결과를 반환
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" + ")
  );
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
  // Promise.race(): 제일 먼저 반환되는 promise만 return
  return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log);
