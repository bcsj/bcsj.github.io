const planTime = 60;
const turnOneTime = 60;
const turnTime = 30;
const changeText = document.querySelector("#change-text");
const timerElements = document.getElementsByClassName('timer')

let currentTime = 60;
let wasJustTapped = false; // track double taps to reset
let currentMode = 0 // 0=plan, 1=turnOne, 2+=turnTime
let isRunning = false;

function showTime(){
    const prefix = (currentTime < 0) ? "+" : "";
    const positiveTime = Math.abs(currentTime)
    const min = Math.floor(positiveTime / 60);
    const sec = positiveTime % 60;
    const spacer = (sec < 10) ? "0" : "";
    const currentTimeAsText = `${prefix}${min}:${spacer}${sec}`;
    changeText.textContent = currentTimeAsText;
    if ( currentTime <= 0 ) {
        document.body.style = "background: radial-gradient(#ffffff 50%, #ff0000 80%);";
    } else if ( currentTime <= 10 ) {
        document.body.style = "background: radial-gradient(#ffffff 50%, #ff9900 80%);";
    } else {
        document.body.style = "";
    }
}

function selectTime(){
    if (currentMode == 0){
        currentTime = planTime;
    } else if (currentMode == 1){
        currentTime = turnOneTime;
    } else {
        currentTime = turnTime;
    }
    showTime()
}

function startTimer(){
    if (!isRunning){            
        isRunning = true;
        setTimeout(advanceTimer, 1000);
    }
}

function advanceTimer(){
    if (isRunning) {
        wasJustTapped = false;
        currentTime -=1;
        showTime();
        setTimeout(advanceTimer, 1000);
    } else {
        showTime();
    }
}

function screenTap(){
    if (wasJustTapped){
        // If double tap, reset at planning and begin timer
        currentMode = 0
        selectTime();
        startTimer();
    } else {
        // If first tap, advance the turn (and prepare for possible double tap)
        wasJustTapped = true;
        currentMode+=1;
        selectTime();
        startTimer();
    }
}

function reset(){
    currentMode = 0;
    selectTime();
    isRunning = false;
}

function plan(){
    currentMode = 0
    selectTime();
    startTimer();
}

function turn(){
    currentMode = 2;
    selectTime();
    startTimer();
}
