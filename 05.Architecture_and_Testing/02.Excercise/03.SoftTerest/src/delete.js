import { deleteRequest } from "./api.js";
import { showHome } from "./home.js";

export async function deleteItem(event) {

    console.log('delete clicked')
    console.log(event.target.getAttribute('data-id'));


    let userData = JSON.parse(sessionStorage.getItem('userData'));

    let userId = userData.id;
    console.log(userId)
    console.log(userData.accessToken)

    if (event.target.className == 'btn detb'
        && event.target.name == userId) {


        await deleteRequest(`/data/ideas/${event.target.getAttribute('data-id')}`);


        showHome();
    }


}