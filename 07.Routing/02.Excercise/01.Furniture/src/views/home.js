import { html } from '../../node_modules/lit-html/lit-html.js';
import { getFurnitureAll } from '../data/furnitureCalls.js';


const homeTemplate = (furnitureAll) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
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

export async function homeView(ctx) {
    ctx.render(homeTemplate([]));
    
    const furnitureAllItems = await getFurnitureAll();
    ctx.render(homeTemplate(furnitureAllItems));
    ctx.checkUser();
}
