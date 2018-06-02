
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
    console.log("NOW WORKING");
    console.log("session time in calculate", minutes, "and seconds", seconds);
    let totalTimeInSeconds = 60 * minutes + seconds;
    console.log("in calculate session - total seconds", totalTimeInSeconds);
    function countEverySecond() {
        totalTimeInSeconds = totalTimeInSeconds - 1;
        console.log("session time left in sec: ", totalTimeInSeconds);
        tempTimerSeconds = totalTimeInSeconds;
        tempTimerSecondsHelper = tempTimerSeconds % 60;
        tempTimerMinutes = (tempTimerSeconds - tempTimerSecondsHelper) / 60;
        let objMiner=document.getElementById("miner");
    let marginLeftMiner=window.getComputedStyle(objMiner).marginLeft;
    let marginLeftMinerPx=marginLeftMiner.match(/\d+/);
        if (totalTimeInSeconds > -1) {
            showTimeLeftEverySec(totalTimeInSeconds);
            startTransitionRight(totalTimeInSeconds,marginLeftMinerPx);
           
        }
        else {
            clearInterval(myVar);
           
            calculateCountdownBreak(breakValue.innerHTML, sessionSeconds);
        };
    };
    if (counterWorking == true) {
        sessionOrBreak = false;
        
        myVar = setInterval(countEverySecond, 1000);
        
         };
};

let myVarBreak;
function calculateCountdownBreak(minutes, seconds) {
    console.log("NOW IN BREAK");
    console.log("break time in calculate", minutes, "and seconds", seconds);
    let totalTimeInSeconds = 60 * minutes + seconds;
    console.log("in calculate break - total seconds", totalTimeInSeconds);
    function countEverySecond() {
        totalTimeInSeconds = totalTimeInSeconds - 1;
        console.log("break time left in sec: ", totalTimeInSeconds);
        tempTimerSeconds = totalTimeInSeconds;
        tempTimerSecondsHelper = tempTimerSeconds % 60;
        tempTimerMinutes = (tempTimerSeconds - tempTimerSecondsHelper) / 60;

        if (totalTimeInSeconds > -1) {
            showTimeLeftEverySecBreak(totalTimeInSeconds);
        }
        else {
            clearInterval(myVarBreak);
            calculateCountdown(sessionValue.innerHTML, sessionSeconds);
        };
    };
    if (counterWorking == true) {
        sessionOrBreak = true;
        myVarBreak = setInterval(countEverySecond, 1000);
    };
};

timeLeft.addEventListener("click", () => {
       console.log("Clicked");
    console.log("session or break - false for session", sessionOrBreak);
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
            calculateCountdown(sessionValue.innerHTML, sessionSeconds);
            sessionSliderMoved = false;
        }
        else if (breakSliderMoved == true) {
            console.log("breakslider moved", breakSliderMoved);

            breakSliderMoved = false;
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


let marginRightRelaxing="400px";
function startTransitionRight(time,startPosition){
    console.log("total time ", time," startposition miner ",startPosition);
    //console.log("margin left miner in px", marginLeftMinerPx);
let speed=(350 - startPosition)/time;
let newPositionPx=+speed;
let newPosition=newPositionPx + "px";
document.getElementById("miner").style.marginLeft=newPosition;
  //document.getElementById("miner").classList.add("move-right");
    
};

function startTransitionLeft(){
    //document.getElementById("relaxing").classList.add("move-left");

};

function pauseTransitionRight(){
   
};

function pauseTransitionLeft(){

};

function endTransitionRight(){

};

function endTransitionLeft(){

};


