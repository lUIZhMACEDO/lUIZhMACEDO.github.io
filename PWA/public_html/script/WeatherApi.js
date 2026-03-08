const apiKey = "629d6003a5b3355c376f5b2fc4ab2206";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=`;

const searchBox = document.querySelector("#locationInput");
const searchBtn = document.querySelector("#searchBtn");

async function checkWeather(city){
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    var data = await response.json();
    
    console.log(data);
    document.querySelector(".weather .city").innerHTML = data.name;
    document.querySelector(".weather .temp").innerHTML = data.main.temp + "°F";
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
