function loadRepos() {
	let username = document.getElementById('username').value;
	let loadButtonElement = document.querySelector('button');
	let reposList = document.getElementById('repos');

	fetch(`https://api.github.com/users/${username}/repos`)
		.then(handleResponse)
		.then(displayRepos)
		.catch(displayError);

	function handleResponse(response) {
		if (response.ok == false) {
			throw new Error(`${response.status} ${response.statusText}`);
		}
		return response.json();
	}

	function displayRepos(data) {
		reposList.innerHTML = '';
		for (let repo of data) {
			let li = document.createElement('li');
			let  href = document.createElement('a');
			href.href = repo.html_url;
			href.textContent = repo.full_name;
			li.appendChild(href)
			reposList.appendChild(li);
		}
	}

	function displayError(error) {
		reposList.innerHTML = `${error.message}`;
	}
}