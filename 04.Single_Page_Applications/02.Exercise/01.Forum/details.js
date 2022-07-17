const section = document.getElementById('detailsView');
let postElement = {
    title: document.getElementById('details-title'),
    username: document.getElementById('details-username'),
    time: document.getElementById('details-time'),
    post: document.getElementById('details-content'),
}

const commentList = document.getElementById('user-comment');

let form = section.querySelector('form');
// form.addEventListener('sumbit', onSubmit)
form.querySelector('button').addEventListener('click', onSubmit)

section.remove();

export function showDetails(event) {
    if (event.target.parentElement.tagName == 'A') {
        event.preventDefault();

        const postId = event.target.parentElement.id;
        showPost(postId);
    }
}

async function showPost(postId) {

    document.querySelector('.container').replaceChildren('Loading...');

    let [responsePost, responseComments] = await Promise.all([
        fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + postId),
        fetch('http://localhost:3030/jsonstore/collections/myboard/coments'),
    ])
    
    let [post, comments] = await Promise.all([
        responsePost.json(),
        responseComments.json(),
    ]);

    commentList.replaceChildren(
        ...Object.values(comments)
            .filter(c => c.postId == postId)
            .map(createCommentElement));

    postElement.title.textContent = post.title;
    postElement.username.textContent = post.username;
    postElement.time.textContent = post.dateCtreated;
    postElement.post.textContent = post.post;

    form.id = postId;

    document.querySelector('.container').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    let formData = new FormData(form);

    let commentText = formData.get('postText').trim();
    let username = formData.get('username').trim();
    let postId = form.id;

    try {
        if (commentText == '' || username == '') {
            ;
            throw new Error('All fields are required!')
        }
        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/coments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                commentText,
                postId,
                dateCreated: new Date(),
            })
        });

        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        // let comments = await response.json();
        form.reset();
        showPost(postId);

    } catch (error) {
        alert(error.message);
    }
}

function createCommentElement(comment) {
    let commentElement = document.createElement("div");
    commentElement.className = 'topic-name-wrapper';
    commentElement.innerHTML = `\
    <div class="topic-name">\
    <p><strong>${comment.username}</strong> commented on <time>${comment.dateCreated}</time></p>\
        <div class="post-content">\
        <p>${comment.commentText}</p>\
        </div>`
    return commentElement;
}

