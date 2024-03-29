import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api/offers.js';
import { createSubmitHandler, getUserData } from '../util.js';


const createTemplate = (onSubmit) => html`
    <section id="create">
        <div class="form">
            <h2>Create Offer</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="title" id="job-title" placeholder="Title" />
                <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
                <input type="text" name="category" id="job-category" placeholder="Category" />
                <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
                <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                    cols="50"></textarea>
                <input type="text" name="salary" id="job-salary" placeholder="Salary" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>
    `;


export function createView(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let title = formData.title.trim();
    let imageUrl = formData.imageUrl.trim();
    let category = formData.category.trim();
    let description = formData.description.trim();
    let requirements = formData.requirements.trim();
    let salary = formData.salary.trim();

    if (title == ''
        || imageUrl == ''
        || category == ''
        || description == ''
        || requirements == ''
        || salary == ''
    ) {
        return alert('All fields are required');
    }

    try {
        await create({ title, imageUrl, category, description, requirements, salary });
        event.target.reset();
        ctx.page.redirect(`/catalog`);

    } catch (error) {
    }
}


