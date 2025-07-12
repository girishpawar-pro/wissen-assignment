package com.assignment.organisation.controller;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import com.assignment.organisation.dto.DepartmentResDto;
import com.assignment.organisation.dto.EmployeeOtherDto;
import com.assignment.organisation.exception.CEODoesNotBelongToAnyDepartmentException;
import com.assignment.organisation.exception.EmployeeIsAlreadyHODException;
import com.assignment.organisation.exception.EmployeeNotFoundException;
import com.assignment.organisation.exception.HeadOfDepartmentNotAssignedException;
import com.assignment.organisation.service.DepartmentService;

@SpringBootTest
public class DepartmentControllerTests {
	
	@Autowired
	private DepartmentService departmentService;
	

	
	@Test
	void ceoCantBeDeptHeadException() {
		EmployeeOtherDto hodEmp = new EmployeeOtherDto(1l, "Rocky", "", "Malya", "Rocky Malya", "MALE", "14-03-1991", "MANAGER");
		DepartmentResDto departmentResDto = new DepartmentResDto(null, "HR", hodEmp);
		
		CEODoesNotBelongToAnyDepartmentException exception = Assertions.assertThrows(
				CEODoesNotBelongToAnyDepartmentException.class, 
				() -> departmentService.createNewDepartment(departmentResDto));
		
		Assertions.assertEquals("Cannot assign Employee with designation CEO to any department.", exception.getMessage());
	}
	
	@Test
	void employeeAlreadyDeptHeadException() {
		EmployeeOtherDto hodEmp = new EmployeeOtherDto(2l, "Rocky", "", "Malya", "Rocky Malya", "MALE", "14-03-1991", "MANAGER");
		DepartmentResDto departmentResDto = new DepartmentResDto(null, "HR", hodEmp);
		
		EmployeeIsAlreadyHODException exception = Assertions.assertThrows(
				EmployeeIsAlreadyHODException.class, 
				() -> departmentService.createNewDepartment(departmentResDto));
		
		Assertions.assertEquals("Emplyeoo with ID is already a department head.", exception.getMessage());
	}
	
	@Test
	void hodNotAssignedException() {		
		EmployeeOtherDto hodEmp = null;
		DepartmentResDto departmentResDto = new DepartmentResDto(null, "HR", hodEmp);
		
		HeadOfDepartmentNotAssignedException exception = Assertions.assertThrows(
				HeadOfDepartmentNotAssignedException.class, 
				() -> departmentService.createNewDepartment(departmentResDto));
		
		Assertions.assertEquals("HOD employee not assinged.", exception.getMessage());
	}
	
}
