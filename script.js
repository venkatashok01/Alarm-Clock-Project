const alarmForm = document.getElementById("alarm-form");
const alarmInput = document.getElementById("alarm");
const clearButton = document.getElementById("clear");
let alarmTimeout;

function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById("time").textContent = time;
  
  // If the alarm is set and it's time to sound it, play the alarm sound and clear the timeout
  if (alarmTimeout && now >= alarmTimeout) {
    playAlarm();
    clearAlarm();
  }
}

function setAlarm(event) {
  event.preventDefault();
  
  // Clear any existing alarm and set the new one
  clearAlarm();
  const alarmParts = alarmInput.value.split(":");
  const alarmTime = new Date();
  alarmTime.setHours(alarmParts[0], alarmParts[1], 0);
  alarmTimeout = alarmTime.getTime();
  
  // Log the alarm time and update the form buttons
  console.log(`Alarm set for ${alarmTime.toLocaleTimeString()}`);
  alarmInput.disabled = true;
  clearButton.disabled = false;
}

function clearAlarm() {
  // Clear the timeout and reset the form buttons
  clearTimeout(alarmTimeout);
  alarmTimeout = null;
  alarmInput.disabled = false;
  clearButton.disabled = true;
}

function playAlarm() {
  // Play the alarm sound
  const audio = new Audio("alarm.mp3");
  audio.play();
}

// Set up event listeners
alarmForm.addEventListener("submit", setAlarm);
clearButton.addEventListener("click", clearAlarm);

// Start the clock
updateTime();
setInterval(updateTime, 1000);
