function getInfo() {
    
        let busStopID = document.getElementById('stopId').value;
        let submitButtonElement = document.getElementById('submit');
        let result = document.getElementById('result');
        let stopName = document.getElementById('stopName');
        let busesList = document.getElementById('buses');
    
        fetch(`http://localhost:3030/jsonstore/bus/businfo/${busStopID}`)
            .then(handleResponse)
            .then(displayBuses)
            .catch(displayError);
    
        function handleResponse(response) {
            if (response.ok == false) {
                throw new Error(`Error: ${response.status} (${response.statusText})`);
            }
            return response.json();
        }
    
        function displayBuses(data) {
            console.log(data);
            stopName.textContent = data.name;
            busesList.innerHTML = '';
            for (let [busNumber, time] of Object.entries(data.buses)) {
                let li = document.createElement('li');
                li.textContent = `Bus ${busNumber} arrives in ${time} minutes`;                
                busesList.appendChild(li);
            }
        }
    
        function displayError(error) {
            busesList.innerHTML ='';
            stopName.textContent = 'Error';
        }
    
}