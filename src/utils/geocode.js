const request = require('request')

const geocode = (address, callback) => {
  console.log('Getting geocodes...')
  const mapBoxAccessKey = 'pk.eyJ1IjoiY2hla29tYyIsImEiOiJja2Q0bTNzdm8wZzQyMnhvZDJuOTgwNnY3In0.7ccxs8A0OL7yYC9y-jU8qg'
  const mapBoxBaseURL = 'https://api.mapbox.com/'
  const mapBoxURL = `${mapBoxBaseURL}geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBoxAccessKey}&limit=1`
  request({ url: mapBoxURL, json: true}, (error, { body } = {}) => {
    if (error) {
      callback('Unnable to connect to location services!', undefined)
    } else if (!body.features[0]) {
      callback('Unnable to find address', undefined)
    } else {
      const city = body.features[0]
      callback(undefined, {
        longitude: city.center[0],
        latitude: city.center[1],
        location: city.place_name
      })
    }
  })
}

module.exports = {
  geocode
}