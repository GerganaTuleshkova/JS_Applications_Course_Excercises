import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';
import { createSubmitHandler } from '../util.js';



const registerTemplate = (onSubmit) => html`
<section id="register-page" class="content auth">
    <form @submit=${onSubmit} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>
`;


export function registerView(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let email = formData.email.trim();
    let password = formData.password.trim();
    let repass = formData['confirm-password'].trim();

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