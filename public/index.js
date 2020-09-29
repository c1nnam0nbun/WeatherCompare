let table = document.getElementById('data_table')

const getCityData = (cityName) => {
    const elems = document.getElementsByTagName('tr')
    for (let i = elems.length - 1; i > 0; --i) {
        elems.item(i).remove()
    }

    document.getElementById('temp').style.display = 'block'

    fetch(`https://weather-stats.herokuapp.com/city/${cityName}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(city => {
                let tableContent = '<tr>'
                tableContent += 
                    "<td>" + city.name + "</td>" + 
                    "<td>" + city.temperature + "</td>" +
                    "<td>" + city.wind_speed + "</td>" +
                    "<td>" + city.date + "</td>"
                tableContent += '</tr>'
                table.innerHTML += tableContent 
            }) 
        })
        .catch(err => console.error(err))
}

const allCitiesBtn = document.getElementById('all_cities')
allCitiesBtn.addEventListener('click', () => getAllCities())


const getAllCities = () => {
    const elems = document.getElementsByTagName('tr')
    for (let i = elems.length - 1; i > 0; --i) {
        elems.item(i).remove()
    }

    document.getElementById('temp').style.display = 'block'

    fetch(`https://weather-stats.herokuapp.com/all_cities`)
        .then(response => response.json())
        .then(data => {
            data.forEach(city => {
                let tableContent = '<tr>'
                tableContent += 
                    "<td>" + city.name + "</td>" + 
                    "<td>" + city.temperature + "</td>" +
                    "<td>" + city.wind_speed + "</td>" +
                    "<td>" + city.date + "</td>"
                tableContent += '</tr>'
                table.innerHTML += tableContent 
            }) 
        })
        .catch(err => console.error(err))
}

const statsBtn = document.getElementById('stats')
statsBtn.addEventListener('click', () => getStats())

const getStats = () => {
    const elems = document.getElementsByTagName('tr')
    for (let i = elems.length - 1; i > 0; --i) {
        elems.item(i).remove()
    }

    document.getElementById('temp').style.display = 'none'

    fetch(`https://weather-stats.herokuapp.com//stats`)
        .then(response => response.json())
        .then(data => {
            data.forEach(city => {
                let tableContent = '<tr>'
                tableContent += 
                    "<td>" + city.name + "</td>" + 
                    "<td>" + city.wind_speed + "</td>" +
                    "<td>" + city.date + "</td>"
                tableContent += '</tr>'
                table.innerHTML += tableContent 
            }) 
        })
        .catch(err => console.error(err))
}

fetch('https://weather-stats.herokuapp.com//cities')
    .then(response => response.json())
    .then(data => {
        data.forEach(name => {
            let button = document.createElement('button')
            button.innerText = name
            button.addEventListener('click', () => getCityData(name))
            document.body.insertBefore(button, table)
        })
    })
