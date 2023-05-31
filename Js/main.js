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
                const weekday = date.toLocaleDateString('en-US', {weekday: 'long'});

                const isCurrentDay = date.getDate() === currentDay;

                let averageCard = `
          <div class="forecast-day${getSportRecommendation ? ' recommended' : ''}">
            <h2>${weekday} <br>  <div class="h2-date">${day.date} </div></h2>
           
            <div class="average-card">
              <h4>Average Weather</h4>
              <div>Temperature: ${day.day.avgtemp_c}°C</div>
              <div>Condition: ${day.day.condition.text}</div>
              <div>Precipitation: ${day.day.totalprecip_mm} mm/h</div>
              <div>Wind Speed: ${(day.day.maxwind_kph / 3.6).toFixed(2)} m/s</div>
              <img class="weather-icon" src="https:${day.day.condition.icon}">
            </div>
        `;

                const precipitation = day.day.totalprecip_mm;
                const windSpeed = day.day.maxwind_kph;
                const temperature = day.day.avgtemp_c;

                day.hour.forEach(hour => {
                    const hourDate = new Date(hour.time);
                    const hourHour = hourDate.getHours();
                    const hourDay = hourDate.getDate();

                    if (hourDay < currentDay ||
                        (hourDay === currentDay && hourHour < currentDate.getHours())
                        || hourDay !== currentDay && (hourHour < 7 || hourHour > 21)) {
                        return; // Skip hours before the current hour and previous days' hours
                    }

                    const sportRecommendation = getSportRecommendation(hour.condition.text, hour.precip_mm, hour.wind_kph, hour.temp_c);
                    const isRecommended = sportRecommendation.length > 0;
                    const isNotRecommended =
                        precipitation >= 10 &&
                        windSpeed / 3.6 >= 10 &&
                        temperature <= 5;

                    const forecastHour = `
           <div class="forecast-hour" ${getSportRecommendation ? ' not-recommended' : ''}>
              <div>Kl: ${hour.time.substring(11, 16)}</div>
              <div>Temperature: ${hour.temp_c}°C</div>
              <div>Condition: ${hour.condition.text} </div>
              <div>Precipitation: ${hour.precip_mm} mm/h</div>
              <div>Wind Speed: ${(hour.wind_kph / 3.6).toFixed(2)} m/s</div>
              <div class="sport-recommend">Sport Recommendation: <br> ${sportRecommendation}</div>
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
}

function getSportRecommendation(condition, precipitation, windSpeed, temperature) {
    const lowerCaseCondition = condition.toLowerCase();
    const weatherCondition =
        lowerCaseCondition.includes('rain') ||
        lowerCaseCondition.includes('sunny') ||
        lowerCaseCondition.includes('partly cloudy') ||
        lowerCaseCondition.includes('patchy rain possible') ||
        lowerCaseCondition.includes('cloudy') ||
        lowerCaseCondition.includes('mist') ||
        lowerCaseCondition.includes('overcast')||
        lowerCaseCondition.includes('light drizzle') ||
        lowerCaseCondition.includes('patchy light drizzle') ||
        lowerCaseCondition.includes('thundery outbreaks possible') ||
        lowerCaseCondition.includes('moderate or heavy rain with thunder')
    ;

    const sportsDataRec = [
        { name: 'Kano in laguna', image: 'Picture/happy smiley.jpg', precipitation: 8, windSpeed: 7, temperature: 9 },
        { name: 'Kano near the beach', image: 'Picture/happy smiley.jpg', precipitation: 6, windSpeed: 6, temperature: 8 },
        { name: 'Cycling', image: 'Picture/happy smiley.jpg', precipitation: 5, windSpeed: 8, temperature: 8 },
        { name: 'Climbing indoors', image: 'Picture/happy smiley.jpg', precipitation: 100, windSpeed: 100, temperature: -100 },
        { name: 'Climbing outdoors', image: 'Picture/happy smiley.jpg', precipitation: 4, windSpeed: 4, temperature: 11 },
        { name: 'Tennis indoors', image: 'Picture/happy smiley.jpg', precipitation: 100, windSpeed: 100, temperature: -100 },
        { name: 'Tennis outdoors', image: 'Picture/happy smiley.jpg', precipitation: 6, windSpeed: 6, temperature: 11 },
        { name: 'Paddleboard in laguna', image: 'Picture/happy smiley.jpg', precipitation: 8, windSpeed: 7, temperature: 9 },
        { name: 'Paddleboard near the beach', image: 'Picture/happy smiley.jpg', precipitation: 6, windSpeed: 6, temperature: 8 },
        { name: 'Jetski', image: 'Picture/happy smiley.jpg', precipitation: 8, windSpeed: 5, temperature: 11, },
        { name: 'Windsurfing', image: 'Picture/happy smiley.jpg', precipitation: 8, windSpeed: 6, temperature: 11 }
    ];

    const sportsDataNotRec = [
        { name: 'Kano in laguna', image: 'Picture/unhappy smiley.jpg', precip: 8, windSpe: 7, temp: 9},
        { name: 'Kano near the beach', image: 'Picture/unhappy smiley.jpg', precip: 6, windSpe: 6, temp: 8 },
        { name: 'Cycling', image: 'Picture/unhappy smiley.jpg', precip: 5, windSpe: 8, temp: 8 },
        { name: 'Climbing outdoors', image: 'Picture/unhappy smiley.jpg', precip: 4, windSpe: 4, temp: 11 },
        { name: 'Tennis outdoors', image: 'Picture/unhappy smiley.jpg', precip: 6, windSpe: 6, temp: 11 },
        { name: 'Paddleboard in laguna', image: 'Picture/unhappy smiley.jpg', precip: 8, windSpe: 7, temp: 9 },
        { name: 'Paddleboard near the beach', image: 'Picture/unhappy smiley.jpg', precip: 6, windSpe: 6, temp: 8 },
        { name: 'Jetski', image: 'Picture/unhappy smiley.jpg', precip: 8, windSpe: 5, temp: 11 },
        { name: 'Windsurfing', image: 'Picture/unhappy smiley.jpg', precip: 8, windSpe: 6, temp: 11 }
    ]

    const sportsData = [...sportsDataRec, ...sportsDataNotRec];

    let recommendedSports = sportsData.filter(sport => {
        if (weatherCondition &&
            precipitation <= sport.precipitation &&
            windSpeed / 3.6 <= sport.windSpeed &&
            temperature >= sport.temperature)
        {
            return true;
        }

        return weatherCondition &&
            precipitation > sport.precip ||
            windSpeed / 3.6 > sport.windSpe ||
            temperature < sport.temp;
    });



    return recommendedSports.map(sport => {

        return `${sport.name} <img src="${sport.image}" style="width: 15px; height: 15px;" /> <br>`;
    }).join('');
}