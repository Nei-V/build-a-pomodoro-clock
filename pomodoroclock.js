
/*I've replicated the exact functionalty of the example - the legacy challenge - You can't change the session length if you pause during break time. I think
the break
*/


document.getElementById("timers1").reset(); //the input has to be in a form in order to refresh the data
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
let sessionOrBreak = false; //FALSE for SESSION, true for break
let counterWorking = false;
let tempTimerSeconds = 0;
let tempTimerMinutes = 0;
let tempTimerSecondsHelper = 0;
let paused = false;
let clockStarted = false;
let sessionSliderMoved = false;
let breakSliderMoved = false;
let tempSession = 0;//original time of sessions
let tempBreak = 0;//original time of breaks
let speedRight = 0;
let speedLeft = 0;

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
    console.log(`in session: session ${timeInHours}:${timeInMinutes}:${movingSeconds} break ${breakHours}:${breakMinutes}:${breakSeconds}`)
    timeLeft.innerHTML = `${timeInHours}:${sessionMinutesShow}:${sessionSecondsShow}`;
};

function showTimeLeftEverySecBreak(timeInSeconds) {
    let movingSeconds = timeInSeconds % 60;
    let movingMinutesTemp = (timeInSeconds - movingSeconds) / 60;
    let timeInMinutes = movingMinutesTemp % 60;
    let timeInHours = (movingMinutesTemp - timeInMinutes) / 60;
    let breakMinutesShow = String(timeInMinutes).padStart(2, "0");
    let breakSecondsShow = String(movingSeconds).padStart(2, "0");
    console.log(`in break: break ${timeInHours}:${timeInMinutes}:${movingSeconds} session ${sessionHours}:${sessionMinutes}:${sessionSeconds}`)
    timeLeft.innerHTML = `${timeInHours}:${breakMinutesShow}:${breakSecondsShow}`;
};

function startAndStop() {
    console.log("counter working in startAndStop", counterWorking);
    if (counterWorking) {
        if (sessionOrBreak == false) {
            breakSlider.disabled = false;
            sessionSlider.disabled = false;
            sessionSlider.addEventListener("click", () => {
                console.log("session slider moved in session");
                sessionSliderMoved = true;
            });
        }
        else {
            console.log("in session if false", sessionOrBreak);
            breakSlider.disabled = false;
            sessionSlider.disabled = true;
        };

        breakSlider.addEventListener("click", () => {
            if (sessionOrBreak == false) {
                console.log("in session if false - while moving break slider in session", sessionOrBreak);
                console.log("break slider moved in session");
            }
            else {
                console.log("in session if false - while moving break slider in break", sessionOrBreak);
                console.log("break slider moved in break");

                getTimerHoursAndMinutes(sessionValue.innerHTML, breakValue.innerHTML, sessionSeconds);
                breakSliderMoved = true;
            };
        });
        clearInterval(myVar);
        clearInterval(myVarBreak);
        pauseTransitionRight();
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
    document.getElementById("message").innerHTML="Keep working...There's a drink at the end of the tunnel!";
    console.log("NOW WORKING");
    document.getElementById("miner").style.zIndex = "100";
    document.getElementById("glass").style.zIndex = "100";
    console.log("session time in calculate", minutes, "and seconds", seconds);
    let totalTimeInSeconds = 60 * minutes + seconds;
    console.log("in calculate session - total seconds", totalTimeInSeconds);
    let objMiner = document.getElementById("miner");
    let marginLeftMiner = window.getComputedStyle(objMiner).marginLeft;
    console.log(` marginLeftMiner is ${marginLeftMiner}`);
    let marginLeftMinerPx = marginLeftMiner.slice(0, (marginLeftMiner.length - 2));
    console.log(`marginLeftMinerPx is ${marginLeftMinerPx}`);
    let marginLeftMinerNumber = parseFloat(marginLeftMinerPx);
    console.log(`marginLeftMinerNumber ${marginLeftMinerNumber}`);
    startTransitionRight(totalTimeInSeconds, marginLeftMinerNumber);
    let newPositionPx = marginLeftMinerNumber;
    function countEverySecond() {
        totalTimeInSeconds = totalTimeInSeconds - 1;
        console.log("session time left in sec: ", totalTimeInSeconds);
        tempTimerSeconds = totalTimeInSeconds;
        tempTimerSecondsHelper = tempTimerSeconds % 60;
        tempTimerMinutes = (tempTimerSeconds - tempTimerSecondsHelper) / 60;
        console.log(`newPositionPx ${newPositionPx}`);
        newPositionPx = newPositionPx + speedRight;
        console.log(`newPositionPx ${newPositionPx}`);
        let newPosition = newPositionPx + "px";
        document.getElementById("miner").style.marginLeft = newPosition;
       
        if (totalTimeInSeconds > -1) {
            showTimeLeftEverySec(totalTimeInSeconds);
        }
        else {
            clearInterval(myVar);
            document.getElementById("miner").style.zIndex = "-100";
            document.getElementById("glass").style.zIndex = "-100";
            calculateCountdownBreak(breakValue.innerHTML, sessionSeconds);
            document.getElementById("miner").style.marginLeft="0px";
        };
    };
    if (counterWorking == true) {
        sessionOrBreak = false;
        myVar = setInterval(countEverySecond, 1000);
    };
};

let myVarBreak;
function calculateCountdownBreak(minutes, seconds) {
    document.getElementById("message").innerHTML="Enjoy your break!";
    console.log("NOW IN BREAK");
    console.log("break time in calculate", minutes, "and seconds", seconds);
    document.getElementById("relaxing").style.zIndex = "100";
    let totalTimeInSeconds = 60 * minutes + seconds;
    console.log("in calculate break - total seconds", totalTimeInSeconds);
    let objRelaxing = document.getElementById("relaxing");
    let widthRightRelaxing = window.getComputedStyle(objRelaxing).width;
    console.log(` marginRightRelaxing is ${widthRightRelaxing}`);
    let widthRightRelaxingPx = widthRightRelaxing.slice(0, (widthRightRelaxing.length - 2));
    console.log(`marginRightRelaxingPx is ${widthRightRelaxingPx}`);
    let widthRightRelaxingNumber = parseFloat(widthRightRelaxingPx);
    console.log(`marginRightRelaxingNumber ${widthRightRelaxingNumber}`);
    startTransitionLeft(totalTimeInSeconds, widthRightRelaxingNumber);
    let newPositionRelaxingPx = widthRightRelaxingNumber;
    function countEverySecond() {
        totalTimeInSeconds = totalTimeInSeconds - 1;
        console.log("break time left in sec: ", totalTimeInSeconds);
        tempTimerSeconds = totalTimeInSeconds;
        tempTimerSecondsHelper = tempTimerSeconds % 60;
        tempTimerMinutes = (tempTimerSeconds - tempTimerSecondsHelper) / 60;
        console.log(`newPositionRelaxingPx ${newPositionRelaxingPx}`);
        newPositionRelaxingPx = newPositionRelaxingPx - speedLeft;
        console.log(`newPositionRelaxingPx ${newPositionRelaxingPx}`);
        let newPositionRelaxing = newPositionRelaxingPx + "px";
        document.getElementById("relaxing").style.width = newPositionRelaxing;

        if (totalTimeInSeconds > -1) {
            showTimeLeftEverySecBreak(totalTimeInSeconds);
        }
        else {
            clearInterval(myVarBreak);
            document.getElementById("relaxing").style.zIndex = "-100";
            calculateCountdown(sessionValue.innerHTML, sessionSeconds);
            document.getElementById("relaxing").style.width="400px";
        };
    };
    if (counterWorking == true) {
        sessionOrBreak = true;
        myVarBreak = setInterval(countEverySecond, 1000);
    };
};

timeLeft.addEventListener("click", () => {
    console.log("Clicked");
    console.log("session or break - FALSE for SESSION", sessionOrBreak);
    startAndStop();
    if (counterWorking == false) {
        if (tempTimerSeconds == 0) {
            getTimerHoursAndMinutes(sessionValue.innerHTML, breakValue.innerHTML, sessionSeconds);
        };
    }
    else {
        console.log("should run countdown - counterworling is true");

        if (sessionSliderMoved == true) {
            console.log("sessionslider moved", sessionSliderMoved);
            document.getElementById("miner").style.marginLeft="0px";
            calculateCountdown(sessionValue.innerHTML, sessionSeconds);
            sessionSliderMoved = false;
        }
        else if (breakSliderMoved == true) {
            console.log("breakslider moved", breakSliderMoved);
            breakSliderMoved = false;
            document.getElementById("relaxing").style.width="400px";
            calculateCountdownBreak(breakValue.innerHTML, sessionSeconds);

        }
        else if ((sessionOrBreak == true) && (breakSliderMoved == false)) {
            breakSliderMoved = false;           
            calculateCountdownBreak(tempTimerMinutes, tempTimerSecondsHelper);
        }
        else {
            if (tempTimerSeconds == 0) {
                getTimerHoursAndMinutes(sessionValue.innerHTML, breakValue.innerHTML, sessionSeconds);
                calculateCountdown(sessionValue.innerHTML, sessionSeconds);
            }
            else {
                calculateCountdown(tempTimerMinutes, tempTimerSecondsHelper);
            };
        };
        counterWorking = true;
    };
});

//let marginRightRelaxing = "400px";
function startTransitionRight(time, startPosition) {
    console.log("total time ", time, " startposition miner ", startPosition);
    speedRight = (300 - startPosition) / time;
    console.log("speed", speedRight);
};

function startTransitionLeft(time, startPosition) {
   console.log(`total time ${time} startposition relaxing ${startPosition}`);
   speedLeft = (350 - (400 - startPosition)) / time;
   console.log("speed", speedLeft);
};



