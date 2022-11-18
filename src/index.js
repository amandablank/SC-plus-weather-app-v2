let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let showDay = document.querySelector("#show-day");
showDay.innerHTML = `${day}`;

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let date = now.getDate();
let month = months[now.getMonth()];
function currentDate() {
  let displayDate = `${date}/${month}`;
}

currentDate();

let showDate = document.querySelector("#show-date");
showDate.innerHTML = `${date}/${month}`;

let hours = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");
function currentTime() {
  let displayTime = `${hours}:${minutes}`;
}

currentTime();

let showTime = document.querySelector("#show-time");
showTime.innerHTML = `${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let h2 = document.querySelector("#city-search-result");
  let cityInput = document.querySelector("#city-input");
  if (cityInput.value !== undefined) {
    h2.innerHTML = `${cityInput.value}`;
  } else {
    h2.innerHTML = "";
    alert("Please, type a city name...");
  }
}

function displayTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = `${celsiusTemperature}˚C`;

  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");

  let currentCity = document.querySelector("#city-search-result");
  currentCity.innerHTML = response.data.name;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} m/s`;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `Weather description: ${response.data.weather[0].description}`;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function searchLocation(city) {
  let apiKey = "393db4e5c25bdf1bb6b5d70d133f7a67";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function getData(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchLocation(city);
}

let searchingForm = document.querySelector("#search-form");
searchingForm.addEventListener("submit", getData);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  if (celsiusTemperature !== null) {
    celsiusLink.classList.remove("inactive");
    fahrenheitLink.classList.add("inactive");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}˚F`;
  }
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  if (celsiusTemperature !== null) {
    celsiusLink.classList.add("inactive");
    fahrenheitLink.classList.remove("inactive");
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = `${celsiusTemperature}˚C`;
  }
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

celsiusTemperature = null;
