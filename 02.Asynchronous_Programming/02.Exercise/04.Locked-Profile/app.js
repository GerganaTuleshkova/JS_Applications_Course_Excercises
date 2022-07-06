function lockedProfile() {
    let mainElement = document.getElementById('main');

    async function loadProfiles() {
        try {
            let response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');

            if (response.ok == false) {
                throw new Error('Profiles not accessible');
            }
            main.innerHTML = ''
            let data = await response.json();

            for (let [id, profileData] of Object.entries(data)) {
                let div = document.createElement('div');
                div.className = 'profile';
                div.innerHTML = `\
				<img src="./iconProfile2.png" class="userIcon" />\
				<label>Lock</label>\
				<input type="radio" name="user${id}Locked" value="lock" checked>\
				<label>Unlock</label>\
				<input type="radio" name="user${id}Locked" value="unlock"><br>\
				<hr>\
				<label>Username</label>\
				<input type="text" name="user${id}Username" value="${profileData.username}" disabled readonly />\
				<div id="user${id}HiddenFields" class="hiddenInfo">\
					<hr>\
					<label>Email:</label>\
					<input type="email" name="user${id}Email" value="${profileData.email}" disabled readonly />\
					<label>Age:</label>\
					<input type="text" name="user${id}Age" value="${profileData.age}" disabled readonly />\
				</div>\
				
				<button>Show more</button>`;
                mainElement.appendChild(div);

            }


        } catch (error) {
            console.log(error.message)
        }

    }

    loadProfiles();

    mainElement.addEventListener('click', onClick, true);

    function onClick(event) {
        if (event.target.nodeName == 'BUTTON') {
            if (!isLocked(event)) {
                let hiddenFields = event.target.parentElement.querySelector('div')
                if (event.target.textContent == 'Show more') {
                    hiddenFields.classList.remove("hiddenInfo");
                    // hiddenFields.style.display = 'block';
                    event.target.textContent = 'Hide it';
                } else {
                    // hiddenFields.style.display = 'none';
                    hiddenFields.className = "hiddenInfo";

                    event.target.textContent = 'Show more';
                }
            }
        }
    }

    function isLocked(event) {
        return (event.target.parentElement.querySelector('input[value="lock"]').checked);
    }
}