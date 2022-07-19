// import { render } from "./dom.js";

const aboutSection = document.getElementById('aboutView');
aboutSection.remove();

export function showAbout(context) {
   context.render(aboutSection);
}