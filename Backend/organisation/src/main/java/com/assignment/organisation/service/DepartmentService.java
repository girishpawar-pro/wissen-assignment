package com.assignment.organisation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.assignment.organisation.dto.DepartmentResDto;
import com.assignment.organisation.model.Department;

public interface DepartmentService {
	
	List<Department> getAllDepartment();
	Department getDepartmentByDeptId(Long deptId);
	Department getDepartmentByDeptName(String deptName);
	Department changeHOD(Long deptId, Long empid);
	DepartmentResDto createNewDepartment(DepartmentResDto deptInfo);
	
}
