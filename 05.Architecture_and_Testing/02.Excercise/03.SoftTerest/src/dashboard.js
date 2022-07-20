import { get } from "./api.js";
import { showDetails } from './ideaDetails.js';

// import { render } from "./dom.js";


const dashboardSection = document.getElementById('dashboardView');
let holder = dashboardSection.querySelector('#dashboard-holder');
dashboardSection.remove();

let ctx = null;

// holder.addEventListener('click', goToDetails);

export async function showDashboard(context) {
    context.render(dashboardSection);
    ctx = context;

    const ideas = await get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');

    if (ideas.length > 0) {
        let fragment = document.createDocumentFragment();
        ideas.map(CreateIdeaItem).forEach(c => fragment.appendChild(c));
        holder.replaceChildren(fragment);
    } else {
        holder.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
    }

    holder.addEventListener('click', showDetails);

}

function CreateIdeaItem(idea) {
    let div = document.createElement('div');
    div.className = 'card overflow-hidden current-card details';
    div.style.width = '20rem';
    div.style.height = '18rem';

    div.innerHTML = `\
    <div class="card-body">\
        <p class="card-text">${idea.title}</p>\
    </div>\
    <img class="card-image" src="${idea.img}" alt="Card image cap">\
    <a class="btn" id="${idea._id}" href="javascript: void(0)">Details</a>\
    </div>`;

    return div;
}

// function goToDetails(event) {

//     console.log(event.target)
//     if (event.target.className == 'btn') {
//         // render(ideaDetailsSection);
//         showDetails(event.target);
//         ctx.goTo('dashboard');
//     }
// }