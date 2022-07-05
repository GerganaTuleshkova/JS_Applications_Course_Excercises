// function getInfo() {

//         let busStopID = document.getElementById('stopId').value;
//         // let submitButtonElement = document.getElementById('submit');
//         // let result = document.getElementById('result');
//         let stopName = document.getElementById('stopName');
//         let busesList = document.getElementById('buses');

//         fetch(`http://localhost:3030/jsonstore/bus/businfo/${busStopID}`)
//             .then(handleResponse)
//             .then(displayBuses)
//             .catch(displayError);

//         function handleResponse(response) {
//             if (response.ok == false) {
//                 throw new Error(`Error: ${response.status} (${response.statusText})`);
//             }
//             return response.json();
//         }

//         function displayBuses(data) {
//             stopName.textContent = data.name;
//             busesList.innerHTML = '';
//             for (let [busNumber, minutes] of Object.entries(data.buses)) {
//                 let li = document.createElement('li');
//                 li.textContent = `Bus ${busNumber} arrives in ${minutes} minutes`;                
//                 busesList.appendChild(li);
//             }
//         }

//         function displayError(error) {
//             busesList.innerHTML ='';
//             stopName.textContent = 'Error';
//         }
// }

async function getInfo() {

    let busStopID = document.getElementById('stopId').value;
    let stopName = document.getElementById('stopName');
    let busesList = document.getElementById('buses');

    try {
        let response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${busStopID}`);
        if (response.ok == false) {
            throw new Error(`Error: ${response.status} (${response.statusText})`);
        }
        let data = await response.json();
        stopName.textContent = data.name;
        busesList.innerHTML = '';
        for (let [busNumber, minutes] of Object.entries(data.buses)) {
            let li = document.createElement('li');
            li.textContent = `Bus ${busNumber} arrives in ${minutes} minutes`;
            busesList.appendChild(li);
        }

    }
    catch (error) {
        busesList.innerHTML = '';
        stopName.textContent = 'Error';
    }
}