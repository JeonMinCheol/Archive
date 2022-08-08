const http = require("http");
const { readFileSync } = require("fs");

// get all files
const homePage = readFileSync("./navbar-app/index.html");
const homeStyles = readFileSync("./navbar-app/styles.css");
const homeImage = readFileSync("./navbar-app/logo.svg");
const homeLogic = readFileSync("./navbar-app/browser-app.js");

const server = http
  .createServer((req, res) => {
    // *****  매우 중요 !!!  *****
    // 현재 위에서 읽어오는 파일들에 의해서 url에 아래와 같은 주소들이 추가된다. (실험해봤음)
    // console.log(url) 실행 결과 = /, /styles.css, /logo.svg, /browser-app.js
    // 위에 주소들에 접속했을 때, 파일들을 불러오게 만든다면 홈페이지가 잘 작동한다.
    // react와 연결해서 어떻게 쓸지 찾아봐야 한다.
    const url = req.url;
    console.log(url);

    // css, logo, javascript 모두 content-type을 잘 지정해주어야만 출력이 된다.
    // css = text/css, image = image/svg+xml, js = text/javascript
    if (url === "/") {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(homePage);
    }
    // about page
    else if (url === "/about") {
      res.writeHead(200, { "content-type": "text/html" });
      res.end("<h1>about page</h1>");
    } //styles
    else if (url === "/styles.css") {
      res.writeHead(200, { "content-type": "text/css" });
      res.end(homeStyles);
    } //image/logo
    else if (url === "/logo.svg") {
      res.writeHead(200, { "content-type": "image/svg+xml" });
      res.end(homeImage);
    } // script
    else if (url === "/browser-app.js") {
      res.writeHead(200, { "content-type": "text/javascript" });
      res.end(homeLogic);
    } //404
    else {
      res.writeHead(404, { "content-type": "text/html" });
      res.end(`
      <h1>Page not found.</h1>
      <a href="/">Return to home page</a>
      `);
    }
  })
  .listen(5000);
