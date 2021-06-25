import { checkWeather } from "./index.js";

const cityName = document.querySelector(".city-name");

cityName.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkWeather();
  }
});
