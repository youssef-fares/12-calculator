// const add = function (a, b) {
//   return a + b;
// };

// const subtract = function (a, b) {
//   return a - b;
// };

// const multiply = function (a, b) {
//   return a * b;
// };

// const divide = function (a, b) {
//   return a / b;
// };

let nb1 = null;
let nb2 = null;
let operator = null;
let displayValue = [];
let opIndex = 0;

let operate = function (nb1, nb2, op) {
  console.log(op);
  switch (op) {
    case "add":
      return nb1 + nb2;
      break;

    case "subtract":
      return nb1 - nb2;
      break;

    case "multiply":
      return nb1 * nb2;
      break;

    case "divide":
      return nb1 / nb2;
      break;

    default:
      console.log(`error`);
  }
};

const addOp = document.querySelector("#add");
const subOp = document.querySelector("#subtract");
const multOp = document.querySelector("#multiply");
const divOp = document.querySelector("#divide");

const buttons = document.querySelectorAll("button");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
const negative = document.querySelector(".negative");
const returnn = document.querySelector(".return");
const display = document.querySelector(".display");

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (opIndex === 0 && displayValue.length < 10) {
      displayValue.push(event.target.value);
      nb1 = parseFloat(displayValue.join(""));
      display.textContent = nb1;
    }

    if (opIndex >= 1 && displayValue.length < 10) {
      displayValue.push(event.target.value);
      nb2 = parseFloat(displayValue.join(""));
      display.textContent = nb2;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    if (nb1 !== null && nb2 === null) {
      operator = event.target.value;
      console.log(operator);
      opIndex++;
      displayValue = [];
    } else if (nb2 !== null) {
      nb1 = operate(nb1, nb2, operator);
      operator = event.target.value;
      console.log(operator);
      console.log(nb1);
      display.textContent = nb1;
      opIndex++;
      displayValue = [];
    }
  });
});

// buttons.forEach((button) => {
//     button.addEventListener("click", (event) => {

//         if(event.class=".number" && displayValue.length<10){
//         displayValue.push(event.target.value);
//         let val = parseFloat(displayValue.join(''));
//         display.textContent=val;
//         }

//         if(event.class=".operator" && displayValue.length>0){
//             operator = event.target.value;
//         }

//     });
//   });

// num= Array.from(numbers)
//   for (let i = 0; i < num.length; i++) {
//     num[i].addEventListener("click", function (e) {
//         display.textContent=e.target.value;
//         console.log("click");
//     });
//   }
