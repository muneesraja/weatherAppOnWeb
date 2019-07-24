const whatToDo = require('./weather')

location = 'chennai'
whatToDo.findCoordinates(location, (error, response) => {
    if(error){
        return console.log(error)
    }
    whatToDo.findWeather(response.longi, response.lati, (error, responseWeather) => {
        if(error){
            return console.log(error)
        }
        console.log(responseWeather.summary, responseWeather.temp + ' Degree')
    })
})