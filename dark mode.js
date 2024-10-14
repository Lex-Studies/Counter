const modeBar = document.querySelector(".mode");
const modeButton = document.querySelector(".light");
const bodyBG = document.querySelector("body")
const darkAddButton = document.querySelector("#add");
const darkMinusButton = document.querySelector("#minus");
const addButtonSVG = document.querySelector("#add svg path");
const minusButtonSVG = document.querySelector("#minus svg rect");
const darkClearButton = document.querySelector("#clear");

let isClicked = localStorage.getItem("darkmode")==="false"?false:true;

window.addEventListener("load", (e) => {
    if (isClicked) {
        modeButton.click();
    }

})

modeButton.addEventListener("click", function () {
    isDarkMode();
    modeBar.classList.toggle("mode");
    modeBar.classList.toggle("mode-dark");
    modeButton.classList.toggle("dark-mode");
    bodyBG.classList.toggle("dark-mode-body");

    // Toggling dark mode on buttons
    darkAddButton.classList.toggle("btn-round");
    darkAddButton.classList.toggle("btn-round-dark");
    darkMinusButton.classList.toggle("btn-round");
    darkMinusButton.classList.toggle("btn-round-dark");
    // darkClearButton.classList.toggle("btn");
    darkClearButton.classList.toggle("btn-dark");

    if (addButtonSVG.getAttribute("fill") === "black") {
        addButtonSVG.setAttribute("fill", "white");
        minusButtonSVG.setAttribute("fill", "white");
    }
    else {
        addButtonSVG.setAttribute("fill", "black");
        minusButtonSVG.setAttribute("fill", "black");
    }
});

function isDarkMode() {
    if (!modeButton.classList.contains("dark-mode")) {
        isClicked = true;
    }
    else {
        isClicked = false;
    }
    localStorage.setItem("darkmode", isClicked);
}