const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsList = document.querySelector('.laps'); 

let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let intervalId = null;
let startTime = 0;

function updateDisplay() {
  // Same logic as before
  milliseconds++;
  if (milliseconds >= 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMins = minutes.toString().padStart(2, '0');
  const formattedSecs = seconds.toString().padStart(2, '0');
  const formattedMillis = milliseconds.toString().padStart(3, '0');

  display.textContent = `${formattedHours}:${formattedMins}:${formattedSecs}.${formattedMillis}`;

}


function startTimer() {
  startTime = Date.now(); 
  intervalId = setInterval(updateDisplay, 10);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  lapBtn.disabled = false;
}

function stopTimer() {
  clearInterval(intervalId); 
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = true;
}

function resetTimer() {
  clearInterval(intervalId);
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  display.textContent = '00:00:00.000';
  lapsList.innerHTML = ''; 
  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = true;
}

// Add event listeners for buttons
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
lapBtn.addEventListener('click', recordLap); 
resetBtn.addEventListener('click', resetTimer);

function recordLap() {
  const currentTime = display.textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap: ${currentTime}`;
  lapsList.appendChild(lapItem);
}
