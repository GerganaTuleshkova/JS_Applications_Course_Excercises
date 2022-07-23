import { cats } from './catSeeder.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

//option 1:

// let catTemplate = (catsData) =>
//     html`<ul>
//     ${catsData.map(cat => html`
//         <li>
//             <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
//             <div class="info">
//                 <button class="showBtn">Show status code</button>
//                 <div class="status" style="display: none" id=${cat.id}>
//                     <h4>Status Code: ${cat.statusCode}</h4>
//                     <p>${cat.statusMessage}</p>
//                 </div>
//             </div>
//         </li>`
//     )}
//     </ul>`;

// const container = document.getElementById('allCats');
// render(catTemplate(cats), container);

// container.addEventListener('click', showDetails);

// function showDetails(event) {
//     if (event.target.nodeName == 'BUTTON') {
//         let hiddenElement = event.target.parentElement.querySelector('.status');
//         if (hiddenElement.style.display == 'none') {
//             hiddenElement.style.display = 'block';
//             event.target.textContent = 'Hide status code';
//         } else {
//             hiddenElement.style.display = 'none';
//             event.target.textContent = 'Show status code';
//         }
//     }
// }

//option 2:

let catTemplate = (catsData) =>
    html`<ul>
    ${catsData.map(cat => html`
        <li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button class="showBtn" @click=${showDetails}>Show status code</button>
                <div class="status" style="display: none" id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
            </div>
        </li>`
    )}
    </ul>`;

const container = document.getElementById('allCats');
render(catTemplate(cats), container);

function showDetails(event) {
    let hiddenElement = event.target.parentElement.querySelector('.status');
    if (hiddenElement.style.display == 'none') {
        hiddenElement.style.display = 'block';
        event.target.textContent = 'Hide status code';
    } else {
        hiddenElement.style.display = 'none';
        event.target.textContent = 'Show status code';
    }
}
