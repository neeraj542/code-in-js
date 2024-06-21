import { apiKey, apiURL } from './config.js';


// Select elements using getElementsByClassName
const cityNameElements = document.getElementsByClassName("city");
const tempElements = document.getElementsByClassName("temp");
const humidityElements = document.getElementsByClassName("humidity");
const windElements = document.getElementsByClassName("wind");
const weatherIcon = document.querySelector(".weather-icon");

const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

const searchBox = document.querySelector(".search input"); 
const searchBtn = document.querySelector(".search button");

async function checkWeather(cityName) {
    const response = await fetch(apiURL + cityName + `&appid=${apiKey}`);

    if (response.status == 400) {
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
    } else {
        var data = await response.json();

        // Set innerHTML of elements (assuming only one element for each class)
        cityNameElements[0].innerHTML = data.name;
        tempElements[0].innerHTML = Math.round(data.main.temp) + "°C";
        humidityElements[0].innerHTML = data.main.humidity + "%";
        windElements[0].innerHTML = data.wind.speed + " km/h";

        // Set weather icon based on weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }

        weatherElement.style.display = "block";
        errorElement.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
