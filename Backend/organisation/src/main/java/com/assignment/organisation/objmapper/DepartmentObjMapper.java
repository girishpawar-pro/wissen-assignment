package com.assignment.organisation.objmapper;

import com.assignment.organisation.dto.DepartmentResDto;
import com.assignment.organisation.dto.EmployeeOtherDto;
import com.assignment.organisation.dto.EmployeeResDto;
import com.assignment.organisation.enums.DepartmentName;
import com.assignment.organisation.model.Department;
import com.assignment.organisation.model.Employee;

public class DepartmentObjMapper {

	public static DepartmentResDto deptModalToDto(Department deptModel) {
		DepartmentResDto deptDto = new DepartmentResDto();
		deptDto.setDeptId(deptModel.getDeptId());
		deptDto.setDeptName(deptModel.getDeptName().toString());
		
		EmployeeOtherDto hodEmp = new EmployeeOtherDto();
		Employee hodInfo = deptModel.getHeadOfDept();
		hodEmp.setEmpId(hodInfo.getEmpId());
		hodEmp.setFirstName(hodInfo.getFirstName());
		hodEmp.setLastName(hodInfo.getLastName());
		hodEmp.setMiddleName(hodInfo.getMiddleName());
		hodEmp.setFullName(hodInfo.getFirstName() + (hodInfo.getMiddleName() != null ? hodInfo.getMiddleName() + " " : " ") + hodInfo.getLastName());
		hodEmp.setGender(hodInfo.getGender().toString());
		hodEmp.setDob(hodInfo.getDob());
		hodEmp.setDesignation(hodInfo.getDesignation().toString());
		
		deptDto.setHodEmp(hodEmp);
		
		return deptDto;
	}
	
	public static Department deptDtoToModel(DepartmentResDto deptDto) {
		Department deptModel = new Department();
		deptModel.setDeptName(DepartmentName.valueOf(deptDto.getDeptName()));
		
		Employee hodEmp = new Employee();
		deptModel.setHeadOfDept(hodEmp);
		
		return deptModel;
	}
	
}
