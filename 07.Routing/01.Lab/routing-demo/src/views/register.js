import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/users.js';


const registerTemplate = (onSubmit) => html`
<h2>Register</h2>
<form @submit=${onSubmit}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat password: <input type="password" name="repass"></label>
    <input type="submit" value="Register">
</form>`;


export function showRegister(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        await register(formData.get('email'), formData.get('password'), formData.get('repass'));

        ctx.page.redirect('/');
    }
}
