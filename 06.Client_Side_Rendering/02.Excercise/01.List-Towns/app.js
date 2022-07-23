import { html, render } from './node_modules/lit-html/lit-html.js';

let cityTemplate = (citiesData) =>
    html`<ul>
    ${citiesData.map(c => html`<li>${c}</li>`)}
    </ul>`;

document.getElementById('btnLoadTowns').addEventListener('click', onclick);

function onclick(event) {
    event.preventDefault();

    let container = document.getElementById('root');
    
    let inputArray = document.getElementById('towns').value.split(', ')
    render(cityTemplate(inputArray), container);
}
