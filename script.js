const API_KEY="1e46328fe3a9d751adfb7bd61eb6c032";
const GEO_URL="https://api.openweathermap.org/geo/1.0/direct";
const CURRENT_URL="https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL="https://api.openweathermap.org/data/2.5/forecast";

const searchForm=document.getElementById("searchForm");
const cityInput=document.getElementById("cityInput");
const searchBtn=document.getElementById("searchBtn");
const loading=document.getElementById("loading");
const errorMessage=document.getElementById("errorMessage");
const weatherDashboard=document.getElementById("weatherDashboard");

searchForm.addEventListener("submit",function(event){
    event.preventDefault();
    const city=cityInput.value.trim();
    if(city===""){
        showError("Please enter a city name!");
        return;
    }
    getWeather(city);
});

async function getCityCoordinates(city) {
    const url = `${GEO_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
            `API Error: ${response.status} - ${errorData.message}`
        );
    }

    const locations = await response.json();

    if (locations.length === 0) {
        throw new Error("City not found! Please enter a valid city.");
    }

    return locations[0];
}
async function getWeather(city){
    if(API_KEY==="YOUR_API_KEY"||!API_KEY.trim()){
        showError("Please add your OpenWeatherMap API key in script.js");
        return;
    }
    showLoading(true);
    errorMessage.style.display="none";
    weatherDashboard.classList.add("hidden");

    try{
        const location=await getCityCoordinates(city);
        const{lat,lon,name,country}=location;
        const currentWeatherURL=`${CURRENT_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastURL=`${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const[currentResponse,forecastResponse]=await Promise.all([
            fetch(currentWeatherURL),
            fetch(forecastURL)
        ]);
        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data.");
        }
        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        displayWeather(currentData, name, country);
        displayForecast(forecastData);
        changeBackground(currentData);
        weatherDashboard.classList.remove("hidden");
    }    

    catch(error){
        showError(error.message);
        console.error("Weather Error:",error);
    }
    finally{
        showLoading(false);
    }
}
//6
function displayWeather(data,city,country){
    document.getElementById("cityName").textContent=`${city},${country}`;
    const localDate=new Date(
        (Date.now()/1000+data.timezone)*1000
    );
    const dateText=localDate.toLocaleString("en-US",{
        weekday:"long",
        day:"numeric",
        month:"long",
        timeZone:"UTC"
    });
    document.getElementById("weatherDate").textContent=dateText;
    document.getElementById("temperature").textContent =Math.round(data.main.temp);
    document.getElementById("feelsLike").textContent = Math.round(data.main.feels_like);
    document.getElementById("weatherDescription").textContent = data.weather[0].description;
    const iconCode=data.weather[0].icon;
    document.getElementById("weatherIcon").src =`https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("humidity").textContent =`${data.main.humidity}%`;
    const windInKmh=data.wind.speed*3.6;
    document.getElementById("windSpeed").textContent =`${windInKmh.toFixed(1)} km/h`;
    document.getElementById("pressure").textContent =`${data.main.pressure} hPa`;
    document.getElementById("cloudiness").textContent =`${data.clouds.all}%`;



}
//7
function displayForecast(data){
    const forecastContainer=document.getElementById("forecastContainer");
    forecastContainer.innerHTML="";
    const dailyForecast={};
    data.list.forEach(item=>{
        const localTimestamp=item.dt+data.city.timezone;
        const localDate=new Date(localTimestamp*1000);
        const dateKey=localDate.toISOString().split("T")[0];
        const localHour=localDate.getUTCHours();

        if(!dailyForecast[dateKey]){
            dailyForecast[dateKey]=[];
        }
        dailyForecast[dateKey].push({
            ...item,
            localHour:localHour
        });
    });
    const forecastDays=Object.keys(dailyForecast)
    .sort()
    .slice(0,5);
    const forecastHTML=forecastDays.map(date=>{
        const dayDate=dailyForecast[date];
        const selectedForecast=dayDate.reduce((best,current)=>{
            return Math.abs(current.localHour-12)<Math.abs(best.localHour-12)?current:best;
        });
        const dateObject=new Date(date+"T12:00:00Z");
        const dayName=dateObject.toLocaleDateString("en-US",{
            weekday:"short",
            timeZone:"UTC"
        });
        const temperature = Math.round(
            selectedForecast.main.temp
        );
        const description =selectedForecast.weather[0].description;
        const icon =selectedForecast.weather[0].icon;

        return `<div class="forecast-card">
            <h3>${dayName}</h3>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${description}">
            <p class="forecast-temp">
            ${temperature}°C
            </p>
            <p class="forecast-description">
               ${description}
            </p>

        </div>
        `;
    }).join("");  
    forecastContainer.innerHTML=forecastHTML;  
}
//8
function changeBackground(data){
    const weather=data.weather[0].main.toLowerCase();
    const currentTime=Math.floor(Date.now()/1000);
    const isNight=currentTime<data.sys.sunrise||currentTime>=data.sys.sunset;

    document.body.classList.remove(
        "sunny",
        "rainy",
        "cloudy",
        "night"
    );
    if(isNight){
        document.body.classList.add("night");
    }
    else if(weather==="clear"){
        document.body.classList.add("sunny");
    }
    else if(
        weather==="rain"||
        weather==="drizzle"||
        weather==="thunderstorm"
    ){
        document.body.classList.add("rainy");
    }
    else{
        document.body.classList.add("cloudy");
    }

}
//9
function showLoading(isLoading){
    if(isLoading){
        loading.classList.remove("hidden");
        searchBtn.disabled=true;
        searchBtn.textContent="Loading...";
    }
    else{
        loading.classList.add("hidden");
        searchBtn.disabled=false;
        searchBtn.textContent="Search";
    }
}
//10
function showError(message){
    errorMessage.textContent=message;
    errorMessage.style.display="block";
}

//11
getWeather("Noakhali");


