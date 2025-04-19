const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=fcf973f86eb0a6555a7e5cc1bffc92eb&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. The humidity is ' + body.current.humidity + '%')
        }
    })
}
module.exports = forecast


