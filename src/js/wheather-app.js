const result = document.getElementById("result"),
    searchBtn = document.getElementById("search-btn"),
    cityRef = document.getElementById("city");

const WEATHER_API_KEY = '2954094ae71e46ef0b0bfc1905b15d7f';

function init() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://geolocation-db.com/json/geoip.php?jsonp=callback';
    var h = document.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(script, h);
}

function callback(data) {
    getWeather(data.city);
}

//Function to fetch weather details from api and display them
function getWeather(cityValue) {

    console.log(cityValue);

    if (!cityValue.length) {

        result.innerHTML = `<p class="msg ff-headline-4">Please enter a city name!</p>`;

    } else {

        const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${WEATHER_API_KEY}&units=metric`;

        fetch(WEATHER_URL).then((resp) => resp.json()).then((data) => { //If city name is valid
            result.innerHTML = `
                <div class="info">
                    <p class="main-title ff-headline-2">${data.name}</p>
                    <p class="weather ff-subtitle-1">${data.weather[0].main}</p>
                    <p class="desc ff-body-1">${data.weather[0].description}</p>
                </div>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                <p class="main-temp ff-headline-4">${data.main.temp} &#176;C</p>
                <div class="temp-container">
                    <div class="temp ff-body-1">
                        <p class="title">min</p>
                        <p class="temp-value">${data.main.temp_min} &#176;C</p>
                    </div>
                    <div class="temp ff-body-1">
                        <p class="title">max</p>
                        <p class="temp-value">${data.main.temp_max} &#176;C</p>
                    </div>
                </div>
            `;

        }).catch(() => {  // If city name is NOT valid
            result.innerHTML = `<p class="msg ff-headline-4">City not found</p>`;
        });
    }
};

searchBtn.addEventListener("click", () => {
    getWeather(cityRef.value);
});

window.addEventListener("load", init);