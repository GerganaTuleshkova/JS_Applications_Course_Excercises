function attachEvents() {
    let tableBody = document.querySelector('#results tbody');
    let submitButton = document.getElementById('submit');
    let url = 'http://localhost:3030/jsonstore/collections/students';
    let form = document.querySelector('form');

    form.addEventListener('submit', createStudent);

    loadStudents();

    async function loadStudents() {
        try {
            tableBody.innerHTML = '';
            let response = await fetch(url);

            if (response.ok == false) {
                throw new Error('Error obtaining the students info!');
            }

            let data = await response.json();
            for (let sObj of Object.values(data)) {
                tableBody.appendChild(createStudentTableRow(sObj.firstName, sObj.lastName, sObj.facultyNumber, sObj.grade));
            }

        } catch (err) {
            alert(err.message);
        }
    }

    function createStudentTableRow(firstName, lastName, facultyNumber, grade) {
        let studentRowElement = document.createElement('tr');
        let fistNameTd = document.createElement('td');
        fistNameTd.textContent = firstName;
        let lastNameTd = document.createElement('td');
        lastNameTd.textContent = lastName;
        let numberTd = document.createElement('td');
        numberTd.textContent = facultyNumber;
        let gradeTd = document.createElement('td');
        gradeTd.textContent = Number(grade).toFixed(2);
        studentRowElement.appendChild(fistNameTd);
        studentRowElement.appendChild(lastNameTd);
        studentRowElement.appendChild(numberTd);
        studentRowElement.appendChild(gradeTd);

        return studentRowElement;
    }

    async function createStudent(event) {
        event.preventDefault();

        const formData = new FormData(form);

        let firstName = formData.get('firstName').trim();
        let lastName = formData.get('lastName').trim();
        let facultyNumber = formData.get('facultyNumber').trim();
        let grade = Number(formData.get('grade').trim());

        try {
            if (!firstName
                || !lastName
                || !facultyNumber
                || !grade) {
                throw new Error('All fields are required');
            }

            let student = {
                firstName,
                lastName,
                facultyNumber,
                grade,
            }

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            if (response.ok == false) {
                throw new Error('Student was not created!');
            }

            loadStudents();           
            form.reset();

        } catch (err) {
            alert(err.message);
        }
    }
}

attachEvents();