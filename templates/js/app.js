
console.log("Js file loaded successfully")

// fetch('http://127.0.0.1:3000/weather?search=chennai').then((res) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })

const formVar = document.querySelector('form')

formVar.addEventListener('submit', (e) => {
    e.preventDefault()
    const inpuVal = document.querySelector('input').value
    const locationDisp = document.getElementById("location")
    const weatherDisplay = document.querySelector("#weather")
    locationDisp.textContent = "Loading..."
    weatherDisplay.textContent = ""
    if(!inpuVal){
        return weatherDisplay.textContent = "Enter a location"
    }

    const url = `weather?search=${inpuVal}`    
    fetch(url).then((res) => {
        res.json().then((data) => {
            if(data.error){
                return weatherDisplay.textContent = data.error;
            }
            locationDisp.textContent = `location: ${data.location}`
            weatherDisplay.textContent = `Summary : ${data.summary} and temperature is ${data.temp} degree and the Highest temp is ${data.highTemp} and lowest temp is ${data.lowTemp}`;
        })
    })
})