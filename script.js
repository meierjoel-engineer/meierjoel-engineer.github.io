const weatherEl = document.getElementById('weather');
// Coordinates for your location:
const latitude  = 47.3769;   // Zürich lat 
const longitude =  8.5417;   // Zürich lon

// Build the Open-Meteo URL (no API key needed; free for non-commercial use)
const apiUrl = `https://api.open-meteo.com/v1/forecast`
             + `?latitude=${latitude}`
             + `&longitude=${longitude}`
             + `&current_weather=true`
             + `&timezone=auto`;   // auto-detect your local timezone

// Fetch today’s weather
async function fetchWeather() {
  try {
    const res  = await fetch(apiUrl);             // promise-based Fetch API :contentReference[oaicite:7]{index=7}
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();                // parse JSON body :contentReference[oaicite:8]{index=8}
    displayWeather(data.current_weather);
  } catch (err) {
    weatherEl.textContent = `Error: ${err.message}`;  // network or parsing error
  }
}

// Update the DOM with temperature and weather code
function displayWeather({ temperature, windspeed, weathercode }) {
  weatherEl.innerHTML = `
    <strong>${temperature}°C</strong><br>
    Wind: ${windspeed} km/h<br>
    Code: ${weathercode}
  `;
}

fetchWeather();

