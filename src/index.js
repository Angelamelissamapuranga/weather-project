function currentWeather(response) {
  let temeperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descpritionElement = document.querySelector("#details");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  console.log(response.data);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji" />`;
  timeElement.innerHTML = formateDate(date);
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descpritionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temeperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

function getForecast(city) {
  let apiKey = "0b13ta29a8716f0b00944ca581adofd4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(forecastFormat);
}

function forecastFormat(params) {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (days) {
    forecastHtml =
      forecastHtml +
      `
        <div class="weather-app-forecast-day">
          <div class="weather-app-forecast-date">${days}</div>
          <div class="weather-app-forecast-icon">🌥️</div>
          <div class="weather-forecast-temperatures">
            <div class="weather-app-forecast-temperature">
              <strong>18°</strong>
            </div>
            <div class="weather-app-forecast-temperature">20°</div>
          </div>
        </div>
      `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", searchSubmit);

searchCity("London");
forecastFormat();
