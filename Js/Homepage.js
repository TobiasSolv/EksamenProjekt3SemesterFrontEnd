var inputval = document.querySelector('#cityinput')
var button = document.querySelector('#add');
var cityoutput = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')
var rain = document.querySelector('#rain')
var clouds = document.querySelector('#clouds')
apikey = "3045dd712ffe6e702e3245525ac7fa38"

function convertionTemp(temp) {
    const celsius = (temp).toFixed(2);
    let icon;
    if (celsius > 30) {
        icon = '<i class="fas fa-thermometer-full"></i>';
    } else if (celsius > 20) {
        icon = '<i class="fas fa-thermometer-three-quarters"></i>';
    } else if (celsius > 10) {
        icon = '<i class="fas fa-thermometer-half"></i>';
    } else if (celsius > 0) {
        icon = '<i class="fas fa-thermometer-quarter"></i>';
    } else {
        icon = '<i class="fas fa-thermometer-empty"></i>';
    }
    return [celsius, ' °C ', icon];
}

function convertionWind(wind) {
    const speed = (wind).toFixed(2);
    let icon;
    if (speed > 30) {
        icon = '<i class="fas fa-wind"></i>';
    } else if (speed > 20) {
        icon = '<i class="fas fa-wind"></i>';
    } else if (speed > 10) {
        icon = '<i class="fas fa-wind"></i>';
    } else if (speed > 5) {
        icon = '<i class="fas fa-wind"></i>';
    } else {
        icon = '<i class="fas fa-wind"></i>';
    }
    return [speed, ' m/s ', icon];
}

function convertionRain(rain) {
    const amount = (rain).toFixed(2);
    let icon;
    if (amount > 10) {
        icon = '<i class="fas fa-cloud-showers-heavy"></i>';
    } else if (amount > 5) {
        icon = '<i class="fas fa-cloud-rain"></i>';
    } else if (amount > 0) {
        icon = '<i class="fas fa-cloud-sun-rain"></i>';
    } else {

    }
    return [amount, ' m/hr ', icon,];
}

function convertionDescription(description) {
    const icons = {
        'clear sky': 'fas fa-sun',
        'few clouds': 'fas fa-cloud-sun',
        'scattered clouds': 'fas fa-cloud',
        'broken clouds': 'fas fa-cloud',
        'shower rain': 'fas fa-cloud-showers-heavy',
        'rain': 'fas fa-cloud-rain',
        'light rain': 'fas fa-cloud-rain',
        'thunderstorm': 'fas fa-bolt',
        'snow': 'fas fa-snowflake',
        'mist': 'fas fa-smog',
        'overcast clouds': 'fas fa-cloud',
    };

    const iconClass = icons[description.toLowerCase()] || 'fas fa-question';

    return `${description} &nbsp<i class="${iconClass}"></i> `;
}

function convertionClouds(clouds) {
    const coverage = clouds.all;
    let icon;
    if (coverage > 80) {
        icon = '<i class="fas fa-cloud"></i>';
    } else if (coverage > 60) {
        icon = '<i class="fas fa-cloud"></i>';
    } else if (coverage > 40) {
        icon = '<i class="fas fa-cloud"></i>';
    } else if (coverage > 20) {
        icon = '<i class="fas fa-cloud"></i>';
    } else {
        icon = '<i class="fas fa-cloud"></i>';
    }
    return [coverage, '% ', icon];
}

function getForecast(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apikey}`)
        .then(res => res.json())
        .then(data => {
            return data.list.map(item => ({
                date: new Date(item.dt * 1000).toLocaleDateString(),
                descrip: item.weather[0].description,
                tempature: item.main.temp,
                wind: item.wind.speed,
                rain: item.rain ? item.rain["3h"] : 0,
                clouds: item.clouds
            }));
        });
}

button.addEventListener('click', function() {
    const city = inputval.value;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            const name = data.name;
            const description = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;
            const rainAmount = data.rain && data.rain['1h'] || 0;
            const cloudsProcent = data.clouds;

            cityoutput.innerHTML = `Weather of <span>${name}</span>`;
            descrip.innerHTML = `Sky Conditions: <span>${convertionDescription(description)}</span>`;
            temp.innerHTML = `Temperature: <span>${convertionTemp(temperature)} </span>`;
            wind.innerHTML = `Wind Speed: <span>${convertionWind(windSpeed)} </span>`;
            rain.innerHTML = `Amount of Rain: <span>${convertionRain(rainAmount)} </span>`;
            clouds.innerHTML = `Cloud coverige: <span>${convertionClouds(cloudsProcent)} </span>`;
        })
        .catch(err => alert('You entered a wrong city name'));

    getForecast(forecastUrl)
        .then(data => {
            const forecastSection = document.querySelector('#forecast');
            forecastSection.innerHTML = '';

            data.forEach(item => {
                const date = item.date;
                const description = item.description;
                const temperature = item.temperature;
                const windSpeed = item.windSpeed;
                const rainAmount = item.rainAmount || 0;
                const cloudsProcent = data.clouds;

                const div = document.createElement('div');
                div.innerHTML = `
                    <p>Date: <span>${date}</span></p>
                    <p>Sky Conditions: <span>${convertionDescription(description)}</span></p>
                    <p>Temperature: <span>${convertionTemp(temperature)}°C</span></p>
                    <p>Wind Speed: <span>${convertionWind(windSpeed)} m/s</span></p>
                    <p>Amount of Rain: <span>${convertionRain(rainAmount)} mm/hr</span></p>
                    <p>Cloud coverige: <span>${convertionClouds(cloudsProcent)} </span></p>
                `;
                forecastSection.appendChild(div);
            });
        })
        .catch(err => console.log(err));
});
/*
button.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputval.value + '&appid=' + apikey)
        .then(res => res.json())


        .then(data => {
            var nameval = data['name']
            var descrip = data['weather']['0']['description'] // what the current weather is (sunny, cloudy and etc...)
            var tempature = data['main']['temp'] // current temperatur in °C
            var wndspd = data['wind']['speed'] // current wind speed in mm/s
            var rainamount = data['rain'] && data['rain']['1h'] // amount of rain in mm/hour
            city.innerHTML = `Weather of <span>${nameval}</span>`
            temp.innerHTML = `Temperature: <span> ${convertionTemp(tempature)}°C</span>`
            description.innerHTML = `Sky Conditions: <span>${descrip}</span>`
            wind.innerHTML = `Wind Speed: <span>${convertionWind(wndspd)} m/s</span>`
            rain.innerHTML = `Amount of Rain: <span>${rainamount || 0} mm/hr</span>`
        })

        .catch(err => alert('You entered wrong city name'))
})
 */