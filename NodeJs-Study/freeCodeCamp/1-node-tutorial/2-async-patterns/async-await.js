// async & await
// clear style of using promise

// 1. async
// promise를 반환해줌.
async function fetchUser() {
  // do network request in 10 secs...
  return "name";
}

const user = fetchUser();
// Promise { 'name' }, Promise { <pending> }
// promise가 반환.
console.log(user);
// name이 반환
user.then(console.log);

// 2. await
// async안에서만 사용이 가능하고 promise의 result를 반환해줌.
// 그 코드가 끝날 때까지 기다림. (= 비동기적인 async안의 코드를 동기적으로 사용할 수 있게끔 만들어줌)
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  // delay(1000)이 끝날 때 까지 기다림.
  await delay(1000);
  return "apple";
}
console.log(getApple());
async function getBanana() {
  await delay(1000);
  return "banana";
}

// function pickFruits() {
//   return getApple().then((apple) => {
//     return getBanana().then((banana) => {
//       return `${apple} + ${banana}`;
//     });
//   });
// }

async function pickFruits() {
  // 이런식으로 코드를 작성하면 applePromise와 bananaPromise를 초기화하는 순간 getApple과
  // getBanana가 병렬적으로 실행이 되어서 원래라면 1초 + 1초 해서 2초만에 끝나야하는 작업이
  // 1초만에 끝나게 된다. (병렬이므로.)
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}
pickFruits().then((fruits) => console.log(fruits));
