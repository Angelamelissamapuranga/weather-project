function currentWeather(response) {
  let temeperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descpritionElement = document.querySelector("#details");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  console.log(response.data);

  timeElement.innerHTML = formateDate(date);
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descpritionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temeperatureElement.innerHTML = Math.round(temperature);
}

function formateDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
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
