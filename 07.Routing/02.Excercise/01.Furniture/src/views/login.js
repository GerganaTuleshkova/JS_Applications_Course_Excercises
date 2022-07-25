import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/users.js';


const loginTemplate = (onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`


export function loginView(ctx) {

    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        // get input from form
        const formData = new FormData(event.target);
        let email = formData.get('email');
        let password = formData.get('password');

        // chech input is valid:
        if (email == '' || password == '') {
            return alert('All fields are required');
        }

        // make API request
        await login(email, password);

        //redirect to home will handle the nav update
        ctx.page.redirect('/');
    }
}
