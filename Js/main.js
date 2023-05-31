// Function to fetch and display weather forecast
function fetchWeatherForecast(city = '') {
    // Get the city input element
    const cityInput = document.getElementById('city-input');

    // If no city is provided, get the value from the input field
    if (city === '') {
        city = cityInput.value.trim();
    } else {
        // If city is provided, set the value of the input field
        cityInput.value = city;
    }

    // If the city is empty, show an alert and return
    if (city === '') {
        alert('Please enter a valid city.');
        return;
    }

    // Construct the API URL for fetching weather forecast
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=cc1bef9fceaf407fb1482827233105&q=${(city)}&days=7&aqi=no&alerts=no`;

    // Fetch the weather forecast from the API
    fetch(API_URL)
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            // Retrieve forecast days array
            const forecastDays = data.forecast.forecastday;

            // Get the forecast container element
            const forecastContainer = document.getElementById('forecast-container');

            // Clear the forecast container
            forecastContainer.innerHTML = '';

            // Get the current date and day
            const currentDate = new Date();
            const currentDay = currentDate.getDate();

            // Loop through each forecast day
            forecastDays.forEach(day => {
                // Convert the date string to a Date object
                const date = new Date(day.date);

                // Get the weekday name
                const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

                // Check if the current day is the same as the forecast day
                const isCurrentDay = date.getDate() === currentDay;

                // Create the HTML for the average weather card
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
                // Extract weather details for each hour of the forecast day
                const precipitation = day.day.totalprecip_mm;
                const windSpeed = day.day.maxwind_kph;
                const temperature = day.day.avgtemp_c;

                day.hour.forEach(hour => {
                    // Convert the hour string to a Date object
                    const hourDate = new Date(hour.time);
                    const hourHour = hourDate.getHours();
                    const hourDay = hourDate.getDate();

                    // Skip hours before the current hour for the current day
                    if (hourDay === currentDay && hourHour < currentDate.getHours()) {
                        return;
                    }

                    // Skip hours before 7 and after 21 for non-current days
                    if (hourDay !== currentDay && (hourHour < 7 || hourHour > 21)) {
                        return;
                    }

                    // Get the sport recommendation for the hour
                    const sportRecommendation = getSportRecommendation(
                        hour.condition.text,
                        hour.precip_mm,
                        hour.wind_kph,
                        hour.temp_c
                        );

                    // Create the HTML for the forecast hour
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
                    // Append the forecast hour HTML to the average card
                    averageCard += forecastHour;
                });

                // Close the average card HTML
                averageCard += '</div>';

                // Insert the average card HTML into the forecast container
                forecastContainer.insertAdjacentHTML('beforeend', averageCard);
            });
        })
        .catch(error => {
            // Log the error to the console
            console.error('Failed to fetch weather forecast:', error);

            // Show an alert indicating the failure to fetch the weather forecast
            alert('Failed to fetch weather forecast. Please try again later.');
        });
}

// Function to get sport recommendation based on weather conditions
function getSportRecommendation(condition, precipitation, windSpeed, temperature) {
    const lowerCaseCondition = condition.toLowerCase();
    // Define the list of weather conditions and corresponding sports
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

    // Filter the sports based on the provided condition
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


        // Map the filtered sports to a string with the sport name and an image
    return recommendedSports.map(sport => {
        // Join the sport recommendation strings together and return
        return `${sport.name} <img src="${sport.image}" style="width: 15px; height: 15px;" /> <br>`;
    }).join('');
}