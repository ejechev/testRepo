function getWeather(city) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ae077bc411e863a6ab7ead0fcacdb38`, true);
        xhr.send(null)

        xhr.addEventListener('load', function() {
            if(xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText))
            } else {
                reject(xhr.status)
            }
        })
    })
}