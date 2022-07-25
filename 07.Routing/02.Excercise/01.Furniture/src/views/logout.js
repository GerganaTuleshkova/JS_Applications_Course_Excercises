import { logout } from "../data/users.js";

export function showLogout(ctx) {
    logout();
    // ctx.checkUser(); // no need, redirect to home will handle the nav bar update
    ctx.page.redirect('/');

}
