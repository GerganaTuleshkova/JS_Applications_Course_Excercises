import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { edit } from '../api/offers.js';
import { createSubmitHandler } from '../util.js';



const editTemplate = (offer, onSubmit) => html`  
    <section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title} />
                <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl} />
                <input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category} />
                <textarea id="job-description" name="description" placeholder="Description" .value=${offer.description}
                    rows="4" cols="50"></textarea>
                <textarea id="job-requirements" name="requirements" placeholder="Requirements" .value=${offer.requirements}
                    rows="4" cols="50"></textarea>
                <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary} />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>
        
        `;


export async function editView(ctx) {
    let offer = ctx.offer;

    ctx.render(editTemplate(offer, createSubmitHandler(ctx, onSubmit)));
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
        let updatedOffer = await edit(ctx.offer._id, { title, imageUrl, category, description, requirements, salary });
        event.target.reset();
        ctx.page.redirect(`/catalog/${updatedOffer._id}`);

    } catch (error) {
    }
}

