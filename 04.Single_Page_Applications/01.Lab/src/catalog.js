const catalogSection = document.getElementById('catalogView');
const list = catalogSection.querySelector('ul');
catalogSection.remove()


export async function showCatalog() {
    document.querySelector('main').replaceChildren(catalogSection);

    list.replaceChildren('Loading...');
    

    const respose = await fetch('http://localhost:3030/data/movies');
    const movies = await respose.json();

    let fragment = document.createDocumentFragment();

    movies.map(createMovieItem).forEach(c => fragment.appendChild(c))

    list.replaceChildren(fragment);
}
 
function createMovieItem(movie) {
    let li = document.createElement('li');
    li.textContent = movie.title;

    return li;
}
