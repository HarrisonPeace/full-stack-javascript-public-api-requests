// JavaScript Document

class Employee {
	constructor(employeeInfo) {
		this.img = employeeInfo.picture.large;
		this.firstName = employeeInfo.name.first;
		this.lastName = employeeInfo.name.last;
		this.DOB = this.convertDOB(employeeInfo.dob.date);
		this.email = employeeInfo.email;
		this.city = employeeInfo.location.city;
		this.state = employeeInfo.location.state;
		this.mobile = this.convertMobile(employeeInfo.cell);
		this.street_No = employeeInfo.location.street.number;
		this.street_Name = employeeInfo.location.street.name;
	}

	/*
	 *  Convert API Mobile number in to more readable format
	 *  @param  {string}  mobile number from API
	 *  @return {string} 
	 */
	convertMobile(number) {
		let convertedMobile = `
			(${number.substring(0, 3)}) ${number.substring(3, 4)}${number.substring(6, 8)}-${number.substring(7, 8)}${number.substring(9, 12)}`;
		return convertedMobile;
	}

	/*
	 *  Convert API DOB in to more readable format
	 *  @param  {string}  DOB number from API
	 *  @return {string} 
	 */
	convertDOB(DOB) {
		let convertedDOB = `
			${DOB.substring(8, 10)}/${DOB.substring(5, 7)}/${DOB.substring(0, 4)}`;
		return convertedDOB;
	}
}