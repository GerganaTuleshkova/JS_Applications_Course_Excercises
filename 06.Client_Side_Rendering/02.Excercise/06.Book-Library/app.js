import { html, render } from './node_modules/lit-html/lit-html.js';

const body = document.querySelector('body');

//build the elements of the page

function createAllElements() {

    let listOfElementTemplates = [];
    let loadAllButtonTemplate = html`<button id="loadBooks" @click==${getAllBooks()}>LOAD ALL BOOKS</button>`;
    listOfElementTemplates.push(loadAllButtonTemplate);

    let tableTemplate = html`
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>        
        </tbody>
    </table>`;

    listOfElementTemplates.push(tableTemplate);

    let addFormTemplate = html`
    <form id="createForm">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
    </form>`

    listOfElementTemplates.push(addFormTemplate);

    let editFormTemplate = html`
    <form id="editForm">
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Save">
    </form>`;

    listOfElementTemplates.push(editFormTemplate);

    render(listOfElementTemplates, body);
}

createAllElements();


async function request(url, options) {
    const response = await fetch(url, options);
    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}

// let rowBodyTemplate = (booksData) =>
//     html`<tbody>
// ${booksData.map(book => html`
//                     <tr>
//                     <td>${book.title}</td>
//                     <td>${book.author}</td>
//                     <td>
//                         <button @click=${updateBook()}>Edit</button>
//                         <button @click=${deleteBook()}>Delete</button>
//                     </td>
//                     </tr>`
//                     )}
// </ul>`;

// function to load all books from server and display them
async function getAllBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');

    const rows = Object.entries(books).map(createRow).join('');
    document.querySelector('tbody').innerHTML = rows;

    function createRow([id, book]) {
        const result = `
        <tr data-id="${id}">
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        </tr>`;
        return result;
    }
}

// function for creating a new book
async function createBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    };

    if (book.title == '' || book.author == '') {
        return alert('All fields are required!');
    }

    await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    event.target.reset();
}

// function for updating an existing book using ID
async function updateBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('id');
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    };

    if (book.title == '' || book.author == '') {
        return alert('All fields are required!');
    }

    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    document.getElementById('createForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
    event.target.reset();
}

// function for deleting an existing book using ID
async function deleteBook(id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete',
    });
}

// detect user clicks on Edit/Delete buttons
function handleTableClick(event) {
    if (event.target.className == 'editBtn') {
        document.getElementById('createForm').style.display = 'none';
        document.getElementById('editForm').style.display = 'block';
        const bookId = event.target.parentNode.parentNode.dataset.id;
        loadBookForEditting(bookId);
    } else if (event.target.className == 'deleteBtn') {
        const confirmed = confirm('Are you sure you want to delete this book?');
        if (confirmed) {
            const bookId = event.target.parentNode.parentNode.dataset.id;
            deleteBook(bookId);
        }
    }
}

async function loadBookForEditting(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);

    document.querySelector('#editForm [name="id"]').value = id;
    document.querySelector('#editForm [name="title"]').value = book.title;
    document.querySelector('#editForm [name="author"]').value = book.author;
}


function start() {
    document.getElementById('loadBooks').addEventListener('click', getAllBooks);
    document.getElementById('createForm').addEventListener('submit', createBook);
    document.getElementById('editForm').addEventListener('submit', updateBook);
    document.querySelector('table').addEventListener('click', handleTableClick);
}

start();