// Daily Challenge 2 - Pattern

// Version 1: using one loop
let line = "";
for (let i = 1; i <= 6; i++) {
  line += "* ";
  console.log(line.trim());
}

// Version 2: using nested loops
for (let i = 1; i <= 6; i++) {
  let pattern = "";
  for (let j = 1; j <= i; j++) {
    pattern += "* ";
  }
  console.log(pattern.trim());
}
