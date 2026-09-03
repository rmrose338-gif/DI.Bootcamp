if (typeof alert === 'undefined') {
    globalThis.alert = (...args) => console.log(...args);
}

if (typeof document === 'undefined') {
    const createNode = () => {
        const node = {
            children: [],
            style: {},
            classList: { add: () => {} },
            parentNode: null,
            textContent: '',
            innerHTML: '',
            src: '',
            alt: '',
            append: function (...items) {
                items.forEach((item) => {
                    item.parentNode = this;
                    this.children.push(item);
                });
            },
            appendChild: function (child) {
                child.parentNode = this;
                this.children.push(child);
                return child;
            },
            prepend: function (...items) {
                items.forEach((item) => {
                    item.parentNode = this;
                    this.children.unshift(item);
                });
            },
            setAttribute: function () {},
        };
        return node;
    };

    globalThis.document = {
        body: createNode(),
        createElement: () => createNode(),
        querySelector: () => null,
    };
}

// Exercise 1: Scope
// Predictions and explanations

// #1
function funcOne() {
    let a = 5;
    if (a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}

// Prediction: inside the funcOne function 3
// Explanation: the variable a is declared with let inside funcOne, so it is local to this function.
// It starts as 5, the condition a > 1 is true, and then a is reassigned to 3.
// The alert shows 3.

// If const were used instead of let:
// const a = 5;
// if (a > 1) {
//     a = 3; // ERROR: Assignment to constant variable.
// }
// The code would fail because a constant cannot be reassigned.

// #1.1 - run in the console:
// funcOne()

// #2
let a2 = 0;
function funcTwo() {
    a2 = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a2}`);
}

// Prediction for funcThree() before funcTwo(): inside the funcThree function 0
// Prediction after funcTwo() and then funcThree(): inside the funcThree function 5
// Explanation: a2 is declared outside both functions, so it is a global variable.
// funcTwo changes the outer a2 to 5. funcThree reads the current value of the outer a2.
// Therefore, the first alert shows 0 and the second alert shows 5.

// If let a2 were replaced with const a2 = 0:
// const a2 = 0;
// function funcTwo() {
//     a2 = 5; // ERROR: Cannot reassign a constant.
// }
// The code would break when funcTwo is called.

// #2.1 - run in the console:
// funcThree()
// funcTwo()
// funcThree()

// #3
function funcFour() {
    window.a3 = "hello";
}

function funcFive() {
    alert(`inside the funcFive function ${a3}`);
}

// Prediction: inside the funcFive function hello
// Explanation: funcFour assigns a property named a3 to the window object, which creates a global variable.
// Since funcFive reads a3 from the global scope, it sees the value "hello".
// This works because window.a3 is the same as the global variable a3 in the browser.

// #3.1 - run in the console:
// funcFour()
// funcFive()

// #4
let a4 = 1;
function funcSix() {
    let a4Inside = "test";
    alert(`inside the funcSix function ${a4Inside}`);
}

// Prediction: inside the funcSix function test
// Explanation: the a4Inside inside funcSix is a new local variable declared with let.
// It shadows the outer a4 = 1. The alert uses the local variable, not the global one.
// So the result is "test".

// If const were used instead of let inside funcSix:
// function funcSix() {
//     const a4Inside = "test";
//     alert(`inside the funcSix function ${a4Inside}`);
// }
// The result would still be "test" because the variable is only shadowing the outer one.

// #4.1 - run in the console:
// funcSix()

// #5
let a5 = 2;
if (true) {
    let a5Inside = 5;
    alert(`in the if block ${a5Inside}`);
}
alert(`outside of the if block ${a5}`);

// Prediction: in the if block 5
// Prediction: outside of the if block 2
// Explanation: the let inside the if block is block-scoped, so it only exists inside that block.
// The outer a5 remains 2 and is unaffected by the inner declaration.
// The first alert uses the inner variable and shows 5; the second alert uses the outer variable and shows 2.

// If const were used instead of let inside the block:
// if (true) {
//     const a5Inside = 5;
//     alert(`in the if block ${a5Inside}`);
// }
// The output is still the same because const is also block-scoped and works the same way here.

// #5.1 - run the code in the console

// Exercise 2: Ternary operator

const winBattle = () => true;

const experiencePoints = winBattle() ? 10 : 1;

console.log(experiencePoints);

// Exercise 3: Is it a string ?

const isString = (value) => typeof value === 'string';

console.log(isString('hello')); // true
console.log(isString([1, 2, 4, 0])); // false

// Exercise 4: Find the sum

const sum = (a, b) => a + b;

console.log(sum(3, 5));

// Exercise 5: Kg and grams

// Function declaration
function kgToGramsDeclaration(kg) {
    return kg * 1000;
}
console.log(kgToGramsDeclaration(2));

// Function expression
const kgToGramsExpression = function (kg) {
    return kg * 1000;
};
console.log(kgToGramsExpression(2));

// Function declaration is hoisted and can be used before it is defined; function expression is not hoisted and must be defined before use.

// Arrow function
const kgToGramsArrow = (kg) => kg * 1000;
console.log(kgToGramsArrow(2));

// Exercise 6: Fortune teller

(function (numChildren, partnerName, geographicLocation, jobTitle) {
    const sentence = `You will be a ${jobTitle} in ${geographicLocation}, and married to ${partnerName} with ${numChildren} kids.`;
    document.body.innerHTML += `<p>${sentence}</p>`;
})(2, 'Emma', 'Paris', 'frontend developer');

// Exercise 7: Welcome

(function (userName) {
    const nav = document.querySelector('nav') || document.createElement('nav');
    nav.classList.add('navbar');
    nav.style.display = 'flex';
    nav.style.justifyContent = 'flex-end';
    nav.style.alignItems = 'center';
    nav.style.gap = '10px';
    nav.style.padding = '12px 20px';
    nav.style.background = '#f3f3f3';
    nav.style.borderBottom = '1px solid #ddd';

    if (!nav.parentNode) {
        document.body.prepend(nav);
    }

    const welcomeDiv = document.createElement('div');
    welcomeDiv.classList.add('welcome-user');
    welcomeDiv.style.display = 'flex';
    welcomeDiv.style.alignItems = 'center';
    welcomeDiv.style.gap = '8px';

    const profileImg = document.createElement('img');
    profileImg.src = 'https://randomuser.me/api/portraits/men/32.jpg';
    profileImg.alt = `${userName} profile picture`;
    profileImg.style.width = '32px';
    profileImg.style.height = '32px';
    profileImg.style.borderRadius = '50%';

    const label = document.createElement('span');
    label.textContent = `Welcome, ${userName}`;

    welcomeDiv.append(profileImg, label);
    nav.appendChild(welcomeDiv);
})('John');

// Exercise 8: Juice Bar

// Part I
function makeJuice(size) {
    function addIngredients(ingredient1, ingredient2, ingredient3) {
        const sentence = `The client wants a ${size} juice, containing ${ingredient1}, ${ingredient2}, ${ingredient3}.`;
        document.body.innerHTML += `<p>${sentence}</p>`;
    }

    addIngredients('orange', 'banana', 'mango');
}

makeJuice('large');

// Part II
function makeJuiceWithIngredients(size) {
    const ingredients = [];

    function addIngredients(ingredient1, ingredient2, ingredient3) {
        ingredients.push(ingredient1, ingredient2, ingredient3);
    }

    function displayJuice() {
        const sentence = `The client wants a ${size} juice, containing ${ingredients[0]}, ${ingredients[1]}, ${ingredients[2]}, ${ingredients[3]}, ${ingredients[4]}, ${ingredients[5]}.`;
        document.body.innerHTML += `<p>${sentence}</p>`;
    }

    addIngredients('orange', 'banana', 'mango');
    addIngredients('apple', 'strawberry', 'kiwi');
    displayJuice();
}

makeJuiceWithIngredients('medium');



