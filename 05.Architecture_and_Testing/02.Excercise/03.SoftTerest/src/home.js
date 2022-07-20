const homeSection = document.getElementById('homeView');
homeSection.remove()


export function showHome() {
    document.querySelector('main').replaceChildren(homeSection);
}