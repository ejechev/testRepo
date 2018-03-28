document.addEventListener('DOMContentLoaded', function () {
    function getCity() {
        return document.getElementById('city').value
    }

    var getTodayWeather = function () {
        document.getElementById('forecast').style.display = 'none'
        getWeather(`${API_URL}/data/2.5/weather?q=${getCity()}&appid=${OPENWEATHER_KEY}`).then(function (data) {
            let weatherToday = data;
            document.getElementById('info-wrapper').style.display = 'block';
            document.getElementById('city-name').textContent = `Град: ${weatherToday.name}`;
            document.getElementById('weather-description').textContent = `Днес времето ще бъде ${weatherToday.weather[0].description}`;
            document.getElementById('weather-temps').textContent = `Температурата в момента е ${Math.round(weatherToday.main.temp - KELVIN_CONSTANT)} градуса`
        }).catch(function (error) {
            throw new Error(error.message)
        })

    }
    document.getElementById('enter-city').addEventListener('click', getTodayWeather)


    var getThreeDayForecasat = function () {
        getForecast(`${API_URL}/data/2.5/forecast?q=${getCity()}&appid=${OPENWEATHER_KEY}`).then(function (data) {
            if (data.list[0]) {
                document.getElementById('forecast').style.display = 'block';
                document.getElementById('img-day-one').src = `${API_URL}/img/w/${data.list[0].weather[0].icon}.png`
                document.getElementById('day-one').textContent = `Утре времето ще бъде ${data.list[0].weather[0].description}`;
                document.getElementById('day-one-temp').textContent = `Със средна температура от ${Math.round(data.list[0].main.temp - KELVIN_CONSTANT)} градуса`;
            } else {
                document.getElementById('day-one').textContent = `Липсва информация за този ден`
            }

            if (data.list[1]) {
                document.getElementById('img-day-two').src = `${API_URL}/img/w/${data.list[1].weather[0].icon}.png`
                document.getElementById('day-two').textContent = `В други ден времето ще бъде ${data.list[1].weather[0].description}`;
                document.getElementById('day-two-temp').textContent = `Със средна температура от ${Math.round(data.list[1].main.temp - KELVIN_CONSTANT)} градуса`;
            } else {
                document.getElementById('day-one').textContent = `Липсва информация за този ден`
            }

            if (data.list[2]) {
                document.getElementById('img-day-three').src = `${API_URL}/img/w/${data.list[2].weather[0].icon}.png`
                document.getElementById('day-three').textContent = `След 3 дена времето ще бъде ${data.list[2].weather[0].description}`;
                document.getElementById('day-three-temp').textContent = `Със средна температура от ${Math.round(data.list[2].main.temp - KELVIN_CONSTANT)} градуса`;
            } else {
                document.getElementById('day-one').textContent = `Липсва информация за този ден`
            }

        }).catch(function (error) {
            throw new Error(error.message)
        })
    }
    document.getElementById('see-forecast').addEventListener('click', getThreeDayForecasat);


})