
const forecastContainer = document.querySelector('.weather-hour .hour-row');

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById("add");

    button.addEventListener('click', function getWeather() {
        const cityName = document.getElementById("cityInput").value;
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=9f6383a63c25407799d121020231005&q=${cityName}&days=7&aqi=no&alerts=no`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const forecastDay = data.forecast.forecastday[0];
                const hourlyForecast = forecastDay.hour;
                const daySections = document.querySelectorAll('[data-hour-section] .weather-hour');

                hourlyForecast.forEach((hour, index) => {
                    const daySection = daySections[index];
                    const time = hour.time;
                    const temperature = hour.temp_c;
                    const windSpeed = hour.wind_kph;
                    const rain = hour.precip_mm;

                    daySection.querySelector('.label').textContent = time;
                    daySection.querySelector('.weather-icon').src = hour.condition.icon;
                    daySection.querySelector('.data-for-day' + (index + 1)).innerHTML = `
                        <span>kl. ${time}</span>
                        <span>Temperatur: ${temperature} C</span>
                        <span>Wind speed: ${windSpeed} m/s</span>
                        <span>Rain: ${rain} mm/hr</span>
                    `;
                });
            })
            .catch(error => {
                forecastContainer.innerHTML = "Error: " + error;
            });

    })
});






/*
const forecastContainer = document.getElementById("forecast-container");

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById("add");

button.addEventListener('click', function getWeather(){
    const cityName = document.getElementById("cityInput").value
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=9f6383a63c25407799d121020231005&q=${cityName}&days=7&aqi=no&alerts=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecastDay = data.forecast.forecastday[0];
            const hourlyForecast = forecastDay.hour;
            let forecastHTML = "<ul>";
            hourlyForecast.forEach(hour => {
                forecastHTML += `
        <li>
          <strong>Time:</strong> ${hour.time}<br>
          <strong>Temperature:</strong> ${hour.temp_c}°C<br>
          <strong>Condition:</strong> ${hour.condition.text}<br>
          <img src="${hour.condition.icon}" alt="${hour.condition.text}">
          <hr>
        </li>
      `;
            });
            forecastHTML += "</ul>";
            forecastContainer.innerHTML = forecastHTML;
        })
        .catch(error => {
            forecastContainer.innerHTML = "Error: " + error;
        });

})
})



 */