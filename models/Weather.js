const Schema = require('mongoose').Schema

const Weather = new Schema({
    name: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    wind_speed: {
        type: Number,
        required: true
    },
    wind_direction: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = require('mongoose').model('Weather', Weather)