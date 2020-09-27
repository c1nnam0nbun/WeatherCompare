function getWindDirection(degrees) {
    switch (degrees) {
        case (degrees > 348.75 && degrees < 11.25):
            return 'N'
        case (degrees > 11.25 && degrees < 33.75):
            return 'NNE'
        case (degrees > 33.75 && degrees < 56.25):
            return 'NE'
        case (degrees > 56.25 && degrees < 78.75):
            return 'ENE'
        case (degrees > 78.75 && degrees < 101.25):
            return 'E'
        case (degrees > 101.25 && degrees < 123.75):
            return 'ESE'
        case (degrees > 123.75 && degrees < 146.25):
            return 'SE'
        case (degrees > 146.25 && degrees < 168.75):
            return 'SSE'
        case (degrees > 168.75 && degrees < 191.25):
            return 'S'
        case (degrees > 191.25 && degrees < 213.75):
            return 'SSW'
        case (degrees > 213.75 && degrees < 236.25):
            return 'SW'
        case (degrees > 236.25 && degrees < 258.75):
            return 'WSW'
        case (degrees > 258.75 && degrees < 281.25):
            return 'W'
        case (degrees > 281.25 && degrees < 303.75):
            return 'WNW'
        case (degrees > 303.75 && degrees < 326.25):
            return 'NW'
        case (degrees > 326.25 && degrees < 348.75):
            return 'NNW'
        default: return 'Not provided'
    }
}

module.exports = getWindDirection