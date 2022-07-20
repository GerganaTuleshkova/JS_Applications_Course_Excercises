import { deleteRequest } from "./api.js";
import { showHome } from "./home.js";

export async function deleteItem(event) {
    // let userData = JSON.parse(sessionStorage.getItem('userData'));
    let userData = JSON.parse(localStorage.getItem('userData'));

    let userId = userData.id;
   
    if (event.target.className == 'btn detb'
        && event.target.name == userId) {

        await deleteRequest(`/data/ideas/${event.target.getAttribute('data-id')}`);
        showHome();
    }
}