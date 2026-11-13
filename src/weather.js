import "./index.css";

const body = document.querySelector(".body");
const main_div = document.createElement("div");
main_div.classList.add("main_div")
const locationForm = document.createElement("form")
const locationd = document.createElement("input")
locationd.type = "text"
locationd.placeholder = "Enter location/City"


const weather_button = document.createElement("button")
weather_button.textContent = "Get Weather"
weather_button.type = "button"
weather_button.classList.add("button")

async function getWeather(city){
    const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&include=current&elements=datetime,temp,humidity,windspeed,conditions`)
    if(!weather.ok){
        throw new Error(`Request failed: ${weather.status}`)
    }
    const location_weather = await weather.json()
   

    const weatherInformation = {
        city: location_weather.resolvedAddress,
        timezone: location_weather.timezone,
        temp: location_weather.currentConditions.temp,
        humidity: location_weather.currentConditions.humidity,
        windspeed: location_weather.currentConditions.windspeed,
        conditions: location_weather.currentConditions.conditions
    }
    return weatherInformation

}
function renderData(data){
    main_div.querySelector(".weather-information")?.remove();
    const weatherInformation = document.createElement("div")
    weatherInformation.classList.add("weather-information");
    const address = document.createElement("p")
    address.textContent = `City: ${data.city}`
    address.classList.add("address")
    const timezone = document.createElement("p")
    timezone.textContent = `Time Zone: ${data.timezone}`
    timezone.classList.add("timezone")
    const temp = document.createElement("p")
    temp.textContent = `Temperature: ${data.temp}`
    temp.classList.add("temp")
    const humidity = document.createElement("p")
    humidity.textContent = `Humidity: ${data.humidity}`
    humidity.classList.add("humidity")
    const windspeed = document.createElement("p")
    windspeed.textContent = `Wind speed: ${data.windspeed}`
    windspeed.classList.add("windspeed")
    const conditions = document.createElement("p")
    conditions.textContent = `Conditions: ${data.conditions}`
    conditions.classList.add("conditions")
    weatherInformation.append(address,timezone,temp,humidity,windspeed,conditions)
    main_div.appendChild(weatherInformation)
    

    }
async function displayWeather(){
    try{
    const city = locationd.value
    const location_weather = await getWeather(city)
    renderData(location_weather)

    } catch(error){
        alert(error.message)
    }
 
  


}

weather_button.addEventListener("click",async function(){
    weather_button.textContent = "loading..."
    weather_button.disabled =true;
    try{
        await displayWeather();
    }finally{
        weather_button.textContent = "Get Weather"
        weather_button.disabled = false;
    }
    

}  )
    

    
    


body.appendChild(main_div)
main_div.append(locationForm,weather_button)
locationForm.appendChild(locationd)