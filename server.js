const fetch = require('node-fetch')
const mongoose = require('mongoose')
const express = require('express')

const destinations = require('./helpers/destinations')
const Weather = require('./models/Weather')
const WindStats = require('./models/WindStats')
const getWindDirection = require('./helpers/getWindDirection')

require('dotenv').config()
const app = express()
app.use('/', express.static(__dirname + '/public/index.html'))

const today = new Date()
const db = mongoose.connection

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.ngxoc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

db.on('connected', () => {
    console.log('Connected')

    app.listen(process.env.PORT || 8080, () => console.log('Listening...'))

    setInterval(() => destinations.forEach(city => getWeather(city)), 60000)

    let canRun = true
    setInterval(() => {
        if (today.getHours() === 23 && canRun) {
            updateStatistics()
            canRun = false
        }
        if (today.getHours() === 0) canRun = true
    }, 1000)
})

const getWeather = async city => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.API_KEY}`

    await fetch(url)
        .then(res => res.json())
        .then(async json => {
            const wind = getWindDirection(json.wind.deg)
            const weather = new Weather({
                name: json.name,
                temperature: (json.main.temp - 273.15).toFixed(2),
                wind_speed: (json.wind.speed * 3.6).toFixed(2),
                wind_direction: wind,
                date: `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
            })

            await weather.save()
            console.log('Data added')
        })
        .catch(err => console.error(err))
}

const updateStatistics = async () => {
    destinations.forEach( async city => {
        await Weather.find({ name: city.name, date: `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}` }, async (err, cityWeather) => {
            if (err) return console.error(err)

            let speed = 0

            for (let i = 0; i < cityWeather.length; i++) {
                speed += cityWeather[i].wind_speed
            }

            const wind = new WindStats({
                name: city.name,
                wind_speed: speed / cityWeather.length,
                date: city.date
            })

            await wind.save()
            console.log('Statistics updated')
        })
    })
}

app.get('/all_cities', async (req, res) => {
    const data = await Weather.find()
    res.status(200).send(data)
})

app.get('/city/:city', async (req, res) => {
    const city = req.params.city
    const data = await Weather.find({name: city})
    res.status(200).send(data)
})

app.get('/cities', async (req, res) => {
    const data = await Weather.find()
    const temp = data.map(city => city.name)
    const result = temp.filter((v,i) => temp.indexOf(v) === i)
    res.status(200).send(result)
})

app.get('/stats', async (req, res) => {
    const data = await WindStats.find()
    res.status(200).send(data)
})
