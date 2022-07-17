import {createPost} from './create.js'

let postButton = document.querySelector('.new-topic-buttons .public');
postButton.addEventListener('click', createPost);

