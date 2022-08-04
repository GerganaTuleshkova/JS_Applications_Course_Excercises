import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, deletePetById, donateToPetById, getDonationForPetByPetId, checkIfUserIdDonatedToPetId } from '../api/pets.js';


const detailsTemplate = (pet, isOwner, isLoggedUser, donationsForPet, hasCurrentUserDonated, onDelete, onDonateClick) => html`   
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src=${pet.image}>
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${pet.name}</h1>
                    <h3>Breed: ${pet.breed}</h3>
                    <h4>Age: ${pet.age}</h4>
                    <h4>Weight: ${pet.weight}</h4>
                    <h4 class="donation">Donation: ${donationsForPet}$</h4>
                </div>
                
    
                ${isLoggedUser == null
                    ? nothing
                    : html`
                        <div class="actionBtn">
                            ${isOwner
                                ? html`<a href="/edit/${pet._id}" class="edit">Edit</a>
                                        <a href="javascript:void(0)" @click=${onDelete} class="remove">Delete</a>`
                                : html`
                                    ${hasCurrentUserDonated == 0
                                        ? html`<a href="javascript:void(0)" @click=${onDonateClick} class="donate">Donate</a>`
                                    : nothing}`
                            }                            
                        </div>`
                }                
            </div>
        </div>
    </section>
    `;



export async function detailsView(ctx) {
    let pet = ctx.pet;
    let isOwner = ctx.pet._isOwner;
    let isLoggedUser = ctx.user;

    let hasCurrentUserDonated = 1;

    let donationsCount = await getDonationForPetByPetId(pet._id);
    let donationsInDollars = 100 * donationsCount;

    if (isLoggedUser != null) {
        hasCurrentUserDonated = await checkIfUserIdDonatedToPetId(pet._id, ctx.user._id)
    }

    ctx.render(detailsTemplate(pet, isOwner, isLoggedUser, donationsInDollars, hasCurrentUserDonated, () => onDelete(pet, ctx), () => onDonateClick(pet, ctx) ));
}

async function onDelete(pet, ctx) {
    const confirmed = confirm(`Are you sure you want to delete ${pet.name}?`);
    if (confirmed) {
        try {
            await deletePetById(pet._id);
            ctx.page.redirect(`/`);
        } catch (err) {
            alert(err.message);
        }
    }
}


async function onDonateClick(pet, ctx) {
    let petId = pet._id
    await donateToPetById({petId})
    ctx.page.redirect(`/catalog/${petId}`);

}


