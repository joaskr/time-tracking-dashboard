const controlBtn = document.querySelectorAll(".control-btn");
const controlValueDisplay = document.querySelectorAll("#control-value");
let fetchedData;

//set control value - daily/weekly/monthly and save to local storage
let controlValue = localStorage.getItem("controlValue");
let currentBtn = document.getElementById(controlValue);
currentBtn.classList.add("active-btn");

if (!controlValue) {
  controlValue = "weekly";
  localStorage.setItem("controlValue", "weekly");
}

//add button handling - switching between modes
controlBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    currentBtn.classList.remove("active-btn");
    const btnValue = btn.innerHTML.toLowerCase();
    localStorage.setItem("controlValue", btnValue);
    currentBtn = document.getElementById(btnValue);
    currentBtn.classList.add("active-btn");
    modifyData(btnValue, fetchedData);
  });
});

//displays correct info based on control value
const setControlValueDisplay = (display, controlValue) => {
  switch (controlValue) {
    case "daily":
      display.innerText = "Day";
      break;
    case "weekly":
      display.innerText = "Week";
      break;
    default:
      display.innerText = "Month";
  }
};

const fetchData = (controlValue) => {
  fetch("./data.json")
    .then((response) => response.json())
    .then((json) => {
      fetchedData = json;
      modifyData(controlValue, fetchedData);
    });
};

const modifyData = (controlValue, data) => {
  controlValueDisplay.forEach((display) => {
    setControlValueDisplay(display, controlValue);
  });

  data.forEach((dataElem) => {
    const dataElemTitle = dataElem.title.toLowerCase();
    const dataElemCurrentValue = `${dataElem.timeframes[controlValue].current}hrs`;
    const dataElemPrevValue = `${dataElem.timeframes[controlValue].previous}hrs`;

    const currentTimeDisplay = document.getElementById(
      `current-${dataElemTitle}`
    );

    const previousTimeDisplay = document.getElementById(
      `previous-${dataElemTitle}`
    );

    currentTimeDisplay.innerHTML = dataElemCurrentValue;
    previousTimeDisplay.innerHTML = dataElemPrevValue;
  });
};

document.addEventListener("DOMContentLoaded", fetchData(controlValue));
