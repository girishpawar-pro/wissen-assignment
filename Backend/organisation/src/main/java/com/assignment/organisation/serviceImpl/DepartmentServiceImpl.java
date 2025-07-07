package com.assignment.organisation.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.assignment.organisation.dto.DepartmentResDto;
import com.assignment.organisation.enums.DepartmentName;
import com.assignment.organisation.enums.Designation;
import com.assignment.organisation.exception.CEODoesNotBelongToAnyDepartmentException;
import com.assignment.organisation.exception.DepartmentNotFoundException;
import com.assignment.organisation.exception.EmployeeIsAlreadyHODException;
import com.assignment.organisation.exception.HeadOfDepartmentNotAssignedException;
import com.assignment.organisation.model.Department;
import com.assignment.organisation.model.Employee;
import com.assignment.organisation.objmapper.DepartmentObjMapper;
import com.assignment.organisation.repository.DepartmentRepository;
import com.assignment.organisation.service.DepartmentService;
import com.assignment.organisation.service.EmployeeService;

@Service
public class DepartmentServiceImpl implements DepartmentService {
	
	private DepartmentRepository deptRepo;
	private EmployeeService employeeService;
	
	public DepartmentRepository getDeptRepo() {
		return deptRepo;
	}

	@Autowired
	public void setDeptRepo(DepartmentRepository deptRepo) {
		this.deptRepo = deptRepo;
	}

	public EmployeeService getEmployeeService() {
		return employeeService;
	}

	@Autowired
	public void setEmployeeService(@Lazy EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	@Override
	public List<Department> getAllDepartment() {
		return deptRepo.findAll();
	}

	@Override
	public Department getDepartmentByDeptId(Long deptId) {
		return deptRepo.findById(deptId)
					.orElseThrow(()-> new DepartmentNotFoundException("Department not found with given ID."));
	}

	@Override
	public Department getDepartmentByDeptName(String deptName) {
		return deptRepo.findByDeptName(DepartmentName.valueOf(deptName))
					.orElseThrow(()-> new DepartmentNotFoundException("Department not found with given name."));
	}

	@Override
	public Department changeHOD(Long deptId, Long empid) {
		Department dept = getDepartmentByDeptId(deptId);
		Employee emp = employeeService.getEmployeeByEmpId(empid);
		
		if(emp.getDesignation().toString().equals(Designation.CEO.toString())) {
			throw new CEODoesNotBelongToAnyDepartmentException("Cannot assign Employee with designation CEO to any department.");
		}
		
		//check if the employee is not head of any department.
		 List<Department> empDeptToBeHOD = getAllDepartment().stream()
						.filter( dp -> dp.getHeadOfDept().getEmpId().equals(empid))
						.collect(Collectors.toList());

		if(!empDeptToBeHOD.isEmpty()) {
			throw new EmployeeIsAlreadyHODException("Emplyeoo with ID is already a department head.");
		}
		emp.setManager(employeeService.getEmployeeByEmpDesignation(Designation.CEO.toString()));
		dept.setHeadOfDept(emp);
		dept.setHeadOfDept(emp);
		
		return deptRepo.save(dept);
	}

	@Override
	public DepartmentResDto createNewDepartment(DepartmentResDto deptInfo) {
		if(deptInfo.getHodEmp() == null) {
			throw new HeadOfDepartmentNotAssignedException("HOD employee not assinged.");
		}
		
		Employee hodEmp = employeeService.getEmployeeByEmpId(deptInfo.getHodEmp().getEmpId());
		
		if(hodEmp.getDesignation().toString().equals(Designation.CEO.toString())) {
			throw new CEODoesNotBelongToAnyDepartmentException("Cannot assign Employee with designation CEO to any department.");
		}
		
		//check if the employee is not head of any department.
		 List<Department> empDeptToBeHOD = getAllDepartment().stream()
						.filter( dp -> dp.getHeadOfDept().getEmpId().equals(hodEmp.getEmpId()))
						.collect(Collectors.toList());

		if(!empDeptToBeHOD.isEmpty()) {
			throw new EmployeeIsAlreadyHODException("Emplyeoo with ID is already a department head.");
		}

		Department dept = DepartmentObjMapper.deptDtoToModel(deptInfo);
		hodEmp.setManager(employeeService.getEmployeeByEmpDesignation(Designation.CEO.toString()));
		hodEmp.setDepartment(dept);
		dept.setHeadOfDept(hodEmp);
		
		Department newDept =  deptRepo.save(dept);
		employeeService.updateEmployee(hodEmp);
		return DepartmentObjMapper.deptModalToDto(newDept);
	}
}
