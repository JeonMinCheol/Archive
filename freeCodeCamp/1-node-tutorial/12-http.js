const http = require("http");
// end 메소드를 써서 서버에게 데이터가 다 로딩되었다는 걸 알려서
// 웹 페이지가 계속 로딩되는걸 방지할 수 있다.

// error
// write after end: end를 두번 이상 했을 떄 발생하는 에러

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to our home page");
  } else if (req.url === "/about") {
    res.end("Here is our short history");
  } else {
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href = "/">back home</a>
  `);
  }
});
server.listen(5000);
