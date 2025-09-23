function currentWeather(response) {
  let temeperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temeperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "0b13ta29a8716f0b00944ca581adofd4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");

  searchCity(searchCityInput.value);
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", searchSubmit);

searchCity("Brussels");
