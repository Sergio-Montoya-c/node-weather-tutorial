const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

const app = express()
const PORT = process.env.PORT || 3000

// Define paths for express condifuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs' )
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

const indexPage = (req, res) => {
  const pageInfo = {
    title: 'Weather App',
    name: 'Sergio Montoya'
  }
  res.render('index', pageInfo)
}

const aboutPage = (req, res) => {
  const pageInfo = {
    title: 'About page',
    name: 'Sergio Montoya'
  }
  res.render('about', pageInfo)
}

const helpPage = (req, res) => {
  const pageInfo = {
    title: 'Help page',
    name: 'Sergio Montoya',
    message: "This is the message in help page!"
  }
  res.render('help', pageInfo)
}

const helpNotFound = (req, res) => {
  const pageInfo = {
    message: 'Article not found :('
  }
  res.render('404', pageInfo)
}

const weatherPage = (req, res) => {
  const { address } = req.query

  if (!address) {
    return res.send({
      error: 'Please provide an address'
    })
  }

  const forecastCallback = (error, result) => {
    if (error) { return res.send({error})}
    res.send(result)
  }

  const geocodeCallback = (error, result)  => {
    if (error) { return res.send({error})}
    forecast(result, forecastCallback)
  }

  geocode(address, geocodeCallback)

}

const prodcutsPage = (req, res) => {
  const products = {
    products: []
  }
  res.send(products)
}

const notFoundPage = (req, res) => {
  const pageInfo = {
    message: 'Page not found'
  }
  res.render('404', pageInfo)
}

app.get('', indexPage)
app.get('/weather', weatherPage)
app.get('/products', prodcutsPage)
app.get('/about', aboutPage)
app.get('/help', helpPage)
app.get('/help/*', helpNotFound)
app.get('*', notFoundPage)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})