import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { edit } from '../api/pets.js';
import { createSubmitHandler } from '../util.js';



const editTemplate = (pet, onSubmit) => html`     
    <section id="editPage">
        <form @submit=${onSubmit} class="editForm">
            <img src="./images/editpage-dog.jpg">
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" .value=${pet.name}>
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" .value=${pet.breed}>
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" .value=${pet.age}>
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" .value=${pet.weight}>
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" .value=${pet.image}>
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>
    `;


export async function editView(ctx) {
    let pet = ctx.pet;

    ctx.render(editTemplate(pet, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let name = formData.name.trim();
    let breed = formData.breed.trim();
    let age = formData.age.trim();
    let weight = formData.weight.trim();
    let image = formData.image.trim();


    if (name == ''
        || breed == ''
        || age == ''
        || weight == ''
        || image == ''
    ) {
        return alert('All fields are required');
    }
    try {
        let updatedPet = await edit(ctx.pet._id, { name, breed, age, weight, image });
        event.target.reset();
        ctx.page.redirect(`/catalog/${updatedPet._id}`);

    } catch (error) {
    }
}
