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

function getForecast(city) {
  let apiKey = "f5a9f38100065t0934bo1b43d42ba03a";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let celsiusTemperature = Math.round(response.data.temperature.current);
  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = `${celsiusTemperature}˚C`;

  let currentCity = document.querySelector("#city-search-result");
  currentCity.innerHTML = response.data.city;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} m/s`;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `Weather description: ${response.data.condition.description}`;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute("src", `${response.data.condition.icon_url}`);
  weatherIcon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.city);
}

function searchLocation(city) {
  let apiKey = "f5a9f38100065t0934bo1b43d42ba03a";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function getData(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchLocation(city);
}

let searchingForm = document.querySelector("#search-form");
searchingForm.addEventListener("submit", getData);

function getDayOfTheWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfTheWeek[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<table class="temperature"> 
                        <tr>`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<td><strong>${getDayOfTheWeek(forecastDay.time)}</strong></td>`;
    }
  });

  forecastHTML = forecastHTML + `</tr> <tr>`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<td class="forecast-temperature">${Math.round(
          forecastDay.temperature.minimum
        )}°C - ${Math.round(forecastDay.temperature.maximum)}°C</td>`;
    }
  });

  forecastHTML = forecastHTML + `</tr> <tr>`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<td>
          <img
            src="${forecastDay.condition.icon_url}"
            alt=""
            width="62"
          />
        </td>`;
    }
  });

  forecastHTML = forecastHTML + `</tr> </table>`;
  forecastElement.innerHTML = forecastHTML;
}
