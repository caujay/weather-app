const wrapContainer = document.querySelector(".wrap-container");
console.log(wrapContainer);

const delBtn = document.querySelector(".del-btn");

delBtn.addEventListener( 'click', function() {
    
}

fetch("https://api.oceandrivers.com:443/v1.0/getAemetStation/lodz/lastdata/")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const cityTab = `<div class="city-container">
    <span class="city-name">Lodz</span>
    <img class="weather" alt="" src="" />
    <span class="temperature">${data.TEMPERATURE}</span>
    <button class="del-btn">-</button>
    </div>`;
    wrapContainer.innerHTML = cityTab;
  });
  