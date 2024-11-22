const apiKey = "fae6fe8d46584a8a80f6939b6f8c08b9"; // Replace with your API key
const weatherInfo = document.getElementById("weatherInfo");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

// Fetch Weather Data
async function fetchWeather(city) {
    console.log(city)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found!");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  }
}

// Display Weather Data
function displayWeather(data) {
  const { name, weather, main } = data;
  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>${weather[0].description}</p>
    <h3>${main.temp}°C</h3>
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">
  `;
}

// Search Button Click Event
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
  else weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
});

// Search on Enter Key
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});
