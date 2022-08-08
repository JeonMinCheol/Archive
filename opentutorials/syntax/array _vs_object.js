let members = ["A", "B", "C"];
let roles = { A: 1, B: 2, C: 3 };

// array 출력
for (let x = 0; x < 3; x++) {
  console.log(members[x]);
}

// object 출력
for (let x in roles) {
  console.log(roles[x]);
}
