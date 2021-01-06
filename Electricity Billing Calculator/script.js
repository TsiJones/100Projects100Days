// ! SELECTORS
// ?--------------input info---------------
const toggleButton = document.querySelector("button");
// ?--------------output info---------------
const closeBtn = document.querySelector("#close");
const userName = document.querySelector("#userName");
const issueDate = document.querySelector("#issue-date");
const billingDate = document.querySelector("#billing-date");
const prevReading = document.querySelector("#prevReading");
const newReading = document.querySelector("#newReading");
const rate = document.querySelector("#rate");
const vat = document.querySelector("#vat");
const unit = document.querySelector("#unit");
const totalEnergy = document.querySelector("#total");
const dueDate = document.querySelector("#due-date");
const amount = document.querySelector("#amount");

// ! EVENT LISTENER

// ?-----------------Animations------------
toggleButton.addEventListener("click", show);
closeBtn.addEventListener("click", remove);
// ?-------------------End Animations-------------

// ?----------------result-------------
toggleButton.addEventListener("click", resultAnalysis);
// ?----------------end result------------

// ! FUNCTION

// ?-------------------------Animations------------------
function show() {
  let overlay = document.querySelector(".overlay");
  overlay.classList.toggle("show");
}

function remove() {
  let overlay = document.querySelector(".overlay");
  overlay.classList.remove("show");
  userInfo.splice(0, 2);
  meterReading.splice(0, 2);
}
// ?-----------------------End Animations----------------

// *--------------------ARRAY----------------
const userInfo = [];
const meterReading = [];
let ratePerUnit;
let totalSum;
let vatCalc;
let amountSum;
let vatPercentage = 0.1925;

function resultAnalysis() {
  // ?-----------------Collect input from user---------------------
  userInfo.push(document.querySelector("#name").value);
  userInfo.push(document.querySelector("#date").value);
  meterReading.push(parseInt(document.querySelector("#prev-reading").value));
  meterReading.push(parseInt(document.querySelector("#new-reading").value));

  // ?-----------------set input----------------
  userName.textContent = userInfo[0];
  issueDate.textContent = userInfo[1];

  prevReading.textContent = `${meterReading[0]} kwh`;
  newReading.textContent = `${meterReading[1]} kwh`;

  setDate();
  calcResult();
}

function setDate() {
  let date = new Date(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();

  issueDate.innerHTML = `${year}<span>-</span>${month}<span>-</span>${day}`;
  billingDate.innerHTML = `${year}<span>-</span>${month}<span>-</span>${
    day - 8
  }`;
  dueDate.innerHTML = `${year}<span>-</span>${month}<span>-</span>${day + 10}`;
}

function calcResult() {
  let unitSum = meterReading[1] - meterReading[0];
  unit.innerHTML = unitSum;
  if (unitSum >= 109) {
    ratePerUnit = 79;
    totalSum = ratePerUnit * unitSum;
    vatCalc = vatPercentage * totalSum;
    vat.textContent = Math.floor(vatCalc);
    totalEnergy.textContent = `${totalSum.toLocaleString("es-US")} frs`;
    amountSum = totalSum + Math.floor(vatCalc);
    amount.textContent = `${amountSum.toLocaleString("es-US")} frs`;
    rate.textContent = `${ratePerUnit} frs`;
  } else if (unitSum <= 108) {
    ratePerUnit = 50;
    totalSum = ratePerUnit * unitSum;
    vat.textContent = "";
    totalEnergy.textContent = `${totalSum.toLocaleString("ta-IN")} frs`;
    amount.textContent = `${totalSum.toLocaleString("ta-IN")} frs`;
    rate.textContent = `${ratePerUnit} frs`;
  } else if (unitSum === null) {
    ratePerUnit = "";
    rate.textContent = `${ratePerUnit}`;
  }
}
