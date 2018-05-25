
/*I've replicated the exact functionalty of the example, but I think the example has
a bug, as you can't change the session length if you pause during break time. I think
that it should be possible to change the session length in break like you can change the break
length in session */


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
let sessionOrBreak = false; //false for session, true for break
let counterWorking = false;
let tempTimerSeconds = 0;
let tempTimerMinutes = 0;
let tempTimerSecondsHelper = 0;
let paused=false;
let clockStarted = false;
let sessionSliderMoved = false;
let breakSliderMoved = "";
let tempSession = 0;//original time of sessions
let tempBreak = 0;//original time of breaks

function getTimerHoursAndMinutes(sessionLength, breakLength, seconds) {

    if (sessionLength > 60) {
        sessionMinutes = sessionLength % 60;
        sessionHours = (sessionLength - sessionMinutes) / 60;
    }
    else {
        sessionMinutes = sessionLength;
        sessionHours = 0;
    };
    tempSession = sessionLength * 60;

    if (breakLength > 60) {
        breakMinutes = breakLength % 60;
        breakHours = (breakLength - breakMinutes) / 60;
    }
    else {
        breakMinutes = breakLength;
        breakHours = 0;
    };
    tempBreak = breakLength * 60;

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
    timeLeft.innerHTML = `${timeInHours}:${sessionMinutesShow}:${sessionSecondsShow}`;
    timeLeft.innerHTML = `${sessionMinutesShow}:${sessionSecondsShow}`;
};

function showTimeLeftEverySecBreak(timeInSeconds) {
    let movingSeconds = timeInSeconds % 60;
    let movingMinutesTemp = (timeInSeconds - movingSeconds) / 60;
    let timeInMinutes = movingMinutesTemp % 60;
    let timeInHours = (movingMinutesTemp - timeInMinutes) / 60;
    let sessionMinutesShow = String(timeInMinutes).padStart(2, "0");
    let sessionSecondsShow = String(movingSeconds).padStart(2, "0");
    console.log(`session ${timeInHours}:${timeInMinutes}:${movingSeconds} break ${breakHours}:${breakMinutes}:${breakSeconds}`)
    timeLeft.innerHTML = `${timeInHours}:${sessionMinutesShow}:${sessionSecondsShow}`;
    timeLeft.innerHTML = `${sessionMinutesShow}:${sessionSecondsShow}`;
};

function startAndStop() {
    if (counterWorking) {

        if (sessionOrBreak == false) {
            breakSlider.disabled = false;
            sessionSlider.disabled = false;
            sessionSlider.addEventListener("click", () => {
                console.log("session slider moved in session");
                sessionSliderMoved = true;
            });
            breakSlider.addEventListener("click", () => {
                console.log("break slider moved in session");
            });
        }
        else {
            breakSlider.disabled = false;
            sessionSlider.disabled = true;
            breakSlider.addEventListener("click", () => {
                console.log("break slider moved in break");
            });
        };
        clearInterval(myVar);
        clearInterval(myVarBreak);
        counterWorking = false;
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
    console.log("NOW WORKING");
    console.log("session time in calculate", minutes, "and seconds", seconds);
    let totalTimeInSeconds = 60 * minutes + seconds;
    console.log("in calculate - total seconds", totalTimeInSeconds);
    function countEverySecond() {
        totalTimeInSeconds = totalTimeInSeconds - 1;
        console.log("time left in sec: ", totalTimeInSeconds);
        tempTimerSeconds = totalTimeInSeconds;
        tempTimerSecondsHelper = tempTimerSeconds % 60;
        tempTimerMinutes = (tempTimerSeconds - tempTimerSecondsHelper) / 60;
        console.log(`tempTimerSeconds is ${tempTimerSeconds}`);
        if (totalTimeInSeconds > -1) {
            showTimeLeftEverySec(totalTimeInSeconds);
           
            
        }
        else {
            clearInterval(myVar);
            calculateCountdownBreak(breakValue.innerHTML, sessionSeconds);
        };
    };
    if (counterWorking == true) {
        myVar = setInterval(countEverySecond, 1000);
        //getTimerHoursAndMinutes(totalTimeInSeconds);
    };
    sessionOrBreak = false;
};

let myVarBreak;
function calculateCountdownBreak(minutes, seconds) {
    console.log("NOW IN BREAK");
    console.log("session time in calculate", minutes, "and seconds", seconds);
    let totalTimeInSeconds = 60 * minutes + seconds;
    console.log("in calculate - total seconds", totalTimeInSeconds);
    function countEverySecond() {
        totalTimeInSeconds = totalTimeInSeconds - 1;
        console.log("time left in sec: ", totalTimeInSeconds);
        if (totalTimeInSeconds > -1) {
            showTimeLeftEverySec(totalTimeInSeconds);
        }
        else {
            clearInterval(myVarBreak);
            calculateCountdown(sessionValue.innerHTML, sessionSeconds);
        };
    };
    if (counterWorking == true) {
        myVarBreak = setInterval(countEverySecond, 1000);
        //getTimerHoursAndMinutes(totalTimeInSeconds);
    };
    sessionOrBreak = true;
};

timeLeft.addEventListener("click", () => {
    console.log("Clicked");
    startAndStop();
    if (counterWorking == false) {
        if (tempTimerSeconds==0){
        getTimerHoursAndMinutes(sessionValue.innerHTML, breakValue.innerHTML, sessionSeconds);
        }
        else{
            console.log("SECOND CLICK");
            console.log(`temp minutes:${tempTimerMinutes}`);
            getTimerHoursAndMinutes(tempTimerMinutes, breakValue.innerHTML, tempTimerSecondsHeler);
        };
    }
    else {
        console.log("should run countdown");
        //clockStarted = true;
        if (sessionSliderMoved == true) {
            calculateCountdown(sessionValue.innerHTML, sessionSeconds);
            sessionSliderMoved = false;
        }
        else {
            if(tempTimerSeconds==0){
                calculateCountdown(sessionValue.innerHTML, sessionSeconds);
            }
            else{
            calculateCountdown(tempTimerMinutes, tempTimerSecondsHelper);
          
            };
        };
        counterWorking = true;
    };
});

/*

if (clockStarted) {
    if (sessionOrBreak == true)
        sessionSlider.addEventListener("click", () => {
            if (counterWorking == true) {
                console.log("can't move during countdown");
            }
            else if ((counterWorking == false) && (sessionOrBreak == true)) {
                console.log("session time changed during pause");
                clockStarted = false;
                counterWorking = true;
            };
        });
    breakSlider.addEventListener("click", () => {
        if (counterWorking == true) {
            console.log("can't move during countdown");
        }
        else if ((counterWorking == false) && (sessionOrBreak == false)) {
            console.log("break time changed during pause");
            clockStarted = false;
            counterWorking = true;
        };

    });
};

*/


