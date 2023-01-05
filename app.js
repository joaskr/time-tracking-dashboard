const controlBtn = document.querySelectorAll(".control-btn");

let controlValue = localStorage.getItem("controlValue");

if (!controlValue) {
  controlValue = "weekly";
  localStorage.setItem("controlValue", "weekly");
}

controlBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    localStorage.setItem("controlValue", btn.innerHTML.toLowerCase());
  });
});
