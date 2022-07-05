function solve() {
    let baseUrl = 'http://localhost:3030/jsonstore/bus/schedule/';
    let infoElement = document.querySelector('.info');
    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');

    let busStop  = {
        next: 'depot',
    }

    async function depart() {
        arriveButton.disabled = false;
        departButton.disabled = true;
        try {
            let response = await fetch(`${baseUrl}${busStop.next}`);
            if (response.ok == false) {
                throw new Error(`Error: ${response.status} (${response.statusText})`);
            }
            let data = await response.json();
            busStop = Object.assign(data);
            infoElement.textContent = `Next stop ${busStop.name}`;
        }
        catch (error) {
            infoElement.textContent = `Error`;
            arriveButton.disabled = true;
            departButton.disabled = true;
            infoElement.style.backgroundColor = '#9C3107';
        }
    }

    function arrive() {
        arriveButton.disabled = true;
        departButton.disabled = false;
        infoElement.textContent = `Arriving at ${busStop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();

// function solve() {
//     const getRef = type => document.querySelector(type);
//     const [infoRef, departRef, arriveRef] = [getRef('.info'), getRef('#depart'), getRef('#arrive')];
//     const [url, infoDiv] = ['http://localhost:3030/jsonstore/bus/schedule/', getRef('#info')];
//     let data = { next: 'depot' };
 
//     async function depart() {
//         try {
//             data = await (await fetch(url + data.next)).json();
//             infoRef.textContent = `Next stop ${data.name}`;
//             changeStatus(departRef, arriveRef);
//         } catch (error) {
//             changeStatus(departRef, arriveRef, true);
//             infoRef.textContent = 'Error';
//             infoDiv.style.backgroundColor = '#9C3107';
//         }
//     }
 
//     function arrive() {
//         infoRef.textContent = `Arriving at ${data.name}`;
//         changeStatus(departRef, arriveRef);
//     }
 
//     return { depart, arrive };
// }
 
// let result = solve();
 
// function changeStatus(x, y, both) {
//     x.disabled = both || !x.disabled;
//     y.disabled = both || !y.disabled;
// }