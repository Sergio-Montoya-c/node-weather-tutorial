console.log('Client side JS loaded')

const forecastText = document.querySelector('.forecast')
const weatherForm = document.querySelector('form')

const weatherCallback = result => {
  result.json().then(result => {
    if (result.error) return showForecastError(result)
    showForecast(result)
  })
}

const showForecastError = ({error}) => {
  forecastText.innerHTML = error
}

const showForecast = result => {
  const {temperature, feelslike, weather_descriptions, location} =  result

  forecastText.innerHTML = `
    Thanks for using this app!
    The weather in ${location} is ${weather_descriptions[0]} with a temperature of ${temperature} but it fells like ${feelslike}
  `
}

const fetchForecast = event => {
  event.preventDefault()
  const address = document.querySelector('input')
  forecastText.innerHTML = 'Getting forecast data...'
  fetch(`/weather?address=${address.value}`).then(weatherCallback)
}

weatherForm.addEventListener('submit', fetchForecast)