let nb1 = null;
let nb2 = null;
let op = null;
let displayValue = [];
let opIndex = 0;
let equalLock = true;
let equalPressed = false;

function resFormat(res) {
  if (res > 10000000 || res < -1000000) {
    return res.toExponential(3);
  }
  if (Number.isInteger(res)) {
    return res;
  } else {
    return Math.round(res * 1000) / 1000;
  }
}

let operate = function (nb1, nb2, op) {
  switch (op) {
    case "add":
      let addi = nb1 + nb2;
      return resFormat(addi);
      break;

    case "subtract":
      let subt = nb1 - nb2;
      return resFormat(subt);
      break;

    case "multiply":
      let mult = nb1 * nb2;
      return resFormat(mult);
      break;

    case "divide":
      let divi = nb1 / nb2;
      return resFormat(divi);
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
    // comnplicated way to prevent user to enter a point more than once in a number...
    if (
      (equalPressed === true && event.target.value === ".") ||
      (displayValue.reduce((tot, digit) => {
        if (digit === ".") {
          tot++;
        }
        return tot;
      }, 0) === 1 &&
        event.target.value === ".")
    ) {
      return;
    }

    if (equalPressed === true) {
      equalPressed = false;
      displayValue = [];
      opIndex = 0;
      nb1 = null;
      nb2 = null;
      op = null;
    }

    displayValue.push(event.target.value);
    if (opIndex === 0 && displayValue.length < 10) {
      nb1 = parseFloat(displayValue.join(""));
      display.textContent = displayValue.join("");
    }

    if (opIndex >= 1 && displayValue.length < 10) {
      nb2 = parseFloat(displayValue.join(""));
      display.textContent = displayValue.join("");
    }
    equalLock = false;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    if (nb2 !== null) {
      nb1 = operate(nb1, nb2, op);
      display.textContent = nb1;
    }
    op = event.target.value;
    opIndex++;
    displayValue = [];
    equalLock = true;
    equalPressed = false;
  });
});

negative.addEventListener("click", (event) => {
  if (equalPressed === true) {
    nb1 = -operate(nb1, nb2, op);
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
    display.textContent = operate(nb1, nb2, op);
    equalLock = true;
    displayValue = [];
  }
  equalPressed = true;
});

clear.addEventListener("click", (event) => {
  display.textContent = "0";
  equalLock = true;
  equalPressed = false;
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
});
