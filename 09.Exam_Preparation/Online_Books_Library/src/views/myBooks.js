import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getByUserId } from '../api/books.js';


const myBooksTemplate = (books) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
    
        ${books.length == 0 
        ? html` <p class="no-books">No books in database!</p>`
        : html`<ul class="my-books-list">
                ${books.map(bookTemplate)}
                </ul>`
        }    
    </section>
    `;


const bookTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/catalog/${book._id}">Details</a>
    </li>
    `;


export async function myBooksView(ctx) {
    let books = await getByUserId(ctx.user._id);

    ctx.render(myBooksTemplate(books));
}



