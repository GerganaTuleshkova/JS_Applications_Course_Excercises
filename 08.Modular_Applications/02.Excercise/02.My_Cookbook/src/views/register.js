import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';
import { createSubmitHandler } from '../util.js';



const registerTemplate = (onSubmit) => html`
<section id="register">
    <article>
        <h2>Register</h2>
        <form @submit=${onSubmit} id="registerForm">
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="rePass"></label>
            <input type="submit" value="Register">
        </form>
    </article>
</section>
`;


export function registerView(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let email = formData.email.trim();
    let password = formData.password.trim();
    let repass = formData.rePass.trim();

    if (email == '' || password == '') {
        return alert('All fields are required');
    }

    if (password != repass) {
        return alert('Passwords don\'t match');
    }

    try {
        await register(email, password, repass);
        ctx.page.redirect('/');

    } catch (error) {
    }
}