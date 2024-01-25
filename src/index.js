function searchformCity(event) {
    event.preventDefault(event);
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function showTemperature(response) {
    console.log(response.data);
    let tempC = document.querySelector("#city-temp");
    tempC.innerHTML = Math.round(response.data.temperature.current);
    console.log(response.data.condition.icon_url);
    let weatherIcon = document.querySelector("#icon");
    weatherIcon.innerHTML = `<img src = "${response.data.condition.icon_url}"class="weather-app-data-icon" />`;

    let cityName = document.querySelector("#city");
    cityName.innerHTML = response.data.city;

    let description = document.querySelector("#desc");
    description.innerHTML = `${response.data.condition.description} `;

    let humidity = document.querySelector("#weather-app-city-humidity");
    humidity.innerHTML = `${response.data.temperature.humidity}% `;
    let windSpeed = document.querySelector("#weather-app-city-wind");
    windSpeed.innerHTML = `${response.data.wind.speed} km / h`;

    let currentTime = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    currentTime.innerHTML = showTimeDate(date);

    getForecasts(response.data.city);



    // console.log(response.data.current.condition.text);
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", searchformCity)

// to show the seacrch-city and temeperature in realtime through API call

function searchCity(city) {
    let apiKey = "at7ddf3o73b01eae74140de7cdd2c6b9";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    // console.log(apiURL);
    axios.get(apiURL).then(showTemperature)
}

// to show the current time and date
function showTimeDate(date) {
    let now = new Date();
    let current_day = now.getDay();
    let current_hours = now.getHours();
    let current_min = now.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[current_day];

    if (current_hours < 10) {
        current_hours = `0${current_hours}`;
    }

    if (current_min < 10) {
        current_min = `0${current_min}`;
    }
    return `${day} ${current_hours}:${current_min}`;
    // console.log(today_time);
    // let today = document.querySelector("p");
    // today.innerHTML = `${today_time}`;
}


function getForecasts(city) {
    let apiKey = "at7ddf3o73b01eae74140de7cdd2c6b9";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;


    console.log(apiUrl);


    axios.get(apiUrl).then(weatherForecast);
}
// to show the forecast temperatures for the upcoming days
function forecastDaysTemp(date) {
    let now = new Date(date * 1000);
    // console.log(now);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

    return days[now.getDay()];




}
// forecastDays();
function weatherForecast(response) {
    // console.log(response.data.daily);
    // console.log((response.data.daily.time));
    // console.log((response.data.daily[0].time));
    // let days = ["Wed", "Thurs", "Fri", "Sat", "Sun"];
    // let date =

    let forecast_days = response.data.daily;
    let forecastDays = "";





    forecast_days.forEach(function (day, index) {
        if (index < 5) {


            forecastDays += `<div class="weather-forecast-days">
            <div class="weather-forecast-day">${forecastDaysTemp(day.time)}</div>
            <div class="weather-forecast-icon">
              <img
                src= "${day.condition.icon_url}"
                width="80"
              />
            </div>
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temp-max"><strong>${Math.round(day.temperature.maximum)}°</strong></span
              ><span class="weather-forecast-temp-min">${Math.round(day.temperature.minimum)}°</span>
            </div>
          </div>`;

        }


    })
    let forecast = document.querySelector("#weather-app-forecast");
    forecast.innerHTML = forecastDays;
}

searchCity("Hoofddorp");







