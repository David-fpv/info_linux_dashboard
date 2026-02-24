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
    hours = Math.floor(timeInSeconds / (60 * 60)) % 24; 
    days = Math.floor(timeInSeconds / (24 * 60 * 60));
    return {days, hours, minutes, seconds};
}

// Update html front end
function UpdateHTML(temperature_value, uptime_value) {
    const temperature_v = document.getElementById("temperature");
    temperature_v.innerText = temperature_value;
    updateTemperatureProgress(temperature_value)

    const uptime_v = document.getElementById("uptime");
    const human_time = secondToHumanTime(uptime_value);
    
    const seconds_text = human_time.seconds < 10 ? `0${human_time.seconds}s` : `${human_time.seconds}s`;
    const minutes_text = human_time.minutes < 10 ? `0${human_time.minutes}m` : `${human_time.minutes}m`;
    uptime_v.innerText = `${seconds_text} ${minutes_text} ${human_time.hours}h ${human_time.days}d`;
}


function updateTemperatureProgress(valueC, minC = 10, maxC = 130) {
    const progressEl = document.getElementById('tempProgressBar');
    if (!progressEl) return;

    const clamped = Math.min(Math.max(valueC, minC), maxC);

    const pct = ((clamped - minC) / (maxC - minC)) * 100;

    progressEl.style.width = `${pct}%`;

    progressEl.classList.remove('bg-primary','bg-success','bg-warning','bg-danger');
    if (valueC < 40) progressEl.classList.add('bg-info');
    else if (valueC < 80) progressEl.classList.add('bg-success');
    else if (valueC < 110) progressEl.classList.add('bg-warning');
    else progressEl.classList.add('bg-danger');
  }



setInterval(getData, 1000);