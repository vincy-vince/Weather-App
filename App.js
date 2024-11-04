window.addEventListener("load", () => {
  let long;
  let lat;
  let temp = document.querySelector('.temperature-degree')
  let tempInner = temp.innerHTML;
console.log(tempInner);
if(tempInner >= 30){
 const bodyEle = document.querySelector('.js-body');
 console.log(bodyEle);
 
 bodyEle.classList.add('body-hot');
}else if (tempInner <= 10){
  const bodyEle = document.querySelector('.js-body');
  console.log(bodyEle);

  bodyEle.classList.add('body-cold');
} else if(tempInner == 24){
  const bodyEle = document.querySelector('.js-body');
  console.log(bodyEle);

  bodyEle.classList.add('body-green');
}
else{
  const bodyEle = document.querySelector('.js-body');
  bodyEle.classList.remove('body-url')
}

//if(lat === ){
//use dom to get the lat and long from html. 
//}

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${long}&units=metric&apikey=8WElWxRqhNuuFwfSeSMTPraPSVmYS2FZ`;
      fetch(api).then((res) => {
        return res.json()
      }).then(data => {
        console.log(data);
        const temperature = data.data.values.temperature;  
        console.log(temperature); 
      });
    });
  }
});
