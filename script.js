function inputFunction() {
  const locationInput = document.getElementById("location");
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
  let weatherData = {
    name: data.location.name,
    localtime: data.location.localtime,
    condition: data.current.condition.text,
    temp_c: data.current.temp_c,
    temp_f: data.current.temp_f,
    humidity: data.current.humidity,
    wind_kph: data.current.wind_kph,
    wind_mph: data.current.wind_mph,
  };
  const dataDivs = document.querySelectorAll(".weatherData");
  const dataDivsArray = Array.from(dataDivs);

  //Makes sure to display every data
  for (const div of dataDivsArray) {
    let tempID = div.getAttribute("id");
    for (const names in weatherData) {
      if (names == tempID.slice(0, tempID.length - 4)) {
        div.innerHTML = `<p> ${names}: ${weatherData[names]} <br> </p>`;
      }
    }
  }
}
inputFunction();
