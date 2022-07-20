import { get } from "./api.js";
import {showDetails} from './ideaDetails.js';

// import { render } from "./dom.js";


const dashboardSection = document.getElementById('dashboardView');
let holder = dashboardSection.querySelector('#dashboard-holder');
dashboardSection.remove()


export async function showDashboard(context) {
    context.render(dashboardSection);

    const ideas = await get('/data/ideas');

    if (ideas.length > 0) {
        let fragment = document.createDocumentFragment();

        ideas.map(CreateIdeaItem).forEach(c => fragment.appendChild(c));

        holder.replaceChildren(fragment);
    } else {
        holder.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
    }

    dashboardSection.addEventListener('click', showDetails);

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
    <img class="card-image" src=${idea.img} alt="Card image cap">\
    <a class="btn" id="${idea._id}" href="javascript: void(0)">Details</a>\
    </div>`

    

    return div;
}