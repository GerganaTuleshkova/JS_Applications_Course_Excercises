import { html } from '../../node_modules/lit-html/lit-html.js';
import { getProductById } from '../data/furnitureCalls.js';


const detailsTemplate = (product) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="../${product.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${product.make}</span></p>
                <p>Model: <span>${product.model}</span></p>
                <p>Year: <span>${product.year}</span></p>
                <p>Description: <span>${product.description}</span></p>
                <p>Price: <span>${product.price} $</span></p>
                <p>Material: <span>${product.material}</span></p>
                <div class="buttons">
                    <a href="/edit/${product._id}" class="btn btn-info">Edit</a>
                    <a href="/delete/${product._id}" class="btn btn-red">Delete</a>
                </div>
            </div>
        </div>
        `;


export async function detailsView(ctx) {
    const productId = ctx.params.productId;
    let userData = ctx.userData();

    
    const product = await getProductById(productId);

    ctx.render(detailsTemplate(product));


    if (userData != null && userData.id != product._ownerId) {
        document.querySelector('.buttons').style.display = 'none';
    }

    if (userData == null) {
        document.querySelector('.buttons').style.display = 'none';
    }
}