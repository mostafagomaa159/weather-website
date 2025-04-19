
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port= process.env.PORT || 3000
//Define paths to Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mostafa Gomaa'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me Text',
        name: 'Mostafa Gomaa'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me Text',
        name: 'Mostafa Gomaa'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.address
            })


        })
    })



})
app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': '404',
        name: 'Mostafa Gomaa',
        errorMessage: 'Help Artical not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': '404',
        name: 'Mostafa Gomaa',
        errorMessage: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is Up on Port .' + port)
})