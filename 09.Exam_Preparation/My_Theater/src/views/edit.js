import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { edit } from '../api/theaters.js';
import { createSubmitHandler } from '../util.js';



const editTemplate = (theater, onSubmit) => html` 
    <section id="editPage">
        <form @submit=${onSubmit} class="theater-form">
            <h1>Edit Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" .value=${theater.title}>
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${theater.date}>
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author" .value=${theater.author}>
            </div>
            <div>
                <label for="description">Theater Description:</label>
                <textarea id="description" name="description" placeholder="Description">${theater.description}</textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                    .value=${theater.imageUrl}>
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>
    `;


export async function editView(ctx) {
    let theater = ctx.theater;

    ctx.render(editTemplate(theater, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let title = formData.title.trim();
    let date = formData.date.trim();
    let author = formData.author.trim();
    let description = formData.description.trim();
    let imageUrl = formData.imageUrl.trim();


    if (title == ''
        || date == ''
        || author == ''
        || description == ''
        || imageUrl == ''
    ) {
        return alert('All fields are required');
    }
    try {
        let updatedTheater = await edit(ctx.theater._id, { title, date, author, description, imageUrl });
        event.target.reset();
        ctx.page.redirect(`/catalog/${updatedTheater._id}`);

    } catch (error) {
    }
}

