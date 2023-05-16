var inputval = document.querySelector('#cityinput')
var button = document.querySelector('#add');
var cityoutput = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')
var rain = document.querySelector('#rain')
apikey = "34b82a4511fc0df32f213df4fcf90db6"
// backup api key: 3045dd712ffe6e702e3245525ac7fa38

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


button.addEventListener('click', function GetInfo() {

    var cityName = document.getElementById("cityInput").value;



    fetch(`http://api.weatherapi.com/v1/forecast.json?key=9f6383a63c25407799d121020231005&q=${cityName}&days=7&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {

            //Getting the min and max values for each day
            for(i = 0; i<5; i++){
                document.getElementById("day" + (i + 1) + "Temp").innerHTML = "Temp: " + Number(forecast[i].day.avgtemp_c).toFixed(2)+ "°C";

                //Number(1.3450001).toFixed(2); // 1.35
            }




            //Getting Weather Icons
            for(i = 0; i<5; i++){
                document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
                    data.list[i].weather[0].icon
                    +".png";
            }
            //------------------------------------------------------------
            console.log(data)


        })

        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))

    function DefaultScreen(){
        document.getElementById("cityInput").defaultValue = "Kastrup";
        GetInfo();
    }


//Getting and displaying the text for the upcoming five days of the week
    var d = new Date();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
    function CheckDay(day){
        if(day + d.getDay() > 6){
            return day + d.getDay() - 7;
        }
        else{
            return day + d.getDay();
        }
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }



});









/*
button.addEventListener('click', function() {
    const city = inputval.value;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            //const {name,description,temperature,windSpeed,rainAmount,cloudsProcent } = data.daily;
            const name = data.name;
            const description = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;
            const rainAmount = data.rain && data.rain['1h'] || 0;


            cityoutput.innerHTML = `Weather of <span>${name}</span>`;
            descrip.innerHTML = `Sky Conditions: <span>${convertionDescription(description)}</span>`;
            temp.innerHTML = `Temperature: <span>${convertionTemp(temperature)} </span>`;
            wind.innerHTML = `Wind Speed: <span>${convertionWind(windSpeed)} </span>`;
            rain.innerHTML = `Amount of Rain: <span>${convertionRain(rainAmount)} </span>`;

        })
        .catch(err => alert('You entered a wrong city name'));

    function getForecast() {
        const cityName = inputval.value;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apikey}`)
            .then(res => res.json())
            .then(data => {
                for(i=0; i<5; i++){
                    document.getElementById("day" +(i+1)+ "temp").innerHTML = "temp:" + Number(data.list[i].main.temp).toFixed(2)
                }

            })
            .catch(err => alert("Wrong name"))
    }

    const d = new Date();
    const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    function CheckDay(day){
        if(day + d.getDay() > 6){
            return day +d.getDay()-7;
        }else{
            return day +d.getDay();
        }
    }

    for (i=0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }
        })
        .catch(err => console.log(err));
}, 'load', ()=>{ });

 */
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