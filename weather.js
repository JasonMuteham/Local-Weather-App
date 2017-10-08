var id, target, options, weather;

var images = [];
var credit = [];

// mist = [0]

images[0] ='url("https://www.happyafloat.com/WeatherApp/images/Mist.jpg")';
credit[0] = "Photo by Mujibur Rohman on Unsplash";

// clear sky = [1]

images[1] = 'url("https://www.happyafloat.com/WeatherApp/images/sunny.jpg")';
credit[1] = "Photo by Milada Vigerova on Unsplash";

// clouds = [2]

images[2] = 'url("https://www.happyafloat.com/WeatherApp/images/clouds.jpg")';
credit[2] = "Photo by Karsten Würth (@inf1783) on Unsplash";

// rain = [3]

images[3] = 'url("https://www.happyafloat.com/WeatherApp/images/rain.jpg")';
credit[3] = "Photo by reza shayestehpour on Unsplash";

// thunderstorm = [4]

images[4] = 'url("https://www.happyafloat.com/WeatherApp/images/thunderstorm.jpg")';
credit[4] = "Photo by Johannes Plenio on Unsplash";

// snow = [5]

images[5] = 'url("https:/www.happyafloat.com/WeatherApp/images/snow.jpg")';
credit[5] = "Photo by Ilya Orehov on Unsplash";


var tempMaxHTML = document.getElementById("temp");

tempMaxHTML.onclick =function(event){

    if(tempMaxHTML.innerHTML.charCodeAt(tempMaxHTML.innerHTML.length-1) == 8451){
        tempMaxHTML.innerHTML = (Math.round(weather.main.temp * 1.8) + 32) + "&#8457";
    } else {
        tempMaxHTML.innerHTML = Math.round(weather.main.temp) + "&#8451";
    }     
};

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

function success(pos) {
    var crd = pos.coords;

    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + crd.latitude.toString().slice(0,5) + "&lon=" + crd.longitude.toString().slice(0,5) + "&APPID=054d828e868a61686e21b12cc1f1a7f0&units=metric";

    var client = new HttpClient();
    client.get(url, function(data) {

        weather = JSON.parse(data);


        var mainHTML = document.getElementById("weather-main");
        mainHTML.innerHTML = weather.weather[0].description;


        tempMaxHTML.innerHTML = Math.round(weather.main.temp) + "&#8451";

        if(weather.main.temp < 10){
            tempMaxHTML.style.color = "blue";
        } else {
            tempMaxHTML.style.color = "yellow";
        }


        var locationHTML = document.getElementById("location");
        locationHTML.innerHTML = weather.name;

        var bodyHTML = document.getElementsByTagName("body");
        var footerHTML = document.getElementById("credit");

        var imgPos;

        var weatherID = weather.weather[0].id;
        imgPos = 2;
        if(weatherID >=200 & weatherID <= 232){
            //thunderstorms
            imgPos = 4;
        } else  if(weatherID >=300 & weatherID <= 331){
            //drizzel
            imgPos = 3;
        } else  if(weatherID >=500 & weatherID <= 531){
            //rain
            imgPos = 3;
        } else  if(weatherID >=600 & weatherID <= 622){
            //snow
            imgPos = 5;
        } else  if(weatherID >=700 & weatherID <= 781){
            //atmosphere
            imgPos = 0;
        } else  if(weatherID == 800){
            //clear
            imgPos = 1;
        } else  if(weatherID >=801 & weatherID <= 804){
            //clouds
            imgPos = 2;
        }  


        bodyHTML[0].style.backgroundImage = images[imgPos];
        footerHTML.innerHTML = credit[imgPos];

    });
}



function getGeo(){
    console.log("getGeo");
if ("geolocation" in navigator) {
    /* geolocation is available */
 
      function geoError(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
    navigator.geolocation.getCurrentPosition(success,geoError);
    
} else {
    console.log("no geolocation");
    var locationHTML = document.getElementById("location");
    locationHTML.innerHTML = "Geo Location Unknown";
}
}

window.onload = function() {
getGeo();
};




