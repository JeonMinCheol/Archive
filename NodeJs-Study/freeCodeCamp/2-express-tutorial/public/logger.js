// 모든 코드를 실행.
// 요청 및 응답 오브젝트에 대한 변경을 실행.
// 요청-응답 주기를 종료.
// 스택 내의 그 다음 미들웨어 함수를 호출.
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(method, url);
  next();
};

module.exports = logger;
// next = 미들웨어
// 미들웨어 함수는 다음과 같은 태스크를 수행할 수 있습니다.
