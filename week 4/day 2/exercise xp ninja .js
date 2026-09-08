class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    super(); // Must be called BEFORE accessing 'this' or finishing constructor setup
    console.log("I'm pink. 🌸");
  }
}

const pet = new Flamingo();
// Output:
// I'm a bird. 🦢
// I'm pink. 🌸