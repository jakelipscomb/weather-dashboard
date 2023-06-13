const apikey = "8170b86792ecbebbf83218aa8a028564";
const today = dayjs();
var cityInput = $("#city-input");
var searchButton = $("#search-btn");
var clearButton = $("#clear-btn");
var city = "";
var ico = "";
var tem = "";
var feel = "";
var win = "";
var hum = "";
var locations = [];

buildForecastCards();

function fetchWeather() {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apikey + "&units=imperial";
    fetch(requestURL)
    .then(function(response) {
        if (response.status === 404) {
            console.log("404");
            return;
        } else {
            return response.json();
        }
    })
    .then(function(data) {
        ico = data.weather[0].icon;
        tem = data.main.temp;
        feel = data.main.feels_like;
        win = data.wind.speed;
        hum = data.main.humidity;
        popCurrent();
        popForecast();
        buildForecastCards();
    })
    // .catch(function(error) {
    //     console.log(error);
    // });
}

function popCurrent() {
    var currentDate = today.format("dddd, MMM D, YYYY");
    $("#current-city").text(city + " " + currentDate);
    $("#current-icon").attr("src", 'https://openweathermap.org/img/wn/' + ico + '@2x.png');
    $("#current-temp").text("Temp: " + tem);
    $("#current-feelslike").text("Feels like: " + feel);
    $("#current-wind").text("Wind: " + win + " MPH");
    $("#current-humid").text("Humidity: " + hum + "%");
}

function popForecast() {
    var requestFutureURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apikey + "&units=imperial";
    fetch(requestFutureURL)
    .then(function(response) {
        if (response.status === 404) {
            console.log("404");
            return;
        } else {
            return response.json();
        }
    })
    .then(function(data) {
        var ind = 1;
        for (let i = 0; i < data.list.length; i += 8) {
            var futureDate = today.add(ind, "d").format("dddd, MMM D, YYYY");
            $("#fut-date-" + ind).text(futureDate);
            $("#fut-icon-" + ind).attr("src", 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png');
            $("#fut-temp-" + ind).text("Temp: " + data.list[i].main.temp);
            $("#fut-feelslike-" + ind).text("Feels Like: " + data.list[i].main.feels_like);
            $("#fut-wind-" + ind).text("Wind: " + data.list[i].wind.speed);
            $("#fut-humid-" + ind).text("Humidity: " + data.list[i].main.humidity);
            ind++;
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

function buildForecastCards() {
    $("#forecast-container").empty();
    for (i = 1; i <= 5; i++) {
        var futureDate = today.add(i, "d").format("dddd, MMM D, YYYY");
        var forecastCard = "";
        forecastCard += '<div class="card col-2 bg-dark text-light align-items-center my-1">'
        forecastCard += '<p id="fut-date-' + i + '">' + futureDate + '</p>';
        forecastCard += '<p><img class="img-fluid" id="fut-icon-' + i + '" src=""></p>';
        forecastCard += '<p id="fut-temp-' + i + '"></p>';
        forecastCard += '<p id="fut-feelslike-' + i + '"></p>';
        forecastCard += '<p id="fut-wind-' + i + '"></p>';
        forecastCard += '<p id="fut-humid-' + i + '"></p>';
        forecastCard += "</div>"
        $("#forecast-container").append(forecastCard);
    }
}

function clearHistory() {
    localStorage.clear();
    locations = [];
    $("#prev-city-container").empty();
}

function addCityButton() {
    var storedLocations = JSON.parse(localStorage.getItem("locations"));

    $("#prev-city-container").empty();
    if (storedLocations !== null) {
        locations = storedLocations;
        for (let i = 0; i < locations.length; i++) {
            var cityButton = '<button id="' + locations[i].city + '" class="btn btn-success p-1 my-2 w-100 cityBtn">' + locations[i].city + '</button>';
            $("#prev-city-container").append(cityButton);
        }
    }

    $(".cityBtn").on("click", function(event) {
        event.preventDefault();
        city = $(this).attr("id");
        fetchWeather();
    });
}

function storeCity(cityName) {
    var newCity = {
        city: cityName.trim(),
    };
    locations.push(newCity);
    localStorage.setItem("locations", JSON.stringify(locations));
    addCityButton();
}

searchButton.on("click", function(event) {
    event.preventDefault();
    city = cityInput.val().trim();
    if (city === "") {
        return;
    }
    fetchWeather();
    cityInput.val("");
    storeCity(city);
});

clearButton.on("click", function(event) {
    event.preventDefault();
    clearHistory();
});