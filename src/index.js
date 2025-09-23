function searchSubmit(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchCityInput.value;
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", searchSubmit);
