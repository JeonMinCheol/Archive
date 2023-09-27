var a = function () {
  console.log("A");
};
a();

//함수안에 함수 = callback
function slowfunc(callback) {
  callback();
}

slowfunc(a);
