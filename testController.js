document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('home').addEventListener('click', function() {
        console.log('vleze')
        getWeather('sofia').then(function(data) {
            console.log(data)
        })
    })
})