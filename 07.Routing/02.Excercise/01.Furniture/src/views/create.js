import { html } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../data/furnitureCalls.js';


const createTemplate = (onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control valid" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
        `;


export function showCreate(ctx) {

    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        let productData = {
            make: formData.get('make'),
            model: formData.get('model'),
            year: Number(formData.get('year')),
            description: formData.get('description'),
            price: Number(formData.get('price')),
            img: formData.get('img'),
            material: formData.get('material'),
        }
        try {
            if (productData.make.length < 4) {
                return alert('Make must be at least 4 symbols long!');
            }
            if (productData.model.length < 4) {
                return alert('Model must be at least 4 symbols long!');
            }

            if (Number(productData.year) < 1950 || Number(productData.year) > 2050) {
                return alert('Invalid year!');
            }
            if (productData.description.length <= 10) {
                return alert('Description must be at least 11 symbols long!');
            }
            if (Number(productData.price) <= 0) {
                return alert('Price must be a positive number');
            }
            if (productData.img == '') {
                return alert('Url is required');
            }


            let response = await create(productData);

            if (response.ok == false) {
                let error = response.json()
                throw new Error(error.message);
            }

            ctx.page.redirect('/');
        } catch (error) {
            alert(error.message)
        }
    }
}
