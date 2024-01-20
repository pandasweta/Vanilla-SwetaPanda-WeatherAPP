function searchformCity(event) {
    event.preventDefault(event);
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function showTemperature(response) {
    // console.log(response.data.location.name);
    let tempC = document.querySelector("#city-temp");
    tempC.innerHTML = Math.round(response.data.current.temp_c);
    let cityName = document.querySelector("#city");
    cityName.innerHTML = response.data.location.name;

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

searchCity("Pune");


