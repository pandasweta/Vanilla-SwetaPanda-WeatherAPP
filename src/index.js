function searchformCity(event) {
    event.preventDefault(event);
    let searchInput = document.querySelector("#search-form-input");
    // console.log(searchInput);
    let cityName = document.querySelector("#city");
    cityName.innerHTML = searchInput.value;
}

let searchformElement = document.querySelector("#search-form");
// console.log(searchformElement);
searchformElement.addEventListener("submit", searchformCity)