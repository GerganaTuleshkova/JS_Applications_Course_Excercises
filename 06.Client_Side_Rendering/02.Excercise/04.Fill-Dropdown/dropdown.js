import { html, render } from './node_modules/lit-html/lit-html.js';

let url = 'http://localhost:3030/jsonstore/advanced/dropdown';

renderAllOptions();

let form = document.querySelector('form');
document.querySelector('input[value="Add"]').addEventListener('click', addItem);

async function addItem(event) {
    event.preventDefault();
    // let formData = new FormData(form);
    let newOption = document.getElementById('itemText').value;

    try {
        if (newOption == '') {
            throw new Error('Cannot be blank');
        }

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: newOption}),
        });

        if (response.ok == false) {
            throw new Error('Option was not created!');
        }
        // getOptions();
        form.reset();

    } catch (err) {
        alert(err.message);
    }

    renderAllOptions();
}

async function renderAllOptions() {
    const selectElement = document.getElementById('menu');
    let optionTemplate = (option) =>
        html`<option value=${option._id}>${option.text}</option>`;

    try {
        let response = await fetch(url);

        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let optionsObj = await response.json();
        let optionsList = Object.values(optionsObj);

        render(optionsList.map(optionTemplate), selectElement);
    } catch (error) {
        alert(error.message);
    }
}

addItem();