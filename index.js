const wrapContainer = document.querySelector(".wrap-container");
const cityInput = document.querySelector(".city-input");
const citiesWrapper = document.querySelector(".cities-wrapper");
const submitBtn = document.querySelector("#submit-btn");
const cityName = document.querySelector(".city-name");
const checkWeatherBtn = document.querySelector(".check-weather-btn");

checkWeatherBtn.addEventListener("click", () => {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=7G7aXU4h0HhOxh3j6pXbef6cmg4NGt6a&q=${cityName.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 1) {
        console.log("jest wiecej miast niz 1");
      }
      console.log(data);
      const cityInformations = `<span class="city-name">${data[0].EnglishName}</span>
        <img class="weather" alt="" src="" />
        <span class="temperature"></span>
        <button class="del-btn">-</button>`;
      const newCityTab = document.createElement("div");
      newCityTab.className = "city-container";
      newCityTab.innerHTML = cityInformations;
      citiesWrapper.appendChild(newCityTab);
    });
});

wrapContainer.onclick = (e) => {
  let target = e.target;
  if (target === document.querySelector(".del-btn")) {
    target.parentNode.remove();
  }
};
