const Schema = require('mongoose').Schema

const WindStats = new Schema({
    name: {
        type: String,
        required: true
    },
    wind_speed: {
        type: Number,
        required: true
    },
    wind_direction: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = require('mongoose').model('WindStats', WindStats)