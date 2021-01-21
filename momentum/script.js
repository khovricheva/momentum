const time = document.getElementById('time');
const currentHour = document.getElementById('time-hour');
const currentMin = document.getElementById('time-min');
const currentSec = document.getElementById('time-sec');
const fullDate = document.getElementById('date');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const updateBgBtn = document.getElementById('update-bg-btn');
const blockquote = document.getElementById('blockquote');
const quoteCaption = document.getElementById('quote-caption');
const updateQuoteBtn = document.getElementById('update-quote-btn');
const weatherInfo = document.getElementById('weather-info');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const city = document.getElementById('city');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const popup = document.getElementById('popup');
const popupBtn = document.getElementById('popup-btn');

const dayData = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthData = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let bgArray = [];
let today = new Date();
let hour = today.getHours();
let counter = hour + 1;

//create an array of backgrounds for today (for this moment of time)
function getTodayBg() {
  const timeOfDayPath = ['night/', 'morning/', 'afternoon/', 'evening/'];
  const imagesPath = [
    '01.jpg',
    '02.jpg',
    '03.jpg',
    '04.jpg',
    '05.jpg',
    '06.jpg',
    '07.jpg',
    '08.jpg',
    '09.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg',
    '14.jpg',
    '15.jpg',
    '16.jpg',
    '17.jpg',
    '18.jpg',
    '19.jpg',
    '20.jpg',
  ];
  let base = 'img/';
  let imageSrc = '';

  function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  for (let i = 0; i < 4; i++) {
    shuffle(imagesPath);
    for (let j = 0; j < 6; j++) {
      imageSrc = base + timeOfDayPath[i] + imagesPath[j];
      bgArray.push(imageSrc);
    }
  }

  return bgArray;
}

//set a background for  current time
function setBg(hour) {
  document.body.style.backgroundImage = `url(${bgArray[hour]})`;
}

// scrolling for backgrounds on today
function changeBg() {
  if (counter === bgArray.length) counter = 0;

  const index = counter % bgArray.length;
  const img = document.createElement('img');
  img.src = bgArray[index];
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
  counter++;
}

//show current time
function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  currentHour.innerHTML = `${hour}`;
  currentMin.innerHTML = `${addZero(min)}`;
  currentSec.innerHTML = `${addZero(sec)}`;

  if (min === 00 && sec === 00) setBg(hour);

  setTimeout(showTime, 1000);
}

//add zero for time formatting
function addZero(num) {
  return (parseInt(num, 10) < 10 ? '0' : '') + num;
}

//show current date
function showDate() {
  let today = new Date();
  let date = today.getDate();
  let day = today.getDay();
  let month = today.getMonth();

  fullDate.innerText = `${dayData[day]}, ${monthData[month]} ${date}`;
}

//show greeting for current time
function setBgGreet() {
  let today = new Date();
  let hour = today.getHours();

  if (6 <= hour && hour < 12) {
    greeting.textContent = 'Good Morning';
  } else if (12 <= hour && hour < 18) {
    greeting.textContent = 'Good Afternoon';
  } else if (18 <= hour && hour < 24) {
    greeting.textContent = 'Good Evening';
  } else {
    greeting.textContent = 'Good Night';
  }
  setBg(hour);
}

//get name from Local Storage
function getName() {
  if (localStorage.getItem('name') !== null) {
    name.textContent = localStorage.getItem('name');
  }
}

//set name to Local Storage
function setName(e) {
  if (e.type === 'keypress') {
    if (e.which === 13 || e.keyCode === 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

//get focus from Local Storage
function getFocus() {
  if (localStorage.getItem('focus') !== null) {
    focus.textContent = localStorage.getItem('focus');
  }
}

//set focus to Local Storage
function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which === 13 || e.keyCode === 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

//get city from Local Storage
function getCity() {
  if (localStorage.getItem('city') !== null) {
    city.textContent = localStorage.getItem('city');
  }
}

//set city to Local Storage
function setCity(e) {
  if (e.type === 'keypress') {
    if (e.which === 13 || e.keyCode === 13) {
      localStorage.setItem('city', e.target.innerText);
      city.blur();
    }
  } else {
    localStorage.setItem('city', e.target.innerText);
  }
}

//get and show a quote
async function getQuote() {
  const url = `https://type.fit/api/quotes`;
  const result = await fetch(url);
  const data = await result.json();
  const randomQuote = Math.floor(Math.random() * data.length);

  blockquote.textContent = data[randomQuote].text;
  quoteCaption.textContent = `${data[randomQuote].author}`;
}

//get and show the weather forecast
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=1964d0a7118d50f00dc12a34ffef2fef&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  const weather = data.weather;

  if (data.cod === '404') {
    weatherInfo.style.display = 'none';
    localStorage.clear();
    popup.style.display = 'block';
    popupBtn.addEventListener('click', () => (popup.style.display = 'none'));
    city.textContent = '';
  } else {
    weatherIcon.src = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `humidity: ${data.main.humidity} %`;
    wind.textContent = `wind: ${data.wind.speed} m/s`;
  }
}

//check entry the city
function checkCity() {
  if (city.textContent === '') {
    weatherInfo.style.display = 'none';
  } else {
    getWeather();
    weatherInfo.style.display = 'flex';
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('blur', checkCity);

updateBgBtn.addEventListener('click', changeBg);
updateQuoteBtn.addEventListener('click', getQuote);

getTodayBg();
showTime();
showDate();
setBgGreet();
getName();
getFocus();
getCity();
getQuote();
checkCity();
