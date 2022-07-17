export async function createPost(event) {

    let form = document.querySelector('form');

    event.preventDefault();

    let formData = new FormData(form);

    let title = formData.get('topicName');
    let username = formData.get('username');
    let post = formData.get('postText');

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
            })
        });

        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message)
        };

        form.reset();
        // let data = await response.json()

    } catch (error) {
        alert(error.message)
    }
}
