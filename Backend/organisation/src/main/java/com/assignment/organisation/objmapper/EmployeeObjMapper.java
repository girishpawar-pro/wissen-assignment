package com.assignment.organisation.objmapper;

import org.springframework.stereotype.Component;

import com.assignment.organisation.dto.DepartmentResDto;
import com.assignment.organisation.dto.EmployeeOtherDto;
import com.assignment.organisation.dto.EmployeeResDto;
import com.assignment.organisation.enums.Designation;
import com.assignment.organisation.enums.Gender;
import com.assignment.organisation.model.Department;
import com.assignment.organisation.model.Employee;

@Component
public class EmployeeObjMapper {
	
	public static EmployeeResDto empModalToDto(Employee empModel) {
		EmployeeResDto empDto = new EmployeeResDto();
		empDto.setEmpId(empModel.getEmpId());
		empDto.setFirstName(empModel.getFirstName());
		empDto.setLastName(empModel.getLastName());
		empDto.setMiddleName(empModel.getMiddleName());
		empDto.setFullName(empModel.getFirstName() + (empModel.getMiddleName() != null ? empModel.getMiddleName() + " " : " ") + empModel.getLastName());
		empDto.setGender(empModel.getGender().toString());
		empDto.setDob(empModel.getDob());
		empDto.setDesignation(empModel.getDesignation().toString());
		
		if(empModel.getDepartment() != null) {
			DepartmentResDto deptInfo = new DepartmentResDto();
			deptInfo.setDeptId(empModel.getDepartment().getDeptId());
			deptInfo.setDeptName(empModel.getDepartment().getDeptName().toString());
			
			Employee hodEmp = empModel.getDepartment().getHeadOfDept();
			EmployeeOtherDto hodEmpInfo = new EmployeeOtherDto(
					hodEmp.getEmpId(), hodEmp.getFirstName(), hodEmp.getMiddleName(), hodEmp.getLastName(),
					(hodEmp.getFirstName() + (hodEmp.getMiddleName() != null ? " " + hodEmp.getMiddleName() + " ": " ") + hodEmp.getLastName()), hodEmp.getGender().toString(), 
					hodEmp.getDob(), hodEmp.getDesignation().toString()
				);
			deptInfo.setHodEmp(hodEmpInfo);
			empDto.setDepartment(deptInfo);
		}
		
		if(empModel.getManager() != null) {
			Employee empManager = empModel.getManager();
			EmployeeOtherDto empManagerInfo = new EmployeeOtherDto(
					empManager.getEmpId(), empManager.getFirstName(), empManager.getMiddleName(), empManager.getLastName(),
					(empManager.getFirstName() + (empManager.getMiddleName() != null ? " " + empManager.getMiddleName() + " ": " ") + empManager.getLastName()), empManager.getGender().toString(), 
					empManager.getDob(), empManager.getDesignation().toString()
				);
			empDto.setManager(empManagerInfo);
		}
		
		return empDto;
	}
	
	public static Employee empDtoToModel(EmployeeResDto empDto) {
		Employee empModel = new Employee();
		empModel.setFirstName(empDto.getFirstName());
		empModel.setLastName(empDto.getLastName());
		empModel.setMiddleName(empDto.getMiddleName());
		empModel.setGender(Gender.valueOf(empDto.getGender()));
		empModel.setDob(empDto.getDob());
		empModel.setDesignation(Designation.valueOf(empDto.getDesignation()));
		empModel.setDepartment(new Department());
		empModel.setManager(new Employee());
		return empModel;
	}
}
