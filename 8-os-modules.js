// os module
const os = require("os");

// info about current user
const user = os.userInfo();
console.log(user);

// method returs the system yptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`);

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMemory: os.totalmem(),
  freeMem: os.freemem(),
};
console.log(currentOS);
