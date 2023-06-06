const apiKey = "8170b86792ecbebbf83218aa8a028564";
var currentWeather = {};
var weatherForecast = {};
var long;
var lat;

function getCityLocation() {
    const api="http://api.openweathermap.org/geo/1.0/direct?q=${search},US&limit={limit}&appid=${apiKey}"
    const getLocation= fetch(api)
    return getLocation 
}


function getForecast() {
    const api="https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric"
    const getForecastInfo= fetch(api)
    return getForecastInfo
}

function getWeather() {
    const api="https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric"
    const getWeatherInfo= fetch(api)
    return getWeatherInfo
}