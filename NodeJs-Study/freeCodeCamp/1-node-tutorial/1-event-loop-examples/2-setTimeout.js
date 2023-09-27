// started operationg system process
console.log("first");
setTimeout(() => {
  // setTimeout은 비동기식이다.
  console.log("second");
}, 0);
console.log("third");
// completed and exited operating system process

// result:
// first
// third
// second
