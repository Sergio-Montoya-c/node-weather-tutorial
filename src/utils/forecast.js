const request = require('request')
const accessKey = 'bc84f19c74dad11cf3bcf1c657a49320'

const forecast = ({ latitude, longitude, location } = {} , callback) => {
  console.log('Getting forecast...')
  const url =  `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}`

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to the service!', undefined)
    } else if (body.error) {
      callback(body.error.info, undefined)
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current
      callback(undefined, {
        temperature,
        feelslike,
        weather_descriptions,
        location
      })
    }
  })
}

module.exports = {
  forecast
}