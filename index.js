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
let op = null;
let displayValue = [];
let opIndex = 0;
let equalLock = true;

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
const del = document.querySelector(".del");
const display = document.querySelector(".display");

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (opIndex === 0 && displayValue.length < 10) {
      displayValue.push(event.target.value);
      nb1 = parseFloat(displayValue.join(""));
      display.textContent = nb1;
      equalLock = false;
    }

    if (opIndex >= 1 && displayValue.length < 10) {
      displayValue.push(event.target.value);
      nb2 = parseFloat(displayValue.join(""));
      display.textContent = nb2;
      equalLock = false;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    if (nb1 !== null && nb2 === null) {
      op = event.target.value;
      console.log(op);
      opIndex++;
      displayValue = [];
      equalLock = true;
    } else if (nb2 !== null) {
      nb1 = Math.round(operate(nb1, nb2, op) * 10000) / 10000;
      op = event.target.value;
      console.log(op);
      console.log(nb1);
      display.textContent = nb1;
      opIndex++;
      displayValue = [];
      equalLock = true;
    }
  });
});

negative.addEventListener("click", () => {
  if (opIndex === 0) {
    nb1 = -nb1;
    display.textContent = nb1;
  } else {
    nb2 = -nb2;
    display.textContent = nb2;
  }
});

equal.addEventListener("click", () => {
  if (equalLock === false) {
    display.textContent = Math.round(operate(nb1, nb2, op) * 10000) / 10000;
    equalLock = true;
    // nb1 = operate(nb1, nb2, op);
    // nb2 = null;
    // op = null;
    displayValue = [];
  }
});

clear.addEventListener("click", () => {
  display.textContent = "0";
  equalLock = true;
  nb1 = null;
  nb2 = null;
  displayValue = [];
  opIndex = 0;
  op = null;
});

del.addEventListener("click", () => {
  if (opIndex === 0) {
    nb1 = parseFloat(displayValue.slice(0, -1));
    display.textContent = nb1;
  } else {
    nb2 = parseFloat(displayValue.slice(0, -1));
    display.textContent = nb2;
  }
});

if (displayValue.length > 9) {
  display.style.fontSize = "5px !important";
}
