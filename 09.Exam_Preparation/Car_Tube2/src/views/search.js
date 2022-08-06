import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, getCarsByQuery, getCarsByUserId } from '../api/cars.js';


const searchTemplate = (cars, onSearchClick) => html`
<section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button @click=${onSearchClick} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            <div class="listings">

            ${cars.length == 0
            ? html`<p class="no-cars"> No results.</p>`
            : html`${cars.map(carTemplate)}`
            }

            </div>
        </section>
    `;

const carTemplate = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/catalog/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
    `;


export async function searchView(ctx) {
    // let query = 0;
    // console.log(ctx)


    // if (ctx.query) {
    //     query = ctx.query;
    // console.log(query)

    // }

    // let cars = await getCarsByQuery(query);

    // console.log(query)

    ctx.render(searchTemplate([], () => onSearchClick(ctx)));
}

async function onSearchClick(ctx) {
    let query = document.getElementById('search-input').value;

    if (query == '') {
        return alert('Please enter a year');
    }

    let cars = await getCarsByQuery(query);


    ctx.render(searchTemplate(cars, () => onSearchClick(ctx)));  
}


