function inputFunction() {
  const locationInput = document.getElementById("searchBar");
  locationInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      getWeatherData(locationInput.value);
      locationInput.value = "";
    }
  });
}

async function getWeatherData(location) {
  const weather = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=1c1cf14a930f401492c60024233003&q=${location.toLowerCase()}`,
    { mode: "cors" }
  );
  const weatherData = await weather.json();
  returnImportantData(weatherData);
}

function returnImportantData(data) {
  //Storing object data into variables
  const weatherData = {
    name: `${data.location.name}`,
    localtime: `Local Time: ${data.location.localtime.slice(10)}`,
    condition: `${data.current.condition.text}`,
    temp_f: `${data.current.temp_f} F°`,
    temp_c: `${data.current.temp_c} C°`,
    humidity: `${data.current.humidity}% Humidity`,
    wind_mph: `${data.current.wind_mph} MPH`,
    wind_kph: `${data.current.wind_kph} KPH`,
    precip_mm: `${data.current.precip_mm} MM`,
  };
  const dataDivs = Array.from(document.querySelectorAll(".weatherData"));

  //Makes sure to display every data
  for (const div of dataDivs) {
    let tempID = div.getAttribute("id");
    for (const names in weatherData) {
      if (names == tempID.slice(0, tempID.length - 4)) {
        div.innerHTML = `<p>${weatherData[names]} </p>`;
      }
    }
  }
}
inputFunction();
getWeatherData("paris");
