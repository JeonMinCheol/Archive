const path = require("path");

// seperator 출력
console.log(path.sep);

// The path.join() method joins all given path segments together using the
// platform-specific separator as a delimiter, then normalizes the resulting path.
// seperator를 이용해서 주소를 만들어준다.

const filePath = path.join(__dirname, "/content/", "subfolder", "test.txt");
console.log(filePath);

// 주소를 제거한 파일이름만을 출력할 때 쓸 수 있음.
const base = path.basename(filePath);
console.log(base);

// The path.resolve() method resolves a sequence of paths or path segments into an
// absolute path.
// 절대 주소를 적어주고 뒤에 나오는 문자열들

const absolute = path.resolve(__dirname, "content", "subfolder", "test.txt");
console.log(absolute);
