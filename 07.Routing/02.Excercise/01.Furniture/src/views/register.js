import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/users.js';


const registerTemplate = (onSubmit, errorMsg, errors) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : null}
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class=${'form-control' + (errors.email ? ' is-invalid' : '')} id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class=${'form-control' + (errors.password ? ' is-invalid' : '')} id="password" type="password" name="password">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class=${'form-control' + (errors.repass ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </div>
        </div>
    </form>`;



export function registerView(ctx) {
    update(null, {});

    function update(errorMsg, errors) {
        ctx.render(registerTemplate(onSubmit, errorMsg, errors));
    }

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let repass = formData.get('rePass').trim();
        try {

            if (email == '' || password == '') {
                throw {
                    error: new Error('All fields are required'),
                    errors: {
                        email: email == '',
                        password: password == '',
                        repass: repass == '',
                    }
                }
            }

            if (password != repass) {
                throw {
                    error: new Error('Passwords don\'t match'),
                    errors: {
                        email: true,
                        password: true,
                    }
                }
            }

            await register(email, password, repass);

            ctx.page.redirect('/');
            
        } catch (error) {
            const message = error.message || error.error.message;
            update(message, error.errors || {});
        }
    }
}
