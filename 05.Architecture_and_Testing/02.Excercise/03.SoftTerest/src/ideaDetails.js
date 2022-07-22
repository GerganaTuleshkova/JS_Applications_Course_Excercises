import { get } from "./api.js";
import { render } from "./dom.js";
import { deleteItem } from "./delete.js";


const ideaDetailsSection = document.getElementById('idea-detailsView');
// let holder = dashboardSection.querySelector('#dashboard-holder');
ideaDetailsSection.remove();

const userData = JSON.parse(localStorage.getItem('userData'));

export async function showDetails(event) {

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (event.target.className == 'btn') {
        render(ideaDetailsSection);

        const details = await get(`/data/ideas/${event.target.id}`);

        let ideaToDisplay = CreateIdeaItem(details);
        let deleteButton = ideaToDisplay.querySelector('a');

        if (userData == null || userData.id != details._ownerId) {   
            // deleteButton.style.display = 'none';
            deleteButton.remove();
        } 

        ideaDetailsSection.replaceChildren(ideaToDisplay);
        ideaDetailsSection.addEventListener('click', deleteItem)
    }
}

function CreateIdeaItem(idea) { 
    let div = document.createElement('div');
    div.className = 'container home some';

    div.innerHTML = `\
    <img class="det-img" src="${idea.img}"/>\
    <div class="desc">\
    <h2 class="display-5">${idea.title}</h2>\
    <p class="infoType">Description:</p>
    <p class="idea-description">${idea.description}</p>\
    </div>\
    <div class="text-center">\
    <a class="btn detb" data-id="${idea._id}" name="${idea._ownerId}" href="">Delete</a>\
    </div>`;

    //javascript: void(0)   
    return div;
}