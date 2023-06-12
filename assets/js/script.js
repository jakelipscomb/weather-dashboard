const apiKey = "8170b86792ecbebbf83218aa8a028564";
var currentWeather = {};
var weatherForecast = {};
var city = "";
var state = "";
var icon = "";
var temp = "";
var wind = "";
var humid = "";
var location = [];

function fetchForecast() {
    const forecastApi="https://api.openweathermap.org/data/2.5/forecast?q=" + city + ", " + state + "&appid=" + apiKey + "&units=imperial";
    fetch(forecastApi)
    .then(function(response) {
        return response.json();
    })
}

function fetchWeather() {
    const weatherApi="https://api.openweathermap.org/data/2.5/weather?q=" + city + ", " + state + "&appid=" + apiKey + "&units=imperial";
    fetch(weatherApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        icon = data.weather[0].icon;
        temp = data.main.temp;
        wind = data.wind.speed;
        humid = data.main.humidity;
    })
    .then(function(data) {
        currentWeather();
        forecastWeather();
    })
}

function currentWeather() {
    const currentDay = dayjs().format("dddd, MMM D, YYYY");
    $("")
}

function forecastWeather() {
    const currentDay = dayjs().format("dddd, MMM D, YYYY");
    $("")
}