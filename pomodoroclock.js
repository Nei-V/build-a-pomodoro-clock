document.getElementById("timers1").reset(); //the input has to be in a form in order to represh the data
let breakSlider=document.getElementById("breakRange");
let breakValue=document.getElementById("breakStartValue");

//breakValue.innerHTML=breakSlider.value; -not working in Firefox(doens't update on refresh page)
breakValue.innerHTML=breakSlider.value;
breakSlider.oninput = function (){
    breakValue.innerHTML=this.value;
};

let sessionSlider=document.getElementById("sessionRange");
let sessionValue=document.getElementById("sessionStartValue");

//sessionValue.innerHTML=sessionSlider.value;-not working in Firefox(doens't update on refresh page)
sessionValue.innerHTML=sessionSlider.value;
sessionSlider.oninput = function (){
    sessionValue.innerHTML=this.value;
};

let timeLeft=document.getElementById("showTimeLeft");
timeLeft.innerHTML=sessionSlider.value;

let start=Date.now();
console.log(start);
    
