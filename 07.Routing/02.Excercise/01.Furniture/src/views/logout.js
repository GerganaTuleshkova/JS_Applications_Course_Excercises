import { logout } from "../data/users.js";

export function showLogout(ctx) {
    logout();
    // ctx.checkUser();
    ctx.page.redirect('/');

}
