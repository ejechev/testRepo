document.addEventListener('DOMContentLoaded', function() {
        function getCity() {
            return document.getElementById('city').value
        }
    document.getElementById('enterCity').addEventListener('click', function() {
        let city = document.getElementById('city').value 
        getWeather(getCity()).then(function(data) {
            let weatherToday = data;
            document.getElementById('infoWraper').style.display = 'block';
            document.getElementById('cityName').textContent = `Град: ${weatherToday.name}`;
            document.getElementById('weatherDescription').textContent = `Днес времето ще бъде ${weatherToday.weather[0].description}`;
            document.getElementById('weatherTemps').textContent = `Температурата в момента е ${Math.round(weatherToday.main.temp - 273.15)} градуса`
        })
        
    })
    document.getElementById('seeForecast').addEventListener('click',function() {
        
        getForecast(getCity()).then(function(data) {
            document.getElementById('forecast').style.display = 'block';
            document.getElementById('imgDayOne').src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`
            document.getElementById('dayOne').textContent = `Утре времето ще бъде ${data.list[0].weather[0].description}`;
            document.getElementById('dayOneTemp').textContent = `Със средна температура от ${Math.round(data.list[0].main.temp - 273.15)} градуса`;
            
            document.getElementById('imgDayTwo').src = `http://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png`
            document.getElementById('dayTwo').textContent = `В други ден времето ще бъде ${data.list[1].weather[0].description}`;
            document.getElementById('dayTwoTemp').textContent = `Със средна температура от ${Math.round(data.list[1].main.temp - 273.15)} градуса`;
            
            document.getElementById('imgDayThree').src = `http://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png`
            document.getElementById('dayThree').textContent = `След 3 дена времето ще бъде ${data.list[2].weather[0].description}`;
            document.getElementById('dayThreeTemp').textContent = `Със средна температура от ${Math.round(data.list[2].main.temp - 273.15)} градуса`;
            
            
        })
    })


})