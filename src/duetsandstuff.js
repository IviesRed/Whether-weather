let apiKey = `1ee4264117b73d2263eecd562f31ef5c
`;
let city = `Houston`;
let tempsF = [];
let tempsC = [];
let weathers = [];
let humidities = [];
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
let now = new Date();
let times = [];
now.getHours();

// Gets weather for the cur hour and the forecast for several hours after.//
function getWeather() {
  apiUrlC = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  apiUrlF = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrlC).then(getDataC);
  axios.get(apiUrlF).then(getDataF);
}

//Gets celsius data and stores it
function getDataC(response) {
  let x = 0;
  while (x < 4) {
    tempsC[x] = response.data.list[x].main.temp;
    x = x + 1;
  }
}
//Gets farenheit and the rest of the data and stores it
function getDataF(response) {
  let x = 0;
  let value = response.data.list[0].dt_txt;
  let time = `${value[11]}${value[12]}${value[13]}${value[14]}${value[15]}`;
  while (x < 4) {
    tempsF[x] = response.data.list[x].main.temp;
    weathers[x] = response.data.list[x].weather[0].main;
    humidities[x] = response.data.list[x].main.humidity;
    value = response.data.list[x].dt_txt;
    time = `${value[11]}${value[12]}${value[14]}${value[15]}`;
    time = parseInt(time, 10);
    times[x] = time;
    x = x + 1;
  }
  console.log(response);
  console.log(response.data.list[0].dt_txt);
  value = response.data.list[0].dt_txt;
  let month = `${value[5]}${value[6]}`;
  month = parseInt(month, 10);
  console.log(months[month - 1]);
  let day = `${value[8]}${value[9]}`;
  day = parseInt(day, 10);
  console.log(day);
  let today = document.getElementById("curDay");
  today.innerHTML = `${month}/${day}`;
  value = response.data.list[0].dt_txt;
  updateWeather();
}
//Updates the weather
function updateWeather() {
  let temp = document.getElementsByClassName("curTemp");
  let type = document.getElementsByClassName("curUnit");
  let wthr = document.getElementsByClassName("curWeather");
  let humid = document.getElementsByClassName("curHum");
  let tim = document.getElementsByClassName("curTime");
  let x = 0;
  console.log("testing");
  console.log(tim[0]);
  //Updating the rest of the page outside to prevent needless repeat of commands
  while (4 > x) {
    wthr[x].innerHTML = `${weathers[x]}`;
    humid[x].innerHTML = `${humidities[x]}`;
    if (x < 3) {
      tim[x].innerHTML = `${times[x + 1]}`;
    }
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

    //Farenheit update if unit is set to farenheit
  } else {
    while (4 > x) {
      temp[x].innerHTML = `${tempsF[x]}`;
      type[x].innerHTML = `F`;
      x = x + 1;
    }
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
