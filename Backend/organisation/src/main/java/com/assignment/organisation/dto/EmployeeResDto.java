package com.assignment.organisation.dto;

import com.assignment.organisation.model.Department;

public class EmployeeResDto {

	private Long empId;
	
	private String firstName;
	
	private String middleName;

	private String lastName;
	
	private String fullName;
	
	private String gender;
	
	private String dob;
	
	private String designation;
	
	private DepartmentResDto department;
	
	private EmployeeOtherDto manager;

	public Long getEmpId() {
		return empId;
	}

	public void setEmpId(Long empId) {
		this.empId = empId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public DepartmentResDto getDepartment() {
		return department;
	}

	public void setDepartment(DepartmentResDto department) {
		this.department = department;
	}

	public EmployeeOtherDto getManager() {
		return manager;
	}

	public void setManager(EmployeeOtherDto manager) {
		this.manager = manager;
	}
	
	public EmployeeResDto() {}

	public EmployeeResDto(Long empId, String firstName, String middleName, String lastName, String fullName,
			String gender, String dob, String designation, DepartmentResDto department, EmployeeOtherDto manager) {
		super();
		this.empId = empId;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.fullName = fullName;
		this.gender = gender;
		this.dob = dob;
		this.designation = designation;
		this.department = department;
		this.manager = manager;
	}

	@Override
	public String toString() {
		return "EmployeeResDto [empId=" + empId + ", firstName=" + firstName + ", middleName=" + middleName
				+ ", lastName=" + lastName + ", fullName=" + fullName + ", gender=" + gender + ", dob=" + dob
				+ ", Designation=" + designation + ", department=" + department + ", manager=" + manager + "]";
	}
	
	
}
