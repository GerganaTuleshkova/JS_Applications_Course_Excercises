function attachEvents() {
    let loadPostsButton = document.getElementById('btnLoadPosts');
    let viewPostButton = document.getElementById('btnViewPost');
    let selectPostsElement = document.getElementById('posts');
    let baseUrl = 'http://localhost:3030/jsonstore/blog/';
    let postTitleElement = document.getElementById('post-title');
    let postBodyElement = document.getElementById('post-body');
    let postCommentsListElement = document.getElementById('post-comments');




    try {
        loadPostsButton.addEventListener('click', loadPosts);
        viewPostButton.addEventListener('click', viewPost);
        async function loadPosts() {
            let responsePosts = await fetch(baseUrl + 'posts');

            if (!responsePosts.ok) {
                throw new Error('Problem obtaining the posts');
            }

            let dataPosts = await responsePosts.json();

            for (let postObj of Object.values(dataPosts)) {
                let postOptionElement = document.createElement('option');
                postOptionElement.value = postObj.id;
                postOptionElement.textContent = postObj.title;
                selectPostsElement.add(postOptionElement);
            }
        }

        async function viewPost() {
            postTitleElement.textContent = '';
            postBodyElement.textContent = '';
            postCommentsListElement.innerHTML = '';

            let selectedPostId = selectPostsElement.options[selectPostsElement.selectedIndex].value;

            let responsePost = await fetch(baseUrl + 'posts/' + selectedPostId);

            if (!responsePost.ok) {
                throw new Error('Problem obtaining info for selected post');
            }

            let dataSelectedPost = await responsePost.json();


            let responseComments = await fetch(baseUrl + 'comments');

            if (responseComments.ok == false) {
                throw new Error('Problem obtaining info for comments');
            }

            let dataComments = await responseComments.json();

            let commentsForPostList = Object.values(dataComments).filter(comment => comment.postId == selectedPostId);

            postTitleElement.textContent = dataSelectedPost.title;
            postBodyElement.textContent = dataSelectedPost.body;

            for (let comment of commentsForPostList) {
                let commentLiElement = document.createElement('li');
                commentLiElement.textContent = comment.text;
                postCommentsListElement.appendChild(commentLiElement)
            }
        }
    }
    catch (error) {
        console.log(error.message)
    }

}

attachEvents();