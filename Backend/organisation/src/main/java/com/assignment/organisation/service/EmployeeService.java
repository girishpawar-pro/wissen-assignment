package com.assignment.organisation.service;

import java.util.List;
import java.util.Optional;

import com.assignment.organisation.dto.EmployeeResDto;
import com.assignment.organisation.model.Employee;

public interface EmployeeService {
	List<Employee> getAllEmployees();
	Employee getEmployeeByEmpId(Long empId);
	Employee getEmployeeByEmpDesignation(String empId);
	
	EmployeeResDto createEmployeeEntry(EmployeeResDto empDetails);
	boolean updateEmployee(Employee emp);
	
	Employee moveEmployeeToOtherDept(Long empId, Long deptId, Long managerEmpId);
	
}
