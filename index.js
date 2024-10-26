const addButton = document.querySelector("#add");
const minusButton = document.querySelector("#minus");
const count = document.querySelector(".number");
const hightestNumber = document.querySelector("#highest-number");
const yesterdayNumber = document.querySelector("#yesterday-number");
const clearButton = document.querySelector("#clear")


// This variable is used only to pass as parameter in countTraker function contructor and initalize todayCount
let todayCountNumber = (localStorage.getItem("number") != undefined) ? JSON.parse(localStorage.getItem("number")) : new countTracker(0);

let todayCount = new countTracker(todayCountNumber.number, todayCountNumber.date);

count.innerHTML = todayCount.number;

let highest = parseInt(localStorage.getItem("highest")) ? parseInt(localStorage.getItem("highest")) : 0;
hightestNumber.innerHTML = highest;

let yesterdayCount = (localStorage.getItem("yesterday") != undefined) ? JSON.parse(localStorage.getItem("yesterday")) : 0;

// Yesterday count updater

onload = () => {
    updateYesterdayCount();
};

function updateYesterdayCount() {
    if (dateCompare()) {
        saveNumber("yesterday", todayCount.number);
        yesterdayNumber.innerHTML = JSON.parse(localStorage.getItem("yesterday"));
        todayCount.number = 0;
        todayCount.date = new Date();
        saveNumber("number", JSON.stringify(todayCount));
        count.innerHTML = todayCount.number;
    } else if (isToday()) {
        yesterdayNumber.innerHTML = yesterdayCount;
    } else {
        yesterdayNumber.innerHTML = 0;
    }
}

// Event Listen to add to the count
addButton.addEventListener("click", addCount);

// Event Listen to minus to the count
minusButton.addEventListener("click", minusCount);

// Event Listen to clear localStorage and remain values 
clearButton.addEventListener("click", () => {
    localStorage.clear();
    todayCount.number = 0;
    highest = 0;
    count.innerHTML = todayCount.number;
    hightestNumber.innerHTML = highest;
});

// Function to add to the count
// This fuction will be called by addButton Event Listner
function addCount() {
    todayCount.number++;
    count.innerHTML = todayCount.number;
    saveNumber("number", JSON.stringify(todayCount)); // Adds the value to local storage

    // If true it updated the highest 
    if (isHighest()) {
        highest = todayCount.number;
        hightestNumber.innerHTML = highest;
        saveNumber("highest", highest);
    }
}

// Function to minus to the count
// This fuction will be called by minusButton Event Listner
function minusCount() {
    todayCount.number--;
    if (todayCount.number < 0) {
        alert("Count Cannot be negative.");
        todayCount.number = 0;
        return;
    }
    count.innerHTML = todayCount.number;
    saveNumber("number", JSON.stringify(todayCount)); // Adds the value to local storage
}

function isHighest() {
    if (todayCount.number > highest) {
        return true;
    }
    return false;
}


// This fuction runs when page is loaded and update count
function dateCompare() {
    let today = new Date();
    if (today.getDate() > todayCount.date.getDate()) {
        return true;
    }
    else if (today.getMonth() > todayCount.date.getMonth()) {
        return true;
    }
    else if (today.getFullYear() > todayCount.date.getFullYear()) {
        return true;
    }
    else {
        false;
    }
}

// This function compare if the date is the same
function isToday() {
    let today = new Date();
    if (today.getDate() === todayCount.date.getDate()) {
        return true;
    }
    else {
        return false;
    }
}

// Local Storage function
/**
@param {string} - Key for localStorage
@param {object} - value for localStorage
*/
function saveNumber(key, num) {
    localStorage.setItem(key, num)
}

// Number Tracker Contructor Function
/**
@param {number} - Number
@param {date} - Date 
@returns {object} - Count Traker Object
*/
function countTracker(number, date) {
    this.number = number;
    if (date === undefined) {
        this.date = new Date();
    } else {
        this.date = new Date(date);
    }
}