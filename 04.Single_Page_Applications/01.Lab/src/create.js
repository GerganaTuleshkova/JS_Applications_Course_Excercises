import { showCatalog } from "./catalog.js";

const createSection = document.getElementById('createView');
createSection.remove();
let form = createSection.querySelector('form');

form.addEventListener('submit', onSubmit);

export function showCreate() {
    document.querySelector('main').replaceChildren(createSection);
}

async function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(form);

    let title = formData.get('title').trim();

    try {
        let response = await fetch('http://localhost:3030/data/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': JSON.parse(sessionStorage.getItem('userData')).accessToken
            },
            body: JSON.stringify({
                title,
            })
        });

        if (response.ok == false) {
            let error = await response.json()
            throw new Error(error.message)
        }
        showCatalog();

    } catch (error) {
        alert(error.message)
    }
};