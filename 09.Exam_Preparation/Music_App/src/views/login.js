import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js';
import { createSubmitHandler } from '../util.js';


const loginTemplate = (onSubmit) => html`
<section id="loginPage" class="login">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</section>
`;

export function loginView(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let email = formData.email.trim();
    let password = formData.password.trim();

    // chech input is valid:
    if (email == '' || password == '') {
        return alert('All fields are required');
    }

    // make API request
    try {
        await login(email, password);
        event.target.reset();
        ctx.page.redirect('/');
    }
    catch (error) {
    }
}
