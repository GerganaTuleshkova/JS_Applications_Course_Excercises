import { render } from '../../node_modules/lit-html/lit-html.js';


let container = document.querySelector('main');

function ctxRender(content) {
    render(content, container);
}

export function decorateContext(ctx, next) {
    ctx.render = ctxRender;
    next();
}