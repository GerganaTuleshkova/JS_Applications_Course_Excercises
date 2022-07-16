function attachEvents() {
    let contactList = document.getElementById('phonebook');
    let loadButton = document.getElementById('btnLoad');
    let person = document.getElementById('person');
    let phone = document.getElementById('phone');
    let createButton = document.getElementById('btnCreate');
    let url = 'http://localhost:3030/jsonstore/phonebook';

    loadButton.addEventListener('click', loadContacts);
    createButton.addEventListener('click', createContact);
    contactList.addEventListener('click', deleteContact);

    async function loadContacts() {
        contactList.innerHTML = ''
        try {
            const response = await fetch(url);

            if (response.ok == false) {
                throw new Error('Error obtaining the contacts');
            }

            let data = await response.json();
            for (let contactObj of Object.values(data)) {
                contactList.appendChild(createContactElement(contactObj.person, contactObj.phone, contactObj._id));
            }

        } catch (err) {
            alert(err.message);
        }
    }

    function createContactElement(name, phone, id) {
        let contactLi = document.createElement('li');
        contactLi.innerHTML = `${name}: ${phone}`
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('id', id)
        contactLi.appendChild(deleteButton);
        return contactLi;
    }

    async function deleteContact(event) {
        if (event.target.nodeName == 'BUTTON') {
            try {
                let id = event.target.id

                let response = await fetch(url + '/' + id, {
                    method: 'DELETE',
                })

                if (response.ok == false) {
                    throw new Error('Contact was not deleted!');
                }

            } catch (err) {
                alert(err.message);
            }

            loadContacts();
        }
    }

    async function createContact() {
        try {
            if (!person.value || !phone.value) {
                throw new Error('All fields are required');
            }
            let contact = {
                'person': person.value.trim(),
                'phone': phone.value.trim(),
            }

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            });

            if (response.ok == false) {
                throw new Error('Contact was not created!');
            }

        } catch (err) {
            alert(err.message);
        }
        loadContacts();
        person.value = '';
        phone.value = '';
    }
}

attachEvents();