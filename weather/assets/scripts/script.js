let testDivElement = document.getElementById("test-div");

let weather = {
    dublin: [12, 87],
    wolves: [11, 91],
    bristol: [11, 94],
    dubai: [26, 33],
    nuuk: [-12, 71],
    getWeather(city) {
        return this[city];
    }
}

function handleButtonClick(event) {
    let cityElement = document.getElementById("city");
    let cityName = cityElement.value;
    if (cityName.toLowerCase() in weather) {
        let cityWeather = weather.getWeather(cityName.toLowerCase());
        testDivElement.innerHTML = `
            <p>The temperature in ${cityName} is ${cityWeather[0]}°C and the humidity is ${cityWeather[1]}%.</p>
        `;
    }
    else {
        testDivElement.innerHTML = `
            <p>City not found!.</p>
        `;
    }
}

let buttonElement = document.getElementById("input-button");
buttonElement.addEventListener('click', handleButtonClick);