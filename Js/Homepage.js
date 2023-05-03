var inputval = document.querySelector('#cityinput')
var button = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')
apik = "3045dd712ffe6e702e3245525ac7fa38"

function convertionTemp(temp)
{
    const celsius = (temp - 273).toFixed(2);
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
    return [celsius, icon];
}

function convertionWind(wind)
{
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
    return [speed, icon];
}

button.addEventListener('click', function()
{
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        inputval.value +
        '&appid=' +
        apik
    )
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik)
        .then(res => res.json())


        .then(data =>
        {
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var tempature = data['main']['temp']
            var wndspd = data['wind']['speed']
            city.innerHTML=`Weather of <span>${nameval}<span>`
            temp.innerHTML = `Temperature: <span> ${ convertionTemp(tempature)}°C</span>`
            description.innerHTML = `Sky Conditions: <span>${descrip}<span>`
            wind.innerHTML = `Wind Speed: <span>${convertionWind(wndspd)} m/s<span>`

        })

        .catch(err => alert('You entered wrong city name'))
})