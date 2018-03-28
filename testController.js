document.addEventListener('DOMContentLoaded', function () {
    let getCity = function () {
        return city.value
    };
    let howManyDays = function () {
        return daysSelect.value
    };
    let daysSelect = document.getElementById('days-for-forecast');
    let city = document.getElementById('city');
    let infoWrapper = document.getElementById('info-wrapper');
    let cityName = document.getElementById('city-name');
    let weatherDescription = document.getElementById('weather-description');
    let currentTemp = document.getElementById('weather-temps');
    let cityInputButton = document.getElementById('enter-city');
    let seeForecastButton = document.getElementById('see-forecast');
    let forecastInformation = document.getElementById('forecast');

    let getTodayWeather = function () {
        document.getElementById('forecast').style.display = 'none'
        getWeather(`${API_URL}${TODAY_WEATHER_ROUTE}${getCity()}${OPENWEATHER_KEY}`).then(function (data) {
            let weatherToday = data;
            infoWrapper.style.display = 'block';
            cityName.textContent = `Град: ${weatherToday.name}`;
            weatherDescription.textContent = `Днес времето ще бъде ${weatherToday.weather[0].description}`;
            currentTemp.textContent = `Температурата в момента е ${Math.round(weatherToday.main.temp - KELVIN_CONSTANT)} градуса`
        }).catch(function (error) {
            throw new Error(error.message)
        })

    }
    cityInputButton.addEventListener('click', getTodayWeather)


    let getThreeDayForecasat = function () {
            forecastInformation.innerHTML = '';
        getForecast(`${API_URL}${FORECAST_ROUTE}${getCity()}${OPENWEATHER_KEY}`).then(function (data) {
            forecastInformation.style.display = 'block';
            let forecastDiv = document.createElement('div');
            for (let day = 0; day < howManyDays(); day++) {
                    let dayDiv = document.createElement('div');
                    
                if (data.list[day]) {
                    let dayImg = document.createElement('img');
                    let dayH3 = document.createElement('h3');
                    let dayDescription = document.createElement('p')

                    dayDiv.classList.add('days-forecast');
                    dayImg.src = `${API_URL}/img/w/${data.list[day].weather[0].icon}.png`;
                    dayH3.textContent = `След ${daysSelect.options[day].text} времето ще бъде ${data.list[day].weather[0].description}`;
                    dayDescription.textContent = `Със средна температура от ${Math.round(data.list[day].main.temp - KELVIN_CONSTANT)} градуса`;

                    dayDiv.appendChild(dayImg);
                    dayDiv.appendChild(dayH3);
                    dayDiv.appendChild(dayDescription);
                } else {
                    let dayDescription = document.createElement('p');
                    dayDescription.textContent = `Липсва информация за този ден`;
                    dayDiv.appendChild(dayDescription);
                }
                forecastDiv.appendChild(dayDiv);
            }
            forecastInformation.appendChild(forecastDiv);

        }).catch(function (error) {
            throw new Error(error.message)
        })
    }
    seeForecastButton.addEventListener('click', getThreeDayForecasat);
})
