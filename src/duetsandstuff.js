let apiKey = `1ee4264117b73d2263eecd562f31ef5c`;
let city = `Houston`;
let tempsF = [];
let tempsC = [];
let weathers = [];
let humidities = [];
let conditions = [];
let speed = [];
function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let month = date.getMonth();
  let day = date.getDate();
  let meridiem = "AM";
  if (hours > 12) {
    hours = hours - 12;
    meridiem = "PM";
  }
  let setTime = document.getElementById("curTime");
  setTime.innerHTML = `${hours}:${minutes} ${meridiem}`;
  let today = document.getElementById("curDay");
  today.innerHTML = `${months[month]} ${day}`;
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let unit = 0;
let apiUrlC = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
let apiUrlF = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
let currentUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;
let now = new Date();

now.getHours();

// Gets weather for the cur hour and the forecast for several hours after.//
function getWeather() {
  apiUrlC = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  apiUrlF = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  //currentUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlC).then(getDataC);
  axios.get(apiUrlF).then(getDataF);
  formatDate();
}

//Gets celsius data and stores it
function getDataC(response) {
  let x = 0;
  while (x < 4) {
    tempsC[x] = response.data.list[x].main.temp;
    x = x + 1;
  }
  speed[0] = response.data.list[0].wind.speed;
}
//Gets farenheit and the rest of the data and stores it
function getDataF(response) {
  let x = 0;
  //let value = response.data.list[0].dt_txt;

  while (x < 4) {
    tempsF[x] = response.data.list[x].main.temp;
    weathers[x] = response.data.list[x].weather[0].main;
    humidities[x] = response.data.list[x].main.humidity;
    value = response.data.list[x].dt_txt;
    conditions[x] = response.data.list[x].weather[0].icon;

    x = x + 1;
  }
  speed[1] = response.data.list[0].wind.speed;
  //value = response.data.list[0].dt_txt;
  //let month = `${value[5]}${value[6]}`;
  //month = parseInt(month, 10);
  //let day = `${value[8]}${value[9]}`;
  //day = parseInt(day, 10);

  //value = response.data.list[0].dt_txt;
  updateWeather();
}

function getCurrent(response) {}
//Updates the weather
function updateWeather() {
  let temp = document.getElementsByClassName("curTemp");
  let type = document.getElementsByClassName("curUnit");
  let wthr = document.getElementsByClassName("curWeather");
  let humid = document.getElementsByClassName("curHum");
  let cond = document.getElementsByClassName("curCond");
  let wind = document.getElementById("curWind");
  let spdType = document.getElementById("speedType");
  let x = 0;
  let conditionUrl = " ";
  while (4 > x) {
    wthr[x].innerHTML = `${weathers[x]}`;
    humid[x].innerHTML = `${humidities[x]}`;
    conditionUrl = `http://openweathermap.org/img/wn/${conditions[x]}@2x.png`;
    cond[x].setAttribute("src", `${conditionUrl}`);
    x = x + 1;
  }

  x = 0;
  if (unit === 0) {
    //Celsius update if unit is set to celsius
    while (4 > x) {
      temp[x].innerHTML = `${tempsC[x]}`;
      type[x].innerHTML = `C`;
      x = x + 1;
    }
    wind.innerHTML = `${speed[unit]}`;
    spdType.innerHTML = `m/s`;

    //Farenheit update if unit is set to farenheit
  } else {
    while (4 > x) {
      temp[x].innerHTML = `${tempsF[x]}`;
      type[x].innerHTML = `F`;
      x = x + 1;
    }
    wind.innerHTML = `${speed[unit]}`;
    spdType.innerHTML = `mi/h`;
  }
}

function submitValues(event) {
  event.preventDefault();
  city = document.getElementById("text_input").value;
  loc = document.getElementById("curLoc");
  if (city === "") {
    city = "Houston";
  }
  loc.innerHTML = `${city}`;
  getWeather();
}
function celsiClick(event) {
  event.preventDefault();
  unit = 0;
  getWeather();
}
function farenhClick(event) {
  event.preventDefault();
  unit = 1;
  getWeather();
}
function startUp() {
  setTimeout(function () {
    // rest of code here
    getWeather();
  }, 100);
}
getWeather();
startUp();
button = document.getElementById("submitter");
button.addEventListener("click", submitValues);
celsi = document.getElementById("celsisus");
celsi.addEventListener("click", celsiClick);
farenh = document.getElementById("farenheight");
farenh.addEventListener("click", farenhClick);
