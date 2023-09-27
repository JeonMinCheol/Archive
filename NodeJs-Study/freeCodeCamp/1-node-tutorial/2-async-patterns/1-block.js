const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home Page");
  } else if (req.url === "/about") {
    // BlOCKING CODE !!!
    // 동기식으로 진행하면 현재 사용자만 막히는 것이 아니라 다른 사용자들 또한 웹사이트 접속이 막힘.
    // 아래가 예시. (창 여러개 띄어놓고, 한 홈페이지 about으로 접속한다음 다른 창들로 about 말고 접속해보자. = 진행이 안됨.)
    // 이러한 이유로 비동기식으로 만드는 것이 매우 중요하다!!
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 100; j++) {
        console.log(`${i} ${j}`);
      }
    }
    res.end("About Page");
  } else {
    res.end("Error Page");
  }
});

server.listen(5000, () => {
  console.log("Server is Listening on port 5000....");
});
