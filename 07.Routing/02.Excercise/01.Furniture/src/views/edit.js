import { html } from '../../node_modules/lit-html/lit-html.js';
import { edit, getProductById } from '../data/furnitureCalls.js';


const createTemplate = (product, onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" value=${product.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model" value=${product.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" value=${product.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description"
                    value=${product.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" value=${product.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" value=${product.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value=${product.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
`;


export async function editView(ctx) {
    const productId = ctx.params.productId;    

    const product = await getProductById(productId);

    let user = ctx.userData();

    if (user == null || (user != null && user.id != product._ownerId)) {
        alert('This is not your item');
        throw new Error('You are not authorized for this action');
    }

    ctx.render(createTemplate(product, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        let productData = {
            make: formData.get('make'),
            model: formData.get('model'),
            year: formData.get('year'),
            description: formData.get('description'),
            price: formData.get('price'),
            img: formData.get('img'),
            material: formData.get('material'),
        }


        let response = await edit(productId, productData);

        if (response.ok == false) {
            let error = response.json()
            throw new Error(error.message);
        }

        ctx.page.redirect('/catalog/' + productId);
    }
}
