document.addEventListener('DOMContentLoaded', function () {
    var getCity = function () {
        return city.value
    };
    var howManyDays = function () {
        return daysSelect.value
    };
    var daysSelect = document.getElementById('days-for-forecast');
    var city = document.getElementById('city');
    var infoWrapper = document.getElementById('info-wrapper');
    var cityName = document.getElementById('city-name');
    var weatherDescription = document.getElementById('weather-description');
    var currentTemp = document.getElementById('weather-temps');
    var cityInputButton = document.getElementById('enter-city');
    var seeForecastButton = document.getElementById('see-forecast');
    var forecastInformation = document.getElementById('forecast');

    var getTodayWeather = function () {
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


    var getThreeDayForecasat = function () {
            forecastInformation.innerHTML = '';
        getForecast(`${API_URL}${FORECAST_ROUTE}${getCity()}${OPENWEATHER_KEY}`).then(function (data) {
            forecastInformation.style.display = 'block';
            for (let day = 0; day < howManyDays(); day++) {
                    let dayDiv = document.createElement('div');
                    
                if (data.list[day]) {
                    let dayImg = document.createElement('img');
                    let dayH3 = document.createElement('h3');
                    let dayDescription = document.createElement('p')

                    dayDiv.classList.add('days-forecast');
                    dayImg.src = `${API_URL}/img/w/${data.list[day].weather[0].icon}.png`;
                    dayH3.textContent = `Утре времето ще бъде ${data.list[day].weather[0].description}`;
                    dayDescription.textContent = `Със средна температура от ${Math.round(data.list[day].main.temp - KELVIN_CONSTANT)} градуса`;

                    dayDiv.appendChild(dayImg);
                    dayDiv.appendChild(dayH3);
                    dayDiv.appendChild(dayDescription);
                } else {
                    var dayDescription = document.createElement('p');
                    dayDescription.textContent = `Липсва информация за този ден`;
                    dayDiv.appendChild(dayDescription);
                }
                forecastInformation.appendChild(dayDiv);
            }


        }).catch(function (error) {
            throw new Error(error.message)
        })
    }
    seeForecastButton.addEventListener('click', getThreeDayForecasat);
})