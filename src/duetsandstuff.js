let apiKey = `1ee4264117b73d2263eecd562f31ef5c`;
let city = `Houston`;
let tempsF = [];
let tempsC = [];
let weathers = [];
let humidities = [];
let conditions = [];
let speed = [];

//Gets current date and time whenever called
function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let month = date.getMonth();
  let day = date.getDate();
  let meridiem = "AM";
  let fixer = "";
  //Sets time to PM if needed
  if (hours > 12) {
    hours = hours - 12;
    meridiem = "PM";
  }
  //Adds a 0 before the minute if needed
  if (minutes < 10) {
    fixer = "0";
  }
  let setTime = document.getElementById("curTime");
  setTime.innerHTML = `${hours}:${fixer}${minutes} ${meridiem}`;
  let today = document.getElementById("curDay");
  today.innerHTML = `${months[month]} ${day}`;
}

//Converts whatever month is entered into a three letter abbreviation. Used in formatDate function
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

//Unit control 0 is celsius 1 is farenheit
let unit = 0;

//Two urls used for code
let apiUrlC = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
let apiUrlF = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

// Gets weather for the cur hour and the forecast for several hours after.//
function getWeather() {
  apiUrlC = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  apiUrlF = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
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

  //Stores values that'll appear in page from top to bottom and left to right.
  while (x < 4) {
    tempsF[x] = response.data.list[x].main.temp;
    weathers[x] = response.data.list[x].weather[0].main;
    humidities[x] = response.data.list[x].main.humidity;
    value = response.data.list[x].dt_txt;
    conditions[x] = response.data.list[x].weather[0].icon;

    x = x + 1;
  }
  speed[1] = response.data.list[0].wind.speed;
  updateWeather();
}

//Updates the weather using the previously made arrays in getDataF and getDataC
function updateWeather() {
  //Establishing which parts of HMTL need to edited
  let temp = document.getElementsByClassName("curTemp");
  let type = document.getElementsByClassName("curUnit");
  let wthr = document.getElementsByClassName("curWeather");
  let humid = document.getElementsByClassName("curHum");
  let cond = document.getElementsByClassName("curCond");
  let wind = document.getElementById("curWind");
  let spdType = document.getElementById("speedType");

  //Initialize the variable used for looping
  let x = 0;

  //Set the humidities and weather conditions as well as changing weather icons
  let conditionUrl = " ";
  while (4 > x) {
    wthr[x].innerHTML = `${weathers[x]}`;
    humid[x].innerHTML = `${humidities[x]}`;
    conditionUrl = `http://openweathermap.org/img/wn/${conditions[x]}@2x.png`;
    cond[x].setAttribute("src", `${conditionUrl}`);
    x = x + 1;
  }
  //Resetting looping variable
  x = 0;
  //Setting the metric variables, celsius and meters a second.
  if (unit === 0) {
    //Celsius update if unit is set to celsius
    while (4 > x) {
      temp[x].innerHTML = `${tempsC[x]}`;
      type[x].innerHTML = `C`;
      x = x + 1;
    }
    wind.innerHTML = `${speed[unit]}`;
    spdType.innerHTML = `m/s`;

    //Setting the imperial variables, farenheit and miles an hour.
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
//Making the submit button work and ordering a forced update of the page.
function submitValues(event) {
  event.preventDefault();
  city = document.getElementById("text_input").value;
  loc = document.getElementById("curLoc");
  //Prevents the user from entering blank values.
  if (city === "") {
    city = "Houston";
  }
  loc.innerHTML = `${city}`;
  getWeather();
}
//Sets unit to metric and begins page update
function celsiClick(event) {
  event.preventDefault();
  unit = 0;
  getWeather();
}
//Sets unit to imperial and begins page update
function farenhClick(event) {
  event.preventDefault();
  unit = 1;
  getWeather();
}

//Ensures the page updates properly if for some reason all values weren't set properly.
function startUp() {
  setTimeout(function () {
    // rest of code here
    getWeather();
  }, 100);
}

//Start up functions to do an initial update of the page.
getWeather();
startUp();
//Code to ensure buttons
button = document.getElementById("submitter");
button.addEventListener("click", submitValues);
celsi = document.getElementById("celsisus");
celsi.addEventListener("click", celsiClick);
farenh = document.getElementById("farenheight");
farenh.addEventListener("click", farenhClick);
