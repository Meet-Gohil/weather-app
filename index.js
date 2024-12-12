


const key = "https://api.openweathermap.org/data/2.5/weather?appid=ba7a15a35b5a47ff736d67653df9d0c3&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
    try {
        const response = await fetch(key + city);
        if (!response.ok) {
            // Handle invalid city or API error
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }
        const data = await response.json();
        console.log(data);

        // Update weather information
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on conditions
        if (data.weather[0].main === "Clouds") {
            weathericon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weathericon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weathericon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weathericon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weathericon.src = "images/mist.png";
        }

        // Show weather information and hide error
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

async function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ba7a15a35b5a47ff736d67653df9d0c3&units=metric`;

            try {
                const response = await fetch(locationUrl);
                if (!response.ok) {
                    document.querySelector(".error").style.display = "block";
                    document.querySelector(".weather").style.display = "none";
                    return;
                }
                const data = await response.json();
                console.log(data);

                // Update weather information
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = data.main.temp + "°C";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

                // Update weather icon based on conditions
                if (data.weather[0].main === "Clouds") {
                    weathericon.src = "images/clouds.png";
                } else if (data.weather[0].main === "Clear") {
                    weathericon.src = "images/clear.png";
                } else if (data.weather[0].main === "Rain") {
                    weathericon.src = "images/rain.png";
                } else if (data.weather[0].main === "Drizzle") {
                    weathericon.src = "images/drizzle.png";
                } else if (data.weather[0].main === "Mist") {
                    weathericon.src = "images/mist.png";
                }

                // Show weather information and hide error
                document.querySelector(".weather").style.display = "block";
                document.querySelector(".error").style.display = "none";
            } catch (error) {
                console.error("Error fetching weather data based on location:", error);
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city) {
        checkweather(city); // Search weather for user-inputted city
    } else {
        getLocationWeather(); // Fetch weather based on user's current location
    }
});
