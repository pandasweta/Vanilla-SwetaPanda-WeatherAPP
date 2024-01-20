function searchformCity(event) {
    event.preventDefault(event);
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function showTemperature(response) {
    // console.log(response.data.location.name);
    let tempC = document.querySelector("#city-temp");
    tempC.innerHTML = Math.round(response.data.current.temp_c);
    // console.log(icon);
    let weatherIcon = document.querySelector("#icon");
    weatherIcon.innerHTML = `<img src = "https://${response.data.current.condition.icon}"class="weather-app-data-icon" />`;

    let cityName = document.querySelector("#city");
    cityName.innerHTML = response.data.location.name;

    let description = document.querySelector("#desc");
    description.innerHTML = `${response.data.current.condition.text} `;

    let humidity = document.querySelector("#weather-app-city-humidity");
    humidity.innerHTML = `${response.data.current.humidity}% `;
    let windSpeed = document.querySelector("#weather-app-city-wind");
    windSpeed.innerHTML = `${response.data.current.wind_kph} km / h`;

    let currentTime = document.querySelector("#time");
    let date = new Date(response.data.location.localtime_epoch * 1000);
    currentTime.innerHTML = showTimeDate(date);



    // console.log(response.data.current.condition.text);
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", searchformCity)

// to show the seacrch-city and temeperature in realtime through API call

function searchCity(city) {
    let apiKey = "147a5d4e22274503a0c71826230610";
    let apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    console.log(apiURL);
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
searchCity("Amsterdam");


