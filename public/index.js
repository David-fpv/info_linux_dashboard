// Get temperature and uptime from API
async function getData() { 
    const response = await fetch("/api");
    const data = await response.json();
    console.log("Temperature: ", data.temperature);
    console.log("Uptime: ", data.uptime);

    UpdateHTML(data.temperature, data.uptime);
}

function secondToHumanTime(timeInSeconds) {
    seconds = timeInSeconds % 60;
    minutes = Math.floor(timeInSeconds / 60) % 60;
    hours = Math.floor(timeInSeconds / (60 * 60)); 
    days = Math.floor(timeInSeconds / (24 * 60 * 60));
    return {days, hours, minutes, seconds};
}

// Update html front end
function UpdateHTML(temperature_value, uptime_value) {
    const temperature_v = document.getElementById("temperature");
    temperature_v.innerText = temperature_value;

    const uptime_v = document.getElementById("uptime");
    const human_time = secondToHumanTime(uptime_value);
    uptime_v.innerText = `${human_time.seconds}s ${human_time.minutes}m ${human_time.hours}h ${human_time.days}d`;
}


setInterval(getData, 1000);