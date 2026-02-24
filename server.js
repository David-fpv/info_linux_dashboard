const express = require("express");
const os = require("os"); 
const fs = require("fs/promises");

const app = express();
app.use(express.json());
app.use(express.static("public"));


// ########## FUNCTIONS ##########

async function getTemperature(tempPath = "/sys/class/thermal/thermal_zone0/temp") {
  try {
    const data = await fs.readFile(tempPath, { encoding: 'utf8' });
    const raw = Number(data.trim());
    if (!Number.isFinite(raw)) throw new Error("Invalid temperature value")
    return raw / 1000; // in °C
  } catch (err) {
    console.error("getTemperature error:", err.message);
    return null;
  }
}


function getUpSeconds() {
    return Math.floor(os.uptime());
}



// ########## API ##########

app.get("/api/temperature", async(request, response) => {
    const temperature_path = "/sys/class/thermal/thermal_zone4/temp";
    const temp = await getTemperature(temperature_path);
    // console.log(`Temperature ${temp}`);
    
    if (temp === null) {
        return response.status(503).json({
            error: "Temperature unavailable",
            details: `Could not read from ${temperature_path}`,
        });
    }

    response.send({ "temperature": temp });
});


app.get("/api/uptime", async(request, response) => {
    const uptime = getUpSeconds();
    // console.log(`Uptime: ${uptime}`);
    response.send({ "uptime": uptime });
});


app.get("/api", async(request, response) => {
    const temperature_path = "/sys/class/thermal/thermal_zone3/temp";
    const temp = await getTemperature(temperature_path);
    const uptime = getUpSeconds();

    response.send({ 
        "temperature": temp,
        "uptime": uptime 
    });
});


app.listen(3000, () => console.log("Server await connection on http://127.0.0.1:3000"));