// URl의 구조
// ex) http://www.example.com:3000/main/post?category=nodejs&num=1
// protocol = http
// DomainName = www.example.com
// PortNumber = 3000
// path = main/post
// query = category=nodejs&num=1

// require = import
let http = require("http");
let fs = require("fs");
let url = require("url");
let qs = require("querystring");
let create = require("./lib/template");
let path = require("path");
// sanitize-html: npm으로 설치해야 사용가능, 입력값으로 태그가 들어오면 없애버림.
// 두번째 인자로 허용할 태그, 속성, 경로등을 지정할 수 있다.
let sanitizeHtml = require("sanitize-html");

// 서버 생성
// createServer: 웹브라우저로 접속이 들어올 떄마다 콜백함수 실행.
// request: 요청 시 웹브라우저가 보낸 정보
// response: 응답 시 서버가 웹브라우저로 보낼 정보
let app = http.createServer(function (request, response) {
  // URL 모듈은 URL을 통해서 입력된 값을 사용할 수 있도록 해준다
  let _url = request.url;
  // parse(): URL 문자열을 입력하면 URL 객체를 만든다. 이떄 JSON형식으로 반환된다.
  // 밑에 queryData는 URL객체에서 query부분만 가져오고 있다.
  let queryData = url.parse(_url, true).query;
  // pathname: querylisting을 제외한 path만을 나타냄.
  let pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      // list 만들기.
      // fs.readdir(읽어올 주소, 함수), 비동기적으로 작동함.ㅋㅋ!
      fs.readdir("./data", function (err, filelist) {
        create.Template(response, filelist, '<a href="/create">create</a>');
      });
    } else {
      fs.readdir("./data", function (err, filelist) {
        // path.parse(queryData.id).base: 이름앞에 다른 경로를 붙혀서 소스코드에 접근하는 것을 경로를 없앤 id값만으로 바꾸어서 막을 수 있다.
        let filteredId = path.parse(queryData.id).base;
        // readFIle: 해당경로에 위치한 파일의 내용을 읽어옴.
        fs.readFile(`data/${filteredId}`, "utf8", (err, description) => {
          create.Template(
            response,
            filelist,
            `<a href="/create">create</a> 
              <a href="/update?id=${filteredId}">update</a>
              <form action = "delete_process" method = "post">
                <input type ="hidden" name = "id" value ="${filteredId}">
                <input type="submit" value="delete">
              </form>`,
            sanitizeHtml(queryData.id, {
              allowedTags: ["h1"],
            }),
            sanitizeHtml(description)
          );
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (err, filelist) {
      create.Mode(response, filelist, "WEB-Create");
    });
  } else if (pathname === "/create_process") {
    let body = "";
    // request.on('data', function): 데이터를 수신할 때 마다 콜백함수를 실행
    // 'data'는 명령어이다. 파일 아님.
    // 이때 함수의 인자로 데이터가 들어옴.
    request.on("data", function (data) {
      body += data;
    });
    // request.on('end', function): 정보 수신이 끝날 때 실행됨.
    request.on("end", function () {
      let post = qs.parse(body);
      let title = post.title;
      let description = post.description;
      // writeFile(주소+이름, 내용 , 'utf8', callback):
      // 만약에 주소없이 이름만 있다면 현재 디렉토리에 생성이된다. 이떄 내용 부분에 적은 데이터를
      // 파일 내부 내용으로 저장한다.
      fs.writeFile(`data/${title}`, description, "utf-8", (err) => {
        // redirection하는 것
        // Location 뒤에 우리가 가고자 하는 주소를 적는다.
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
      console.log(post);
    });
  } else if (pathname === "/update") {
    fs.readdir("./data", function (err, filelist) {
      let filteredId = path.parse(queryData.id).base;
      // readFIle: 해당경로에 위치한 파일의 내용을 읽어옴.
      fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
        create.Template(
          response,
          filelist,
          `<a href="/create">create</a> <a href="/update?id=${filteredId}">update</a>`,
          filteredId,
          description,
          `<form action='/update_process' method='post'>
            <input type = "hidden" name = "id" value = "${filteredId}"/>
            <p>
              <input type='text' name='title' placeholder="title" value="${filteredId}"/>
            </p>
            <p>
              <textarea name='description' placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type='submit' />
            </p>
          </form>`
        );
      });
    });
  } else if (pathname === "/update_process") {
    let body = "";
    // request.on('data', function): 데이터를 수신할 때 마다 콜백함수를 실행
    // 이때 함수의 인자로 데이터가 들어옴.
    request.on("data", function (data) {
      body += data;
    });
    // request.on('end', function): 정보 수신이 끝날 때 실행됨.
    request.on("end", function () {
      let post = qs.parse(body);
      let id = post.id;
      let title = sanitizeHtml(post.title);
      let description = sanitizeHtml(post.description);
      // fs.rename(old, new, callback): old를 new로 이름변경, 그 다음 callback함수 실행
      fs.rename(`data/${id}`, `data/${title}`, function (err) {
        fs.writeFile(`data/${title}`, description, "utf-8", (err) => {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathname === "/delete_process") {
    let body = "";
    // request.on('data', function): 데이터를 수신할 때 마다 콜백함수를 실행
    // 이때 함수의 인자로 데이터가 들어옴.
    request.on("data", function (data) {
      body += data;
    });
    // request.on('end', function): 정보 수신이 끝날 때 실행됨.
    request.on("end", function () {
      let post = qs.parse(body);
      let id = post.id;
      let filteredId = path.parse(id).base;
      // fs.unlink: 파일 삭제 기능.
      fs.unlink(`data/${filteredId}`, function (err) {
        // 파일 삭제 후 홈화면으로 이동.
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    // response.writeHead(404): 페이지를 찾을 수 없음
    response.writeHead(404);
    response.end("Not found");
  }
});
// 3000번 포트를 확인
app.listen(3000);
