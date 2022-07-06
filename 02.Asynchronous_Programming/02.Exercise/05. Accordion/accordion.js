function solution() {
    let mainSection = document.getElementById('main');
    let url = 'http://localhost:3030/jsonstore/advanced/articles/';

    mainSection.addEventListener('click', toggle, true)


    async function getArticles() {
        try {
            let response = await fetch(url + 'list');
            if (response.ok == false) {
                throw new Error('Site not found');
            };

            let data = await response.json();
            for (let articleObj of data) {
                let divElement = document.createElement('div');
                divElement.className = "accordion";

                let articleResponse = await fetch(url + 'details/' + articleObj._id);

                if (articleResponse.ok == false) {
                    throw new Error('Article not found');
                };

                let articleData = await articleResponse.json();
                divElement.innerHTML = `\
                <div class="head">\
                <span>${articleObj.title}</span>\
                <button class="button" id="${articleObj._id}">More</button>\
                </div>\
                <div class="extra">\
                <p>${articleData.content}</p>
                </div>`;
                mainSection.appendChild(divElement);
            }


        } catch (error) {
            console.log(error.message)
        }
    }

    function toggle(event) {

        if (event.target.nodeName == "BUTTON") {
            console.log('more clicked')
            let buttonText = event.target.textContent;
            let hiddenElement = event.target.parentElement.parentElement.querySelector('.extra')
            let hiddenTextStyle = hiddenElement.style.display;

            if (buttonText == 'More') {
                event.target.textContent = 'Less'
                hiddenElement.style.display = 'block'
            } else if (buttonText == 'Less') {
                event.target.textContent = 'More';
                hiddenElement.style.display = ''
            }
        }
    }

    getArticles()
}

solution()