const wrapContainer = document.querySelector(".wrap-container");
const cityInput = document.querySelector(".city-input");
const citiesWrapper = document.querySelector(".cities-wrapper");
const submitBtn = document.querySelector("#submit-btn");
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
  <span class="temperature">${region}</span>;`;
};

const cityChoose = () => {};

checkWeatherBtn.addEventListener("click", () => {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=7G7aXU4h0HhOxh3j6pXbef6cmg4NGt6a&q=${cityName.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 1) {
        cityChooseDiv.classList.add("city-choose__fade");
        for (let i = 0; i < data.length; i++) {
          const cityToChoose = document.createElement("div");
          cityToChoose.className = "city-to-choose";
          cityToChoose.innerHTML = cityCardToChoose(
            data[i].EnglishName,
            data[i].AdministrativeArea.EnglishName
          );
          cityChooseDiv.appendChild(cityToChoose);
        }
        cityChooseDiv.onclick = (e) => {
          let target = e.target;
          if (target === document.querySelector(".city-to-choose")) {
            console.log(target);
          }
        };
      } else {
        fetch(
          `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${data[0].Key}?apikey=7G7aXU4h0HhOxh3j6pXbef6cmg4NGt6a&language=pl-PL`
        )
          .then((res) => res.json())
          .then((city) => {
            const newCityTab = document.createElement("div");
            newCityTab.className = "city-container";
            newCityTab.innerHTML = cityInformations(
              data[0].EnglishName,
              city[0].Temperature.Value
            );
            citiesWrapper.appendChild(newCityTab);
          });
      }
    });
});

wrapContainer.onclick = (e) => {
  let target = e.target;
  if (target === document.querySelector(".del-btn")) {
    target.parentNode.remove();
  }
};
