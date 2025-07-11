window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const location = urlParams.get("loc");
  const lat = urlParams.get("lat");
  const long = urlParams.get("long");

  if (location !== null) {
    fetchApi(location);
  } else if (lat !== null && long !== null) {
    fetchApi(`${lat},${long}`);
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      let _lat = position.coords.latitude;
      let _long = position.coords.longitude;

      fetchApi(`${_lat},${_long}`);
    });
  }
});

function fetchApi(location) {
  const api = `https://api.tomorrow.io/v4/weather/realtime?location=${location}&units=metric&apikey=8WElWxRqhNuuFwfSeSMTPraPSVmYS2FZ`;
  fetch(api)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const temperature = data.data.values.temperature;
      templateGenerator(temperature);
    });
}

function templateGenerator(temperature) {
  const template = `<div class="degree-section">
      <h2 class="temperature-degree">${temperature}</h2>
      <span class="f-span">
        <span class="degree">&deg; </span>
        C
      </span>
    </div>
    <div class="temperature-description 
    js-temperature-description">`;

  document.querySelector(".temperature").innerHTML = template;
  uiDisplay();
}

function uiDisplay() {
  let temp = document.querySelector(".temperature-degree");
  let tempInner = temp.innerHTML;
  const bodyEle = document.querySelector(".js-body");
  const express = document.querySelector(".js-temperature-description");

  if (tempInner >= 30) {
    bodyEle.classList.add("body-hot");
  } else if (tempInner <= 19) {
    express.innerHTML = "its too cold - freezing!";
    bodyEle.classList.add("body-cold");
  } else if (tempInner == 24) {
    bodyEle.classList.add("body-green");
    express.innerHTML = "Perfect weather!";
  } else if (tempInner == 23) {
    bodyEle.classList.add("body-rain");
    express.innerHTML = "Unwrap your Umbrella!";
  } else {
    bodyEle.classList.remove("body-url");
    express.innerHTML = "Cool!";
  }
}
