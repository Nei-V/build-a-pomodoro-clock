document.getElementById("timers1").reset(); //the input has to be in a form in order to represh the data
let breakSlider = document.getElementById("breakRange");
let breakValue = document.getElementById("breakStartValue");
let timeLeft = document.getElementById("showTimeLeft");


//breakValue.innerHTML=breakSlider.value; -not working in Firefox(doens't update on refresh page)
breakValue.innerHTML = breakSlider.value;
breakSlider.oninput = function () {
    breakValue.innerHTML = this.value;
};

let sessionSlider = document.getElementById("sessionRange");
let sessionValue = document.getElementById("sessionStartValue");
timeLeft.innerHTML = sessionSlider.value;

//sessionValue.innerHTML=sessionSlider.value;-not working in Firefox(doens't update on refresh page)
sessionValue.innerHTML = sessionSlider.value;
sessionSlider.oninput = function () {
    sessionValue.innerHTML = this.value;
    timeLeft.innerHTML = this.value;
    getTimerHoursAndMinutes(sessionValue.innerHTML, breakValue.innerHTML);
};



let sessionHours = 0;
let sessionMinutes = 0;
let breakHours = 0;
let breakMinutes = 0;
let sessionSeconds = 0;
let breakSeconds = 0;
let sessionOrBreak = true; //true for session, false for break
let counterWorking = false;

function getTimerHoursAndMinutes(sessionLength, breakLength, seconds) {

    if (sessionLength > 60) {
        sessionMinutes = sessionLength % 60;
        sessionHours = (sessionLength - sessionMinutes) / 60;
    }
    else {
        sessionMinutes = sessionLength;
        sessionHours = 0;
    };
    if (breakLength > 60) {
        breakMinutes = breakLength % 60;
        breakHours = (breakLength - breakMinutes) / 60;
    }
    else {
        breakMinutes = breakLength;
        breakHours = 0;
    };
    let sessionMinutesShow = String(sessionMinutes).padStart(2, "0");
    let sessionSecondsShow = String(sessionSeconds).padStart(2, "0");

    console.log(`session ${sessionHours}:${sessionMinutes}:${sessionSeconds} break ${breakHours}:${breakMinutes}:${breakSeconds}`)
    if (sessionHours > 0) {
        timeLeft.innerHTML = `${sessionHours}:${sessionMinutesShow}:${sessionSecondsShow}`;
    }
    else {
        timeLeft.innerHTML = `${sessionMinutesShow}:${sessionSecondsShow}`;
    }
};

function showTimeLeftEverySec(timeInSeconds) {
    let movingSeconds = timeInSeconds % 60;
    let movingMinutesTemp = (timeInSeconds - movingSeconds) / 60;
    let timeInMinutes = movingMinutesTemp % 60;
    let timeInHours = (movingMinutesTemp - timeInMinutes) / 60;
    let sessionMinutesShow = String(timeInMinutes).padStart(2, "0");
    let sessionSecondsShow = String(movingSeconds).padStart(2, "0");
    console.log(`session ${timeInHours}:${timeInMinutes}:${movingSeconds} break ${breakHours}:${breakMinutes}:${breakSeconds}`)
    if (timeInHours > 0) {
        timeLeft.innerHTML = `${timeInHours}:${sessionMinutesShow}:${sessionSecondsShow}`;
    }
    else {
        timeLeft.innerHTML = `${sessionMinutesShow}:${sessionSecondsShow}`;
    };

}

function startAndStop() {
    if (counterWorking) {
        counterWorking = false;
        breakSlider.disabled = false;
        sessionSlider.disabled = false;
        clearInterval(myVar);
    }
    else {
        counterWorking = true;
        breakSlider.disabled = true;
        sessionSlider.disabled = true;
    };
    console.log(`timer working:${counterWorking}`);
};

let myVar;
function calculateCountdown(minutes, seconds) {
    console.log("session time in calculate", minutes, "and seconds", seconds);
    let totalTimeInSeconds = 60 * minutes + seconds;
    console.log("in calculate - total seconds", totalTimeInSeconds);
    function countEverySecond() {
        totalTimeInSeconds = totalTimeInSeconds - 1;
        console.log("time left in sec: ", totalTimeInSeconds);
        showTimeLeftEverySec(totalTimeInSeconds);
    };
    if (counterWorking == true) {
        myVar = setInterval(countEverySecond, 1000);
        //getTimerHoursAndMinutes(totalTimeInSeconds);
    };
};

timeLeft.addEventListener("click", () => {
    console.log("Clicked");

    startAndStop();
    if (counterWorking == false) {


        getTimerHoursAndMinutes(sessionValue.innerHTML, breakValue.innerHTML, sessionSeconds);
    }
    else {
        console.log("should run countdown");
        calculateCountdown(sessionValue.innerHTML, sessionSeconds);
    };

});








