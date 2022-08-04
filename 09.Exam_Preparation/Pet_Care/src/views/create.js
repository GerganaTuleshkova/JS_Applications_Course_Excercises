import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api/pets.js';
import { createSubmitHandler, getUserData } from '../util.js';


const createTemplate = (onSubmit) => html`
    <section id="createPage">
        <form @submit=${onSubmit} class="createForm">
            <img src="./images/cat-create.jpg">
            <div>
                <h2>Create PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" placeholder="Max">
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" placeholder="2 years">
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" placeholder="5kg">
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
                </div>
                <button class="btn" type="submit">Create Pet</button>
            </div>
        </form>
    </section>
    `;


export function createView(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
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
        await create({ name, breed, age, weight, image });
        event.target.reset();
        ctx.page.redirect(`/`);

    } catch (error) {
    }
}


