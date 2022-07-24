import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyProducts } from '../data/furnitureCalls.js';


const myFurnitureTemplate = (furnitureAll) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${furnitureAll.map(product => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${product.img} />
                <p>${product.description}</p>
                <footer>
                    <p>Price: <span>${product.price} $</span></p>
                </footer>
                <div>
                    <a href="/catalog/${product._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
    `)}
</div>
`;


export async function showMyPublications(ctx) {
    // let userData = JSON.parse(sessionStorage.getItem('userData'));
    let userData = ctx.userData();
    let userId = userData.id

    ctx.render(myFurnitureTemplate([]));
    let myPublications = await getMyProducts(userId);
    
    // very wrong way ->
    // myPublications =  myPublications.filter(p => p._ownerId == userId);    

    ctx.render(myFurnitureTemplate(myPublications));
}
