function attachEvents() {
    let messages = document.getElementById('messages');
    let author = document.querySelector("[name='author']");
    let content = document.querySelector("[name='content']");
    let submitButton = document.getElementById('submit');
    let refreshButton = document.getElementById('refresh');

    submitButton.addEventListener('click', createMessage);
    refreshButton.addEventListener('click', loadMessages);

    async function createMessage(event) {
        event.preventDefault();

        try {
            let message = {
                'author': author.value,
                'content': content.value,
            }
            let response = await fetch('http://localhost:3030/jsonstore/messenger', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            if (response.ok == false) {
                throw new Error('Message not created');
            }

        } catch (err) {
            alert(err.message)
        }

        author.value = '';
        content.value = '';
    }

    async function loadMessages(event) {
        event.preventDefault();
        try {
            let response = await fetch('http://localhost:3030/jsonstore/messenger3');

            if (response.ok == false) {
                throw new Error('Message could not be displayed');
            }

            let data = await response.json();
            console.log(data)

            let textMessages = [];

            for (let messageObj of Object.values(data)) {
                textMessages.push(`${messageObj.author}: ${messageObj.content}`);
            }

            messages.textContent = textMessages.join('\n');


        } catch (err) {
            alert(err.message)
        }
    }
}

attachEvents();