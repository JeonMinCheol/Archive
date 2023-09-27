// 리팩토링
// 그냥 템플렛.
function templateHTML(title, list, control, body) {
  return `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              ${control}
              ${body}
              </body>
              </html> 
              `;
}
// readFile로 읽어온 데이터를 filelist로 전달하면 그 정보를 이용해서 리스트를 만들어 화면에 출력함.
function templateList(filelist) {
  let list = "<ul>";
  for (let i = 0; i < filelist.length; i++) {
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list += "</ul>";
  return list;
}

module.exports = {
  // createTemplate: templateHTML + templateLIst (가독성을 높이기 위해 하나로 뭉친거)
  Template: (
    response,
    filelist,
    control,
    title = "welcome",
    description = "Hello, Node.js",
    body = `<h2>${title}</h2><p>${description}</p>`
  ) => {
    let list = templateList(filelist);
    let template = templateHTML(title, list, control, body);
    // response.writeHead(200): 파일을 성공적으로 전송했다는 표시
    response.writeHead(200);
    // response.end(): 컨텐츠 출력 완료(응답 종료), return과 동일한 기능인듯.
    response.end(template);
  },
  // ~~/create로 접속했을 때 사용하는 용도
  Mode: (response, filelist, title = "WEB-Create") => {
    let list = templateList(filelist);
    let template = templateHTML(
      title,
      list,
      `<form action='/create_process' method='post'>
      <p>
        <input type='text' name='title' placeholder="title"/>
      </p>
      <p>
        <textarea name='description' placeholder="description"></textarea>
      </p>
      <p>
        <input type='submit' />
      </p>
      </form>`,
      ""
    );
    // response.writeHead(200): 파일을 성공적으로 전송했다는 표시
    response.writeHead(200);
    // response.end(): 컨텐츠 출력 완료(응답 종료), return과 동일한 기능인듯.
    response.end(template);
  },
};
