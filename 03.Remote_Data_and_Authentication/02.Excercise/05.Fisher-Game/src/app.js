
let url = 'http://localhost:3030/data/catches';
let catches = document.getElementById('catches');
let navSpan = document.querySelector('nav span');
const userId = sessionStorage.getItem('_id')
const token = sessionStorage.getItem('accessToken');
let addButton = document.querySelector('.add');



catches.addEventListener('click', editCatch);
catches.addEventListener('click', deleteCatch);
addButton.addEventListener('click', addCatch);

window.addEventListener('load', async () => {
    document.getElementById('logout').addEventListener('click', () => {
        const token = sessionStorage.getItem('accessToken');

        fetch('http://localhost:3030/users/logout', {
            headers: {
                'X-Authorization': token,
            },
        });

        sessionStorage.removeItem('accessToken');
        window.location = '/src';
    });

    // checkUser();
    // const main = document.querySelector('main');
    let loadButton = document.querySelector('.load');
    loadButton.addEventListener('click', loadCatches);
    catches.innerHTML = '';
});

// export function checkUser() {
//     const token = sessionStorage.getItem('accessToken');
//     const email = sessionStorage.getItem('email');

//     if (token != null) {
//         document.getElementById('user').style.display = 'inline-block';
//         document.getElementById('guest').style.display = 'none';
//         navSpan.textContent = email;        
//     } else {
//         document.getElementById('user').style.display = 'none';
//         document.getElementById('guest').style.display = 'inline-block';
//     }
// }

async function loadCatches() {
    try {
        catches.innerHTML = ''
        let response = await fetch(url);
        if (response.ok == false) {
            throw new Error('Error obtaining data!');
        }

        let data = await response.json();

        for (let { _ownerId, angler, weight, species, location, bait, captureTime, _id, } of Object.values(data)) {
            let catchChild = createCatchDiv(angler, weight, species, location, bait, captureTime, _id);
            if (userId != _ownerId) {
                catchChild.querySelectorAll('button').forEach(b => b.disabled = true);
            }

            catches.appendChild(catchChild);

        }

        const token = sessionStorage.getItem('accessToken');

        if (token == null) {
            Array.from(document.querySelectorAll('button')).filter(b => b.className != 'load').forEach(b => b.disabled = true);
        }

    } catch (error) {
        alert(error.message)
    }
}

async function editCatch(event) {
    if (event.target.className == 'update') {
        try {
            let currentCatch = event.target.parentElement;
            let id = event.target.getAttribute('data-id');

            let [angler, weight, species, location, bait, captureTime] = Array.from(currentCatch.querySelectorAll('input'));

            if (!angler.value
                || !weight.value
                || !species.value
                || !location.value
                || !bait.value
                || !captureTime.value
            ) {
                throw new Error('All fields are required');
            }

            if (!Number.isInteger(Number(captureTime.value))) {
                throw new Error('Capture time must be an integer');
            }

            if (isNaN(Number(weight.value))) {
                throw new Error('Weight must be a number');
            }

            let response = await fetch(url + '/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token,
                },
                body: JSON.stringify({
                    angler: angler.value,
                    weight: weight.value,
                    species: species.value,
                    location: location.value,
                    bait: bait.value,
                    captureTime: captureTime.value,
                })
            });
            if (response.ok == false) {
                throw new Error('Error updating catch!');
            }

            loadCatches()

        } catch (error) {
            alert(error.message);
        }
    }
}

async function deleteCatch(event) {
    if (event.target.className == 'delete') {
        try {
            // let currentCatch = event.target.parentElement;
            let id = event.target.getAttribute('data-id');

            let response = await fetch(url + '/' + id, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': token,
                },

            });
            if (response.ok == false) {
                throw new Error('Error deleting catch!');
            }

            loadCatches()

        } catch (error) {
            alert(error.message);
        }
    }
}

async function addCatch(event) {
    event.preventDefault()
    let form = document.getElementById('addForm');

    console.log(token)

    try {
        let [angler, weight, species, location, bait, captureTime] = Array.from(form.querySelectorAll('input'));
        if (!angler.value
            || !weight.value
            || !species.value
            || !location.value
            || !bait.value
            || !captureTime.value
        ) {
            throw new Error('All fields are required');
        }

        if (!Number.isInteger(Number(captureTime.value))) {
            throw new Error('Capture time must be an integer');
        }

        if (isNaN(Number(weight.value))) {
            throw new Error('Weight must be a number');
        }

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
            body: JSON.stringify({
                angler: angler.value,
                weight: weight.value,
                species: species.value,
                location: location.value,
                bait: bait.value,
                captureTime: captureTime.value,
            })
        });
        if (response.ok == false) {
            throw new Error('Error updating catch!');
        }

        loadCatches();
        form.reset();

    } catch (error) {
        alert(error.message)
    }

}

function createCatchDiv(angler, weight, species, location, bait, captureTime, _id) {

    let catchDiv = document.createElement('div');
    catchDiv.className = 'catch';
    catchDiv.innerHTML = `\
    <label>Angler</label>\
    <input type="text" class="angler" value=${angler}>\
    <label>Weight</label>\
    <input type="text" class="weight" value=${weight}>\
    <label>Species</label>\
    <input type="text" class="species" value=${species}>\
    <label>Location</label>\
    <input type="text" class="location" value=${location}>\
    <label>Bait</label>\
    <input type="text" class="bait" value=${bait}>\
    <label>Capture Time</label>
    <input type="number" class="captureTime" value=${captureTime}>\
    <button class="update" data-id=${_id}>Update</button>\
    <button class="delete" data-id=${_id}>Delete</button>`

    return catchDiv;
}