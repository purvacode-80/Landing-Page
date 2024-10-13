function startTimer() {
    const now = new Date();
    let endTime = localStorage.getItem("endTime");

    // If no end time is saved, set a new one for today at 11:59:59 PM
    if (!endTime) {
        const tomorrow = new Date();
        tomorrow.setHours(23, 59, 59, 999); // Set to today's 11:59 PM
        endTime = tomorrow.getTime(); // Get the timestamp
        localStorage.setItem("endTime", endTime); // Save it to local storage
    }

    const diff = endTime - now; // Time difference in milliseconds

    if (diff <= 0) {
        // Reset the timer for the next day if time runs out
        localStorage.removeItem("endTime");
        return startTimer();
    }

    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000)) / 1000);

    document.getElementById("timer").innerHTML = `${hours}h ${minutes}m ${seconds}s`;

    // Repeat every second
    setTimeout(startTimer, 1000);
}

// Start the timer as soon as the page loads
window.onload = startTimer;
