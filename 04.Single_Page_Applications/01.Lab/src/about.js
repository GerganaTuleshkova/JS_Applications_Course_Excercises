const aboutSection = document.getElementById('aboutView');
aboutSection.remove()


export function showAbout() {
    document.querySelector('main').replaceChildren(aboutSection);

}