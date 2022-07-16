function attachEvents() {
    let tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    let form = document.querySelector('form');
    let loadAllButton = document.getElementById('loadBooks');
    let url = 'http://localhost:3030/jsonstore/collections/books';
    let authorElement = document.querySelector("[name='author']");
    let titleElement = document.querySelector("[name='title']");

    loadAllButton.addEventListener('click', loadBooks);
    form.querySelector('button').addEventListener('click', createBook);

    tableBody.addEventListener('click', editBook);
    tableBody.addEventListener('click', deleteBook);

    async function loadBooks() {
        try {
            tableBody.innerHTML = '';
            let response = await fetch(url);

            if (response.ok == false) {
                throw new Error('Error obtaining the books info!');
            }

            let data = await response.json();
            for (let [key, {author, title}] of Object.entries(data)) {
                tableBody.appendChild(createBookTableRow(author, title, key,));
            }

        } catch (err) {
            alert(err.message);
        }
    }

    async function createBook(event) {
        event.preventDefault();

        if (event.target.textContent == 'Submit') {

            const formData = new FormData(form);

            let author = formData.get('author').trim();
            let title = formData.get('title').trim();

            try {
                if (!author
                    || !title) {
                    throw new Error('All fields are required');
                }

                let book = {
                    author,
                    title,
                }

                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(book),
                });

                if (response.ok == false) {
                    throw new Error('Book was not created!');
                }

                loadBooks();
                form.reset();

            } catch (err) {
                alert(err.message);
            }
        }
    }

    async function editBook(event) {
        if (event.target.textContent == 'Edit') {
            form.querySelector('button').addEventListener('click', updateBook);
            let bookId = event.target.id;
            try {

                let responseBook = await fetch(url + '/' + bookId);

                if (responseBook.ok == false) {
                    throw new Error('Could not obtain book info');
                }

                let dataBook = await responseBook.json();

                authorElement.value = dataBook.author;
                titleElement.value = dataBook.title;

                form.querySelector('button').textContent = 'Save';
                form.querySelector('h3').textContent = 'EditFORM';


            } catch (error) {
                alert(error.message)
            }

            async function updateBook(event) {
                if (event.target.textContent == 'Save') {
                    event.preventDefault();
                    const formData = new FormData(form);

                    let author = formData.get('author').trim();
                    let title = formData.get('title').trim();

                    try {
                        if (!author
                            || !title) {
                            throw new Error('All fields are required');
                        }

                        let updatedBook = {
                            author,
                            title,
                        }

                        let response = await fetch(url + '/' + bookId, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedBook),
                        });

                        if (response.ok == false) {
                            throw new Error('Book was not updated!');
                        }

                        loadBooks();
                        form.reset();
                        form.querySelector('button').textContent = 'Submit';
                        form.querySelector('h3').textContent = 'FORM';

                    } catch (err) {
                        alert(err.message);
                    }
                }
            }
        }
    }

    async function deleteBook(event) {
        if (event.target.textContent == 'Delete') {

            let bookId = event.target.id;
            try {

                let response = await fetch(url + '/' + bookId, {
                    method: 'DELETE',
                });

                if (response.ok == false) {
                    throw new Error('Book was not deleted!');
                }

                loadBooks();

            } catch (error) {
                alert(error.message);
            }
        }

    }
}

function createBookTableRow(author, title, key) {
    let bookTr = document.createElement('tr');

    let titleTd = document.createElement('td');
    titleTd.textContent = title;
    bookTr.appendChild(titleTd);

    let authorTd = document.createElement('td');
    authorTd.textContent = author;
    bookTr.appendChild(authorTd);

    let buttonsTd = document.createElement('td');

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.setAttribute('id', key);
    buttonsTd.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('id', key);
    buttonsTd.appendChild(deleteButton);

    bookTr.appendChild(buttonsTd);

    return bookTr;
}

attachEvents();