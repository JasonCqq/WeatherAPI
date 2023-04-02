function inputFunction() {
  const locationInput = document.getElementById("location");
  locationInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      getWeatherData(locationInput.value);
    }
  });
}

async function getWeatherData(location) {
  const weather = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=1c1cf14a930f401492c60024233003&q=${location.toLowerCase()}`,
    { mode: "cors" }
  );
  const weatherData = await weather.json();
  console.log(weatherData);
  returnImportantData(weatherData);
}

function returnImportantData(data) {
  let name = data.location.name;
  let localtime = data.location.localtime;
  let condition = data.current.condition.text;
  let temp_c = data.current.temp_c;
  let temp_f = data.current.temp_f;
  let humidity = data.current.humidity;
  let wind_kph = data.current.wind_kph;
  let wind_mph = data.current.wind_mph;
  console.log({
    name,
    localtime,
    condition,
    temp_c,
    temp_f,
    humidity,
    wind_kph,
    wind_mph,
  });
}
getWeatherData();
inputFunction();
