// JavaScript Document

/*==========================================================================
-----------------------------  Global Variables  ---------------------------
============================================================================*/
const gallery = document.getElementById('gallery');
let employeeDirectory;
let currentEmployeeIndex = 0;

/*==========================================================================
---------------------------------  Search Bar  -----------------------------
============================================================================*/
const search_bar = `
	<form method="get" onsubmit="search(event)">
        <input type="search" id="search-input" class="search-input" onsearch="search(event)" placeholder="Search...">
        <input type="submit" id="search-submit" class="search-submit">
    </form>`;

document.querySelector('.search-container').insertAdjacentHTML('beforeend', search_bar);

/*
 *  Search Bar Function
 */
function search(event) {
	event.preventDefault()
  // Declare variables
  let input, filter, employee, searchCritera;
  input = document.getElementById('search-input');
  filter = input.value.toUpperCase();
  employees = gallery.querySelectorAll('.card');
	
  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < employees.length; i++) {
    searchCritera = employees[i].querySelector('h3').innerHTML.toUpperCase();
    if (searchCritera.indexOf(filter) > -1) {
      employees[i].style.display = "";
    } else {
      employees[i].style.display = "none";
    }
  }
}

/*==========================================================================
--------------------------- User Activity Functions  -----------------------
============================================================================*/
/*
 *  Check if click occurs on a card element, if so show modal and insert related employee info
 */
function galleryClick(e) {
	let employeeCards = Array.from(document.querySelectorAll('.card'));
	let card = e.target.closest('.card')
	currentEmployeeIndex = employeeCards.indexOf(card);
	if(card !== null) {
		document.querySelector('.modal-container').style.display = 'initial';
		employeeDirectory.addModal_INFO_ToDocument(currentEmployeeIndex);
	}
}

/*
 *  Close modal and remove current employee info
 */
function closeModal() {
	document.querySelector('.modal-container').style.display = 'none';
	document.querySelector('.modal-info-container').remove();
}

/*
 *  Change employee info to either next or previous employee
 *  @param  {object}  click event object
 */
function changeModal(e) {
	let id = e.target.id;
	if(id) {
		document.querySelector('.modal-info-container').remove();
		if(id == 'modal-next') {
			currentEmployeeIndex++
			if (currentEmployeeIndex >= employeeDirectory.employees.length) {
				currentEmployeeIndex = 0;
			} 
			employeeDirectory.addModal_INFO_ToDocument(currentEmployeeIndex);
		} else if (id == 'modal-prev') {
			currentEmployeeIndex--
			if (currentEmployeeIndex < 0) {
				currentEmployeeIndex = employeeDirectory.employees.length - 1;
			} 
			employeeDirectory.addModal_INFO_ToDocument(currentEmployeeIndex);
		}
	}
}

/*==========================================================================
--------------------------------  Fetch API  -------------------------------
============================================================================*/
/*
 *  Fetch imformation from Random Use Api
 *  request the following:
 *  -12 results
 *  -Australian Nationality
 *  -Picture, name, email, location, cell (mobile phone), date of birth
 */
fetch('https://randomuser.me/api/?results=12&nat=au&inc=picture,name,email,location,cell,dob')
  .then(response => response.json())
  .then(data => createEmployeeDirectory(data.results))

/*==========================================================================
------------------------- Create Employee Directory  -----------------------
============================================================================*/
/*
 *  create employee directory and all functionality to the page
 *  @param  {object}  data recevied from API request
 */
function createEmployeeDirectory(data) {
	employeeDirectory = new EmployeeDirectory(data);
	employeeDirectory.addEmployeesToDocument();
	employeeDirectory.addModalToDocument();
	document.getElementById('modal-close-btn').addEventListener('click', closeModal)
	document.querySelector('.modal-btn-container').addEventListener('click', changeModal)
	gallery.addEventListener('click', e => galleryClick(e));
}
