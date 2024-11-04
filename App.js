window.addEventListener("load", () => {
  let long;
  let lat;
  let temp = document.querySelector(".temperature-degree");
  let tempInner = temp.innerHTML;

  if (tempInner >= 30) {
    const bodyEle = document.querySelector(".js-body");

    bodyEle.classList.add("body-hot");
  } else if (tempInner <= 10) {
    const bodyEle = document.querySelector(".js-body");

    const express = document.querySelector(".js-temperature-description");
    express.innerHTML = "its too cold - freezing!";

    bodyEle.classList.add("body-cold");
  } else if (tempInner == 24) {
    const bodyEle = document.querySelector(".js-body");

    bodyEle.classList.add("body-green");

    const express = document.querySelector(".js-temperature-description");
    express.innerHTML = "Perfect weather!";
  } else if (tempInner == 23) {
    const bodyEle = document.querySelector(".js-body");

    bodyEle.classList.add("body-rain");

    const express = document.querySelector(".js-temperature-description");
    express.innerHTML = "Unwrap your Umbrella!";
  } else {
    const bodyEle = document.querySelector(".js-body");
    bodyEle.classList.remove("body-url");

    const express = document.querySelector(".js-temperature-description");
    express.innerHTML = "Cool!";
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${long}&units=metric&apikey=8WElWxRqhNuuFwfSeSMTPraPSVmYS2FZ`;
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const temperature = data.data.values.temperature;
        });
    });
  }
});
