import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js';
import { notify } from '../notify.js';
import { createSubmitHandler } from '../util.js';


const loginTemplate = (onSubmit) => html`
<section id="login">
    <form @submit=${onSubmit} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register"> Sign up</a>.</p>
            </div>
        </div>
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
        return notify('All fields are required');
    }

    // make API request
    try {
        await login(email, password);
        event.target.reset();
        ctx.page.redirect('/catalog');
    }
    catch (error) {
    }
}
