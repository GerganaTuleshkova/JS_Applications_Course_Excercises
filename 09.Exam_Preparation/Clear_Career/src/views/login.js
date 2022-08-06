import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/user.js';
import { createSubmitHandler } from '../util.js';


const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
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
        ctx.page.redirect('/catalog');
    }
    catch (error) {
    }
}
