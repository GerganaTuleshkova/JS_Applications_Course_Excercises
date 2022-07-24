// import { html } from '../../node_modules/lit-html/lit-html.js';
// import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
// import { getFurnitureAll } from '../data/furnitureCalls.js';


// // option 1 for the template:

// // const catalogTemplate = (recipes) => html`
// // <h2>Catalog</h2>
// // <ul>
// //     ${repeat(recipes, r => r._id, recipeCard)}
// // </ul>`;

// // const recipeCard = (recipe) => html`<li><a href="/catalog/${recipe._id}">${recipe.name}</a></li>`;


// // option 2 for the template:

// const catalogTemplate = (recipes) => html`
// <h2>Catalog</h2>
// <ul>
//     ${recipes.map(recipe => html`<li><a href="/catalog/${recipe._id}">${recipe.name}</a></li>`)}
// </ul>`;



// export async function showCatalog(ctx) {
//     ctx.render(catalogTemplate([]));
//     const recipes = await getFurnitureAll();
//     ctx.render(catalogTemplate(recipes));
// }