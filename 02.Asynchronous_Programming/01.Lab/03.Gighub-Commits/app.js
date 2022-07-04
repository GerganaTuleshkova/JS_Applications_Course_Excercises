function loadCommits() {
    let username = document.getElementById('username').value;
    let repoName = document.getElementById('repo').value;
	let loadButtonElement = document.querySelector('button');
	let commitsList = document.getElementById('commits');

	fetch(`https://api.github.com/repos/${username}/${repoName}/commits`)
		.then(handleResponse)
		.then(displayCommits)
		.catch(displayError);

	function handleResponse(response) {
		if (response.ok == false) {
			throw new Error(`Error: ${response.status} (${response.statusText})`);
		}
		return response.json();
	}

	function displayCommits(data) {
		commitsList.innerHTML = '';
		for (let commit of data) {
			let li = document.createElement('li');
            li.textContent = `${commit.commit.author.name}: ${commit.commit.message} `
			
			commitsList.appendChild(li);
		}
	}

	function displayError(error) {
		commitsList.innerHTML = `${error.message}`;
	}
}