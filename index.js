const wrapContainer = document.querySelector(".wrap-container");
const citiesWrapper = document.querySelector(".cities-wrapper");
const cityName = document.querySelector(".city-name");
const checkWeatherBtn = document.querySelector(".check-weather-btn");
const cityChooseDiv = document.querySelector(".city-choose");

const cityInformations = (city, temperature = 0) => {
  return `<span class="city-name">${city}</span>
  <img class="weather" alt="" src="" />
  <span class="temperature">${temperature}</span>
  <button class="del-btn">-</button>`;
};

const cityCardToChoose = (city, region) => {
  return `<span class="city-name">${city}</span>
  <span class="city-region">${region}</span>;`;
};

const temperatureConverter = (farenheit) => Math.round((farenheit - 32) / 1.8);

const cityTemperatureFetch = (data, cityIndex = 0) => {
  fetch(
    `https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${data[cityIndex].Key}?apikey=7G7aXU4h0HhOxh3j6pXbef6cmg4NGt6a&language=pl-PL`
  )
    .then((res) => res.json())
    .then((city) => {
      const [cityDes] = city;
      const newCityTab = document.createElement("div");
      newCityTab.className = "city-container";
      newCityTab.innerHTML = cityInformations(
        data[cityIndex].EnglishName,
        temperatureConverter(cityDes.Temperature.Value)
      );
      citiesWrapper.appendChild(newCityTab);
    });
};

const cityChoose = (data) => {
  cityChooseDiv.classList.add("city-choose__fade");
  data.forEach((el) => {
    const cityToChoose = document.createElement("div");
    cityToChoose.className = "city-to-choose";
    cityToChoose.innerHTML = cityCardToChoose(
      el.EnglishName,
      el.AdministrativeArea.EnglishName
    );
    cityChooseDiv.appendChild(cityToChoose);
  });
  cityChooseDiv.onclick = (e) => {
    const target = e.target;
    const citiesDivTable = document.querySelectorAll(".city-to-choose");
    citiesDivTable.forEach((el, index) => {
      if (el === target) {
        cityChooseDiv.innerHTML = "";
        cityChooseDiv.classList.remove("city-choose__fade");
        cityTemperatureFetch(data, index);
      }
    });
  };
};

export const checkWeather = () => {
  fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=7G7aXU4h0HhOxh3j6pXbef6cmg4NGt6a&q=${cityName.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 1) {
        cityChoose(data);
      } else {
        cityTemperatureFetch(data);
      }
    });
};

checkWeatherBtn.addEventListener("click", checkWeather);

wrapContainer.onclick = (e) => {
  let target = e.target;
  if (target === document.querySelector(".del-btn")) {
    target.parentNode.remove();
  }
};
