package com.assignment.organisation.model;

import java.time.LocalDate;

import com.assignment.organisation.enums.Designation;
import com.assignment.organisation.enums.Gender;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long empId;
	
	@Column(nullable = false)
	private String firstName;
	
	private String middleName;
	
	@Column(nullable = false)
	private String lastName;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Column(nullable = false)
	private String dob;
	
	@Enumerated(EnumType.STRING)
	private Designation designation;
	
	@ManyToOne() 
	@JoinColumn(name = "manager_emp_id")
	private Employee manager;

	@ManyToOne()
	@JoinColumn(name = "dept_id")
	private Department department;
	
	public Employee() {}

	public Employee(Long empId, String firstName, String middleName, String lastName, Gender gender, String dob,
			Designation designation
			,Employee manager
			, Department department
			) {
		super();
		this.empId = empId;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.gender = gender;
		this.dob = dob;
		this.designation = designation;
		this.manager = manager;
		this.department = department;
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

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public Designation getDesignation() {
		return designation;
	}

	public void setDesignation(Designation designation) {
		this.designation = designation;
	}

	public Employee getManager() {
		return manager;
	}

	public void setManager(Employee manager) {
		this.manager = manager;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
	
	@Override
	public String toString() {
		return "Employee [empId=" + empId + ", firstName=" + firstName + ", middleName=" + middleName + ", lastName="
				+ lastName + ", gender=" + gender + ", dob=" + dob + ", designation=" + designation + "]";
	}
	
}
