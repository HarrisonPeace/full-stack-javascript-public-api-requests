// JavaScript Document

class EmployeeDirectory {
	constructor(employeeData) {
		this.employees = this.createEmployees(employeeData)
	}
	
	/*
	 *  Create employee object for each set of employee data received and return as an array
	 *  @param  {object}  data recevied from API request
	 *  @return {array} 
	 */
	createEmployees(data) {
		const employees = [];
		for (let i = 0; i < data.length; i++) {
			let employee = new Employee(data[i])
			employees.push(employee);
		}
		return employees;
	}

	/*
	 *  Convert employee info into HTML string ready to be added to the main page of the document
	 *  @param  {object}  employee object
	 *  @return {string} 
	 */
	createCardHTML(employee) {
		const cardHTML = `
			<div class="card">
				<div class="card-img-container">
					<img class="card-img" src="${employee.img}" alt="profile picture">
				</div>
				<div class="card-info-container">
					<h3 id="name" class="card-name cap">${employee.firstName} ${employee.lastName}</h3>
					<p class="card-text">${employee.email}</p>
					<p class="card-text cap">${employee.city}, ${employee.state}</p>
				</div>
			</div>`;
		return cardHTML;
	}
	
	/*
	 *  Convert employee info into HTML string ready to be added to the model element of the document
	 *  @param  {object}  employee object
	 *  @return {string} 
	 */
	createModalHTML_Info(employee) {
		const modalHTML = `
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.img}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.firstName} ${employee.lastName}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.city}</p>
                <hr>
                <p class="modal-text">${employee.mobile}</p>
                <p class="modal-text">${employee.street_No} ${employee.street_Name}, ${employee.city}, ${employee.state}</p>
                <p class="modal-text">Birthday: ${employee.DOB}</p>
            </div>`
		return modalHTML;
	}
	
	/*
	 *  Add all employees to gallery element of document
	 */
	addEmployeesToDocument() {
		for (const employee of this.employees) {
			gallery.insertAdjacentHTML('beforeend', this.createCardHTML(employee));
		}
	}
	
	/*
	 *  Add modal element to document (hidden) waiting for mouse click
	 */
	addModalToDocument() {
		gallery.insertAdjacentHTML('afterend', `
			<div class="modal-container" style="display:none">
				<div class="modal">
					<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
				</div>
				<div class="modal-btn-container">
						<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
						<button type="button" id="modal-next" class="modal-next btn">Next</button>
				</div>
			</div>`);
	}
	
	/*
	 *  Add employee info to modal
	 */
	addModal_INFO_ToDocument(index) {
		const modal = document.querySelector('.modal')
		const employeeInfo = this.createModalHTML_Info(this.employees[index])
		modal.insertAdjacentHTML('beforeend', employeeInfo);
	}
}