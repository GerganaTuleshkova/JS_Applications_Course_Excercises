import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api/cars.js';
import { createSubmitHandler, getUserData } from '../util.js';


const createTemplate = (onSubmit) => html`
    <section id="create-listing">
        <div class="container">
            <form @submit=${onSubmit} id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">
    
                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>
    `;


export function createView(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let brand = formData.brand.trim();
    let model = formData.model.trim();
    let description = formData.description.trim();
    let year = formData.year.trim();
    let imageUrl = formData.imageUrl.trim();
    let price = formData.price.trim();


    if (brand == ''
        || model == ''
        || description == ''
        || year == ''
        || imageUrl == ''
        || price == ''
    ) {
        return alert('All fields are required!');
    }

    if (Number(price) <= 0 || Number(year) <= 0) {
        return alert('Year and price must be positive numbers!');
    }

    year = Number(year);
    price = Number(price);

    try {
        await create({brand, model, description, year, imageUrl, price});
        event.target.reset();
        ctx.page.redirect(`/catalog`);

    } catch (error) {
    }
}


