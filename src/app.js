const day = document.querySelector("#day-input");
const hour = document.querySelector("#hour-input");
const min = document.querySelector("#min-input");
const sec = document.querySelector("#sec-input");

const daySpan = document.querySelector("#day");
const hourSpan = document.querySelector("#hour");
const minSpan = document.querySelector("#min");
const secSpan = document.querySelector("#sec");
let flag = 0;
let formFlag = true;
let interval;

document.querySelector("#form").addEventListener("submit", function(e) {
    e.preventDefault();
    if (formFlag) {
        submitForm();
    }
});

const submitForm = function() {
    formFlag = false;
    const alertArry = document.querySelectorAll(".alert");
    alertArry.forEach(item => {
        item.remove();
    });
    daySpan.innerHTML = day.value ? day.value : 0;
    hourSpan.innerHTML = hour.value < 24 && hour.value ? hour.value : 0;
    minSpan.innerHTML = min.value < 60 && min.value ? min.value : 0;
    secSpan.innerHTML = sec.value < 60 && sec.value ? sec.value : 0;

    if (hour.value > 23) {
        alert("hour must be lower than 24");
    }
    if (min.value > 59) {
        alert("minute must be lower than 60");
    }
    if (sec.value > 59) {
        alert("second must be lower than 60");
    }

    day.value = "";
    hour.value = "";
    min.value = "";
    sec.value = "";
};

const countDown = function() {
    let secValue = secSpan.innerHTML;
    let minValue = minSpan.innerHTML;
    let hourValue = hourSpan.innerHTML;
    let dayValue = daySpan.innerHTML;
    if (secValue > 0) {
        secSpan.innerHTML = secValue - 1;
    } else if (secValue == 0 && minValue > 0) {
        secValue = 59;
        secSpan.innerHTML = secValue;
        minSpan.innerHTML = minValue - 1;
    } else if (secValue == 0 && minValue == 0 && hourValue > 0) {
        secSpan.innerHTML = 59;
        minSpan.innerHTML = 59;
        hourSpan.innerHTML = hourValue - 1;
    } else if (secValue == 0 && minValue == 0 && hourValue == 0 && dayValue > 0) {
        secSpan.innerHTML = 59;
        minSpan.innerHTML = 59;
        hourSpan.innerHTML = 23;
        daySpan.innerHTML = dayValue - 1;
    } else if (secValue == 0 && minValue == 0 && hourValue == 0 && dayValue == 0) {
        clearInterval(interval);
        flag = 0;
        formFlag = true;
    }
};

const startCount = function() {
    if (flag == 1) {
        interval = setInterval(countDown, 1000);
    }
};

document.querySelector("#start").addEventListener("click", function(e) {
    flag = flag + 1;
    startCount();
});

document.querySelector("#reset").addEventListener("click", function(e) {
    clearInterval(interval);
    flag = 0;
    formFlag = true;
    daySpan.innerHTML = 0;
    hourSpan.innerHTML = 0;
    minSpan.innerHTML = 0;
    secSpan.innerHTML = 0;
});

const alert = function(text) {
    formFlag = true;
    const alertContainer = document.querySelector("#alert-container");
    const alert = document.createElement("div");
    alert.setAttribute("class", "alert");
    const alertText = document.createElement("span");
    alertText.setAttribute("class", "alert-text");
    alertText.innerHTML = text;
    alert.appendChild(alertText);
    alertContainer.appendChild(alert);
    daySpan.innerHTML = 0;
    hourSpan.innerHTML = 0;
    minSpan.innerHTML = 0;
    secSpan.innerHTML = 0;
};
