let nb1 = null;
let nb2 = null;
let op = null;
let displayValue = [];
let opIndex = 0;
let equalLock = true;
let equalPressed = false;

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
    if (equalPressed === true && event.target.value === ".") {
      return;
    }

    if (equalPressed === true) {
      equalPressed = false;
      displayValue = [];
      opIndex = 0;
      nb1 = null;
      nb2 = null;
      op = null;
      console.log(equalPressed);
    }

    displayValue.push(event.target.value);
    if (opIndex === 0 && displayValue.length < 10) {
      nb1 = parseFloat(displayValue.join(""));
      display.textContent = nb1;
    }

    if (opIndex >= 1 && displayValue.length < 10) {
      nb2 = parseFloat(displayValue.join(""));
      display.textContent = nb2;
    }
    equalLock = false;
    console.log(equalPressed);
    // equalPressed = false;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    if (nb2 !== null) {
      nb1 = Math.round(operate(nb1, nb2, op) * 10000) / 10000;
      display.textContent = nb1;
    }
    op = event.target.value;
    opIndex++;
    displayValue = [];
    equalLock = true;
    equalPressed = false;
    console.log(equalPressed);
  });
});

negative.addEventListener("click", (event) => {
  if (equalPressed === true) {
    nb1 = -Math.round(operate(nb1, nb2, op) * 10000) / 10000;
    display.textContent = nb1;
    nb2 = null;
    return;
  }

  if (opIndex === 0) {
    nb1 = -nb1;
    display.textContent = nb1;
  } else {
    nb2 = -nb2;
    display.textContent = nb2;
  }
});

equal.addEventListener("click", (event) => {
  if (opIndex === 0) {
    return;
  }
  if (equalLock === false) {
    display.textContent = Math.round(operate(nb1, nb2, op) * 10000) / 10000;
    equalLock = true;
    displayValue = [];
  }
  equalPressed = true;
  console.log(equalPressed);
});

clear.addEventListener("click", (event) => {
  display.textContent = "0";
  equalLock = true;
  nb1 = null;
  nb2 = null;
  displayValue = [];
  opIndex = 0;
  op = null;
});

del.addEventListener("click", (event) => {
  if (equalPressed === true) {
    return;
  }

  if (
    opIndex === 0 &&
    (displayValue.length === 1 || displayValue.length === 0)
  ) {
    displayValue = [];
    display.textContent = 0;
    nb1 = 0;
  } else if (opIndex === 0 && displayValue.length > 1) {
    displayValue.pop();
    nb1 = parseFloat(displayValue.join(""));
    display.textContent = nb1;
  } else if (
    opIndex === 1 &&
    (displayValue.length === 1 || displayValue.length === 0)
  ) {
    displayValue = [];
    display.textContent = 0;
    nb2 = 0;
  } else {
    displayValue.pop();
    nb2 = parseFloat(displayValue.join(""));
    display.textContent = nb2;
  }
  console.log(equalPressed);
});

if (displayValue.length > 9) {
  display.style.fontSize = "5px !important";
}
