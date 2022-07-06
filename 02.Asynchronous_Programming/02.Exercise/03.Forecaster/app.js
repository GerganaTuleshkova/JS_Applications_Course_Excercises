function attachEvents() {
    let locationElement = document.getElementById('location');
    let submitButton = document.getElementById('submit');
    let forecastDiv = document.getElementById('forecast');
    let currentElement = document.getElementById('current');
    let upcomingElement = document.getElementById('upcoming');
    submitButton.addEventListener('click', showForecast);

    let conditionMapper = {
        Sunny: "&#x2600", // ☀
        ["Partly sunny"]: '&#x26C5', // ⛅
        Overcast: '&#x2601', // ☁
        Rain: '&#x2614', // ☂
    }

    async function showForecast() {
        Array.from(currentElement.children).slice(1).forEach(e => e.remove());
        Array.from(upcomingElement.children).slice(1).forEach(e => e.remove());
        forecastDiv.style.display = 'block';

        try {
            let response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
            if (response.ok == false) {
                throw new Error('Site not found');
            };

            let data = await response.json();
            let locationObj = data.find(l => l.name == locationElement.value);

            if (!locationObj) {
                throw new Error('Location not found');
            }

            let currentConditionResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationObj.code}`);
            if (currentConditionResponse.ok == false) {
                throw new Error('Current forecast not found');
            };

            let currentConditionData = await currentConditionResponse.json();
            let divCurrent = document.createElement('div');
            divCurrent.className = 'forecasts';
            divCurrent.innerHTML = ''
            divCurrent.innerHTML = `\
            <span class="condition symbol">${conditionMapper[currentConditionData.forecast.condition]}</span>\
            <span class="condition">\
            <span class="forecast-data">${currentConditionData.name}</span>\
            <span class="forecast-data">${currentConditionData.forecast.low}&#176/${currentConditionData.forecast.high}&#176</span>\
            <span class="forecast-data">${currentConditionData.forecast.condition}</span>\
            </span>`
            currentElement.appendChild(divCurrent);

            let threeDayForecatsResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationObj.code}`);
            if (threeDayForecatsResponse.ok == false) {
                throw new Error('Upcoming forecast not found');
            };
            let threeDayForecatsData = await threeDayForecatsResponse.json();
            let divUpcoming = document.createElement('div');
            divUpcoming.className = 'forecast-info';
            divUpcoming.innerHTML = '';
            // for (let i = 0; i <= 3; i++) {
            //     divUpcoming.innerHTML += `\
            // <span class="upcoming">\
            // <span class="symbol">${conditionMapper[threeDayForecatsData.forecast[i].condition]}</span>\
            // <span class="forecast-data">${threeDayForecatsData.forecast[i].low}&#176/${threeDayForecatsData.forecast[0].high}&#176</span>\
            // <span class="forecast-data">${threeDayForecatsData.forecast[i].condition}</span>\
            // </span>`;

            // }
            divUpcoming.innerHTML += `\
            <span class="upcoming">\
            <span class="symbol">${conditionMapper[threeDayForecatsData.forecast[0].condition]}</span>\
            <span class="forecast-data">${threeDayForecatsData.forecast[0].low}&#176/${threeDayForecatsData.forecast[0].high}&#176</span>\
            <span class="forecast-data">${threeDayForecatsData.forecast[0].condition}</span>\
            </span>\
            <span class="upcoming">\
            <span class="symbol">${conditionMapper[threeDayForecatsData.forecast[1].condition]}</span>\
            <span class="forecast-data">${threeDayForecatsData.forecast[1].low}&#176/${threeDayForecatsData.forecast[0].high}&#176</span>\
            <span class="forecast-data">${threeDayForecatsData.forecast[1].condition}</span>\
            </span>\
            <span class="upcoming">\
            <span class="symbol">${conditionMapper[threeDayForecatsData.forecast[2].condition]}</span>\
            <span class="forecast-data">${threeDayForecatsData.forecast[2].low}&#176/${threeDayForecatsData.forecast[0].high}&#176</span>\
            <span class="forecast-data">${threeDayForecatsData.forecast[2].condition}</span>\
            </span>\
            `
            upcomingElement.appendChild(divUpcoming);
            locationElement.value = '';
        }
        catch (error) {
            forecastDiv.textContent = 'Error';
        }
    }
}

attachEvents();