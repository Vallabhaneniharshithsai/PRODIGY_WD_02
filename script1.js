// Get HTML elements
let display = document.getElementById("display");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let lapButton = document.getElementById("lap");
let lapTimesList = document.getElementById("lap-times");

// Variables to track time and state
let startTime = 0;
let elapsedTime = 0;
let interval;
let isRunning = false;
let lapCount = 0;

// Start the stopwatch
startButton.addEventListener("click", function () {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateDisplay, 1000); // Update every second
        isRunning = true;
    }
});

// Pause the stopwatch
pauseButton.addEventListener("click", function () {
    if (isRunning) {
        clearInterval(interval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
});

// Reset the stopwatch
resetButton.addEventListener("click", function () {
    clearInterval(interval);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    isRunning = false;
    lapTimesList.innerHTML = '';
    lapCount = 0;
});

// Track lap times
lapButton.addEventListener("click", function () {
    if (isRunning) {
        lapCount++;
        const lapTime = formatTime(Date.now() - startTime);
        const li = document.createElement("li");
        li.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapTimesList.appendChild(li);
    }
});

// Update display every second
function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Format time as HH:MM:SS
function formatTime(time) {
    let totalSeconds = Math.floor(time / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Pad single digits with leading zero
function pad(unit) {
    return unit < 10 ? "0" + unit : unit;
}
