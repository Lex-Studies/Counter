const addButton = document.querySelector("#add");
const minusButton = document.querySelector("#minus");
const count = document.querySelector(".number");
const hightestNumber = document.querySelector("#highest-number");
const clearButton = document.querySelector("#clear")

let number = parseInt(localStorage.getItem("number")) ? parseInt(localStorage.getItem("number")) : 0;
count.innerHTML = number;

let highest = parseInt(localStorage.getItem("highest")) ? parseInt(localStorage.getItem("highest")) : 0;
hightestNumber.innerHTML = highest;

addButton.addEventListener("click", addCount);
minusButton.addEventListener("click", minusCount);
clearButton.addEventListener("click", () => {
    localStorage.clear();
    number = 0;
    highest = 0;
    count.innerHTML = number;
    hightestNumber.innerHTML = highest;
});


function addCount() {
    number++;
    count.innerHTML = number;
    saveNumber("number", number);
    if (isHighest()) {
        highest = number;
        hightestNumber.innerHTML = highest;
        saveNumber("highest", number);
    }
}

function minusCount() {
    number--;
    if (number < 0) {
        alert("Count Cannot be negative.");
        number = 0;
        return;
    }
    count.innerHTML = number;
    saveNumber("number", number);
}

function isHighest() {
    if (number > highest) {
        return true;
    }
    return false;
}

// Local Storage function
/**
@param {string} - Key for localStorage
@param {number} - value for localStorage
*/
function saveNumber(key, num) {
    localStorage.setItem(key, num)
}