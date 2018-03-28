var OPENWEATHER_KEY = '3ae077bc411e863a6ab7ead0fcacdb38';
var API_URL = 'http://api.openweathermap.org';
var KELVIN_CONSTANT = 273.15;

function getWeather(weatherURL) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', weatherURL, true);
        xhr.send(null);

        xhr.addEventListener('load', function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (xhr.getResponseHeader('content-type').indexOf('json') > -1) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    throw new Error('Response is not valid JSON file')
                };
            } else {
                reject(JSON.parse(xhr.responseText));
            };
        });
    });
};

function getForecast(weatherURL) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', weatherURL, true);
        xhr.send(null);
        xhr.addEventListener('load', function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (xhr.getResponseHeader('content-type').indexOf('json') > -1) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    throw new Error('Response is not valid JSON file')
                };
            } else {
                reject(JSON.parse(xhr.responseText));
            };
        });
    });
};