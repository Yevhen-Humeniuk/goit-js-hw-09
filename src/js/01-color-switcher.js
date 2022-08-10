const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');
// 
btnStopRef.setAttribute("disabled", true);

// 
btnStartRef.addEventListener('click', onBtnStartClk);
btnStopRef.addEventListener('click', onBtnStopClk);
// 
const data = {
    intervalId: 0,
    clearBackground: "#FFFFFF"
}

function onBtnStartClk() {
    btnStartRef.setAttribute("disabled", true);
    btnStopRef.removeAttribute("disabled");

    data.intervalId = setInterval(intervalFunction, 1000);
}
// 
function onBtnStopClk() {
    btnStopRef.setAttribute("disabled", true);
    btnStartRef.removeAttribute("disabled");

    clearInterval(data.intervalId);
    document.body.style.backgroundColor = data.clearBackground;
}
// 
function intervalFunction() {
    document.body.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6)}`;
}