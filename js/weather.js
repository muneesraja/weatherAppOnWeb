const request = require('request');

const findCoordinates = (location, callback) => {
    urlToFindCo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibXVuZWVzcmFqYSIsImEiOiJjank0cXNxdzcwM3RsM25uenA2cDc0anl0In0.A2DfOTaEru5QEmH2Dirzqg`
    request({url:urlToFindCo, json:true}, (error, response) => {
        if (error){
            callback('Could not connect to the location service', undefined)
        }else if(response.body.features.length == 0){
            callback('Enter a valid Location', undefined)
        }else{
            callback(undefined ,{ lati:response.body.features[0].center[0], longi:response.body.features[0].center[1], location:response.body.features[0].place_name})
        }
    })
}

const findWeather = (latitude, longitude, callback) => {
    urlToFindWeather = `https://api.darksky.net/forecast/b8fe3df2fdfd02c711f6e1e9da198194/${latitude},${longitude}`
    request({url:urlToFindWeather, json:true}, (error, response) => {
        if(error){
            callback('Could not connect to the weather Service', undefined)
        }
        else if(response.body.error){
            callback('The given location is invalid', undefined)
        }else{
            callback(undefined, {summary:response.body.currently.summary, temp:response.body.currently.temperature, higherTemp:response.body.daily.data[0].apparentTemperatureHigh, lowerTemp:response.body.daily.data[0].apparentTemperatureLow})
        }
    })
}

module.exports = {
    findCoordinates,
    findWeather
}