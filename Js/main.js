/*function fetchWeatherForecast(city = '') {
    const cityInput = document.getElementById('city-input');
    if (city === '') {
        city = cityInput.value.trim();
    } else {
        cityInput.value = city;
    }

    if (city === '') {
        alert('Please enter a valid city.');
        return;
    }

    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=9f6383a63c25407799d121020231005&q=${(city)}&days=7&aqi=no&alerts=no`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const forecastDays = data.forecast.forecastday;
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = '';

            const currentDate = new Date();
            const currentDay = currentDate.getDate();

            forecastDays.forEach(day => {
                const date = new Date(day.date);
                const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

                const isCurrentDay = date.getDate() === currentDay;

                const forecastDay = `
                    <div class="forecast-day${isCurrentDay ? ' current-day' : ''}">
                        <h2>${weekday}</h2>
                        ${day.hour.map(hour => {
                    const hourDate = new Date(hour.time);
                    const hourHour = hourDate.getHours();
                    const hourDay = hourDate.getDate();

                    if (hourDay < currentDay || (hourDay === currentDay && hourHour < currentDate.getHours())) {
                        return ''; // Skip hours before the current hour and previous days' hours
                    }

                    const sportRecommendation = getSportRecommendation(hour.condition.text);

                    return `
                                <div class="forecast-hour">
                                    <div>${hour.time.substring(11, 16)}</div>
                                    <div>Temperature: ${hour.temp_c}°C</div>
                                    <div>Condition: ${hour.condition.text}</div>
                                    <div>Precipitation: ${hour.precip_mm} mm/h</div>
                                    <div>Wind Speed: ${(hour.wind_kph / 3.6).toFixed(2)} m/s</div>
                                    <div>Sport Recommendation: ${sportRecommendation}</div>
                                    <img class="weather-icon" src="https:${hour.condition.icon}" alt="${hour.condition.text}">
                                </div>
                            `;
                }).join('')}
                    </div>
                `;

                forecastContainer.insertAdjacentHTML('beforeend', forecastDay);
            });
        })
        .catch(error => {
            console.log(error);
            alert('Failed to fetch weather forecast.');
        });
}

function getSportRecommendation(condition, precipitation, windSpeed, temperature) {
    const lowerCaseCondition = condition.toLowerCase();

    if (lowerCaseCondition.includes('rain') && precipitation < 10 && windSpeed < 8 && temperature < 12) {
        return 'Kano in Laguna';
    } else if (lowerCaseCondition.includes('rain') && precipitation < 3 && windSpeed < 1 && temperature < 12) {
        return 'Kano near the beach';
    } else if (lowerCaseCondition.includes('rain') && precipitation < 3 && windSpeed < 8 && temperature < 10) {
        return 'Cycling';
    } else if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('blizzard')) {
        return 'Skiing, snowboarding, or building a snowman';
    } else if (lowerCaseCondition.includes('cloud')) {
        return 'Outdoor activities like hiking or jogging';
    } else if (lowerCaseCondition.includes('sunny') || lowerCaseCondition.includes('clear')) {
        return 'Beach activities, cycling, or picnics';
    } else {
        return 'Check the weather conditions for specific sports recommendations.';
    }
}

 */

function fetchWeatherForecast(city = '') {
    const cityInput = document.getElementById('city-input');
    if (city === '') {
        city = cityInput.value.trim();
    } else {
        cityInput.value = city;
    }

    if (city === '') {
        alert('Please enter a valid city.');
        return;
    }

    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=9f6383a63c25407799d121020231005&q=${encodeURIComponent(city)}&days=7&aqi=no&alerts=no`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const forecastDays = data.forecast.forecastday;
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = '';

            const currentDate = new Date();
            const currentDay = currentDate.getDate();

            forecastDays.forEach(day => {
                const date = new Date(day.date);
                const weekday = date.toLocaleDateString('en-US', {weekday: 'long'});

                const isCurrentDay = date.getDate() === currentDay;

                let averageCard = `
          <div class="forecast-day${isCurrentDay ? ' current-day' : ''}">
            <h2>${weekday}</h2>
            <div class="average-card">
              <h4>Average Weather:</h4>
              <div>Temperature: ${day.day.avgtemp_c}°C</div>
              <div>Condition: ${day.day.condition.text}</div>
              <div>Precipitation: ${day.day.totalprecip_mm} mm</div>
              <div>Wind Speed: ${(day.day.maxwind_kph / 3.6).toFixed(2)} m/s</div>
              <div>Sport Recommendation: ${getSportRecommendation(day.day.condition.text, day.day.totalprecip_mm, day.day.maxwind_kph, day.day.avgtemp_c)}</div>
              <img class="weather-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
        `;

                day.hour.forEach(hour => {
                    const hourDate = new Date(hour.time);
                    const hourHour = hourDate.getHours();
                    const hourDay = hourDate.getDate();

                    if (hourDay < currentDay || (hourDay === currentDay && hourHour < currentDate.getHours())) {
                        return; // Skip hours before the current hour and previous days' hours
                    }

                    const sportRecommendation = getSportRecommendation(hour.condition.text);

                    const forecastHour = `
            <div class="forecast-hour">
              <div>${hour.time.substring(11, 16)}</div>
              <div>Temperature: ${hour.temp_c}°C</div>
              <div>Condition: ${hour.condition.text}</div>
              <div>Precipitation: ${hour.precip_mm} mm/h</div>
              <div>Wind Speed: ${(hour.wind_kph / 3.6).toFixed(2)} m/s</div>
              <div>Sport Recommendation: ${sportRecommendation}</div>
              <img class="weather-icon" src="https:${hour.condition.icon}" alt="${hour.condition.text}">
            </div>
          `;

                    averageCard += forecastHour;
                });

                averageCard += `</div>`;
                forecastContainer.insertAdjacentHTML('beforeend', averageCard);
            });
        })
        .catch(error => {
            console.log(error);
            alert('Failed to fetch weather forecast.');
        });
    function getSportRecommendation(condition, precipitation, windSpeed, temperature) {
        const lowerCaseCondition = condition.toLowerCase();

        if (lowerCaseCondition.includes('rain') && precipitation < 10 && windSpeed < 8 && temperature < 12) {
            return 'Kano in Laguna';
        } else if (lowerCaseCondition.includes('rain') && precipitation < 3 && windSpeed < 1 && temperature < 12) {
            return 'Kano near the beach';
        } else if (lowerCaseCondition.includes('rain') && precipitation < 3 && windSpeed < 8 && temperature < 10) {
            return 'Cycling';
        } else if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('blizzard')) {
            return 'Skiing, snowboarding, or building a snowman';
        } else if (lowerCaseCondition.includes('cloud')) {
            return 'Outdoor activities like hiking or jogging';
        } else if (lowerCaseCondition.includes('sunny') || lowerCaseCondition.includes('clear')) {
            return 'Beach activities, cycling, or picnics';
        } else {
            return 'Check the weather conditions for specific sports recommendations.';
        }
    }
}