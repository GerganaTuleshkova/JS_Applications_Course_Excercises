import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { edit } from '../api/cars.js';
import { createSubmitHandler } from '../util.js';



const editTemplate = (car, onSubmit) => html`
        <section id="edit-listing">
            <div class="container">
        
                <form @submit=${onSubmit} id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>
        
                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>
        
                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value=${car.model}>
        
                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>
        
                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value=${car.year}>
        
                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${car.imageUrl}>
        
                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value=${car.price}>
        
                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
    
    `;


export async function editView(ctx) {
    let car = ctx.car;

    ctx.render(editTemplate(car, createSubmitHandler(ctx, onSubmit)));
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
        let updatedCar = await edit(ctx.car._id, {brand, model, description, year, imageUrl, price});
        event.target.reset();
        ctx.page.redirect(`/catalog/${updatedCar._id}`);

    } catch (error) {
    }
}
