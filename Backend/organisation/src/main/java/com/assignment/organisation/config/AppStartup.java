package com.assignment.organisation.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.assignment.organisation.enums.DepartmentName;
import com.assignment.organisation.enums.Designation;
import com.assignment.organisation.enums.Gender;
import com.assignment.organisation.model.Department;
import com.assignment.organisation.model.Employee;
import com.assignment.organisation.repository.DepartmentRepository;
import com.assignment.organisation.repository.EmployeeRepository;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class AppStartup implements CommandLineRunner {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private DepartmentRepository departmentRepository;

	@Override
	public void run(String... args) throws Exception {
		
		List<Department> department = Arrays.asList(
				new Department(null, DepartmentName.IT, null),
				new Department(null, DepartmentName.ENGINEERING, null),
				new Department(null, DepartmentName.ADMIN, null)
			);
			
		System.out.println(department.toString());
		departmentRepository.saveAll(department);
		System.out.println("Department Data Saved Successfully");
		
		List<Employee> employees = Arrays.asList(
			new Employee(null, "Sam", null, "Oswald", Gender.MALE , "01-Jan-2020", Designation.CEO, null, null),
			new Employee(null, "Penny", null, "Nunt", Gender.FEMALE , "02-Jan-2020", Designation.MANAGER, 
					new Employee(1l, "Sam", null, "Oswald", Gender.MALE , "01-Jan-2020", Designation.CEO, null, null),
					new Department(1l, DepartmentName.IT, null)),
			new Employee(null, "Kate", null, "Putin", Gender.FEMALE , "03-Jan-2020", Designation.MANAGER, 
					new Employee(1l, "Sam", null, "Oswald", Gender.MALE , "01-Jan-2020", Designation.CEO, null, null),
					new Department(2l, DepartmentName.ENGINEERING, null)),
			new Employee(null, "Gary", null, "Paul", Gender.MALE , "04-Jan-2020", Designation.MANAGER, 
					new Employee(1l, "Sam", null, "Oswald", Gender.MALE , "01-Jan-2020", Designation.CEO, null, null),
					new Department(3l, DepartmentName.ADMIN, null))
		);
		
		System.out.println(employees.toString());
		employeeRepository.saveAll(employees);
		System.out.println("Employee Data Saved Successfully");
		
		
		List<Department> addHODEmp = Arrays.asList(
				new Department(1l, DepartmentName.IT, new Employee(2l, null, null, null, null, null, null, null, null)),
				new Department(2l, DepartmentName.ENGINEERING, new Employee(3l, null, null, null, null, null, null, null, null)),
				new Department(3l, DepartmentName.ADMIN, new Employee(4l, null, null, null, null, null, null, null, null))
			);
		
		System.out.println(addHODEmp.toString());
		departmentRepository.saveAll(addHODEmp);
		System.out.println("Data Saved Successfully");
				
	}

}
