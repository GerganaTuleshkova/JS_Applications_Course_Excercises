import { towns } from './towns.js';
import { html, render } from './node_modules/lit-html/lit-html.js';


let townsTemplate = (townsData) =>
   html`<ul>
    ${townsData.map(town => html`<li>${town}</li>`)}
    </ul>`;

const container = document.getElementById('towns');
render(townsTemplate(towns), container);

let searchButton = document.querySelector('button');
searchButton.addEventListener('click', search);


function search() {
   let searchedText = document.getElementById('searchText').value.toLowerCase();

   // for (let town of container.querySelectorAll('li')) {
   //    // town.style.fontWeight = '';
   //    // town.style.textDecoration = '';
   //    town.className = ''
   // }

   Array.from(container.querySelectorAll('li')).map(t => t.className = '')

   let matchesCount = 0;

   for (let town of container.querySelectorAll('li')) {
      if (town.textContent.toLowerCase().includes(searchedText)) {
         // town.style.fontWeight = 'bold';
         // town.style.textDecoration = 'underline';
         town.className = 'active'
         matchesCount++;
      }
   }

   document.getElementById('result').textContent = `${matchesCount} matches found`;
}
