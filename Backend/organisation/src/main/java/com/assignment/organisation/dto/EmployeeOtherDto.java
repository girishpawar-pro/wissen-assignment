package com.assignment.organisation.dto;

public class EmployeeOtherDto {
	
	private Long empId;
	
	private String firstName;
	
	private String middleName;

	private String lastName;
	
	private String fullName;
	
	private String gender;
	
	private String dob;
	
	private String designation;
	
	public EmployeeOtherDto() {}
	
	public EmployeeOtherDto(Long empId, String firstName, String middleName, String lastName, String fullName,
			String gender, String dob, String designation) {
		super();
		this.empId = empId;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.fullName = fullName;
		this.gender = gender;
		this.dob = dob;
		this.designation = designation;
	}
	
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

}
