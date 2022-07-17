import { showDetails } from "./details.js";
// import { createPost } from "./create.js";

const section = document.getElementById('homeView');
section.remove();
let topicsContainer = section.querySelector('.topic-title');

export async function showHome(event) {
    event && event.preventDefault();
    document.querySelector('.container').replaceChildren('Loading...');    

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const posts = await response.json();
    // topicsContainer.innerHTML = ''
    // Object.values(posts).map(createPostPreview).forEach(p => topicsContainer.appendChild(p))
    topicsContainer.replaceChildren(...Object.values(posts).map(createPostPreview));

    document.querySelector('.container').replaceChildren(section);
}

section.querySelector('div.topic-title').addEventListener('click', showDetails);
let postButton = section.querySelector('.new-topic-buttons .public');
postButton.addEventListener('click', createPost);
section.querySelector('.new-topic-buttons .cancel').addEventListener('click', cancelSumbit);

function cancelSumbit(event) {
    if (event.target.className == 'cancel') {
        let form = document.querySelector('form');
        form.reset();
    }
}

export async function createPost(event) {

    let form = document.querySelector('form');

    event.preventDefault();

    let formData = new FormData(form);

    let title = formData.get('topicName').trim();
    let username = formData.get('username').trim();
    let post = formData.get('postText').trim();


    try {
        if (title == ''
            || username == ''
            || post == '') {
            throw new Error('All fields are required')
        }

        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                username,
                post,
                dateCtreated: new Date(),
            })
        });

        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message)
        };

        form.reset();
        showHome();

    } catch (error) {
        alert(error.message)
    }
}


function createPostPreview(post) {
    let div = document.createElement('div');
    div.className = "topic-container";
    div.innerHTML = `
    <div class="topic-name-wrapper">\
    <div class="topic-name">\
        <a href="#" class="normal" id="${post._id}">\
            <h2>${post.title}</h2>\
        </a>\
        <div class="columns">\
            <div>\
                <p>Date: <time>${post.dateCtreated}</time></p>\
                <div class="nick-name">\
                    <p>Username: <span>${post.username}</span></p>\
                </div>\
            </div>\
        </div>\
    </div>\
    </div>`

    return div;
}
