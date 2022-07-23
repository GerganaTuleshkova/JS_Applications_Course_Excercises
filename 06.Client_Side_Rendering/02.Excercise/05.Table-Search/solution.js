import { html, render } from './node_modules/lit-html/lit-html.js';


let url = 'http://localhost:3030/jsonstore/advanced/table';
const tableBody = document.querySelector('.container tbody');

renderAllTableRows();

document.querySelector('#searchBtn').addEventListener('click', searchText);


function searchText() {
   let searchedText = document.getElementById('searchField').value.toLowerCase();

   // clear the fomatting
   Array.from(tableBody.querySelectorAll('tr')).map(row => row.className = '');

   for (let studentRow of tableBody.querySelectorAll('tr')) {
      if (Array.from(studentRow.querySelectorAll('td'))
         .filter(cell => cell
            .textContent
            .toLowerCase()
            .includes(searchedText)).length > 0) {
         studentRow.className = 'select'
      }
   }

   // clear the input field text
   document.getElementById('searchField').value = '';
}

async function renderAllTableRows() {

   let rowTemplate = (studentData) =>
      html`<tr>
         <td>${studentData.firstName} ${studentData.lastName}</td>
         <td>${studentData.email}</td>
         <td>${studentData.course}</td>
     </tr>`;

   try {
      let response = await fetch(url);

      if (response.ok == false) {
         let error = await response.json();
         throw new Error(error.message);
      }

      let data = await response.json();
      let optionsList = Object.values(data);

      render(optionsList.map(rowTemplate), tableBody);

   } catch (error) {
      alert(error.message);
   }
}

