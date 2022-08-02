import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, deleteCarById } from '../api/cars.js';


const detailsTemplate = (car, isOwner, onDelete) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price} $</li>
            </ul>
    
            <p class="description-para">${car.description}</p>

            ${isOwner == true 
                    ? html`
                        <div class="listings-buttons">
                            <a href="/edit/${car._id}" class="button-list">Edit</a>
                            <a href="javascript:void(0)" @click=${onDelete} class="button-list">Delete</a>
                        </div>`
                    : nothing
                } 
        </div>
    </section>
    `;



export async function detailsView(ctx) {
    let car = ctx.car;
    let isOwner = ctx.car._isOwner;
    ctx.render(detailsTemplate(car, isOwner, () => onDelete(car, ctx)));
}

async function onDelete(car, ctx) {
    const confirmed = confirm(`Are you sure you want to delete ${car.brand} ${car.model}?`);
    if (confirmed) {
        try {
            await deleteCarById(car._id);
            ctx.page.redirect(`/catalog`);
        } catch (err) {
            alert(err.message);
        }
    }
}

