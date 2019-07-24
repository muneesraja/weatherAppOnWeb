const express = require('express')
const app = express()
const portToListen = 3000
const path = require('path')
const hbs = require('hbs')
const whatToDo = require('./js/weather')
const port = process.env.PORT || 3000

const staticLocation = path.join(__dirname, '/templates')
const partialsLocation = path.join(staticLocation, '/partials')

app.set('view engine', 'hbs')
app.set('views', staticLocation)
app.use(express.static(staticLocation))
hbs.registerPartials(partialsLocation)

app.get('/', (req, res) => {
    res.render('index', {
        title:"Welcome to The index page!"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:"Here you can get help!"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:"About us !"
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:"Enter a location"
        })
    }
    whatToDo.findCoordinates(req.query.search, (error, response) => {
        if(error){
            return res.send({error})
        }
        whatToDo.findWeather(response.longi, response.lati, (error, responseWeather) => {
            if(error){
                return res.send({error})
            }
            res.send({summary:responseWeather.summary, temp:responseWeather.temp, location:response.location, highTemp:responseWeather.higherTemp, lowTemp:responseWeather.lowerTemp})
        })
    })    
})

app.get('*', (req, res) => {
    res.send("Page Not Found")
})

app.listen(port, console.log('Server succcessfully started at the port ' + port))

