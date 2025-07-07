package com.assignment.organisation.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.organisation.dto.EmployeeResDto;
import com.assignment.organisation.enums.DepartmentName;
import com.assignment.organisation.enums.Designation;
import com.assignment.organisation.exception.CEODoesNotBelongToAnyDepartmentException;
import com.assignment.organisation.exception.EmployeeManagerDepartmentMismatchException;
import com.assignment.organisation.exception.EmployeeNotFoundException;
import com.assignment.organisation.model.Department;
import com.assignment.organisation.model.Employee;
import com.assignment.organisation.objmapper.EmployeeObjMapper;
import com.assignment.organisation.repository.EmployeeRepository;
import com.assignment.organisation.service.DepartmentService;
import com.assignment.organisation.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	private EmployeeRepository empRepo;
	
	@Autowired
	private DepartmentService deptService;

	@Override
	public List<Employee> getAllEmployees() {
		return empRepo.findAll();
	}

	@Override
	public Employee getEmployeeByEmpId(Long empId) {
		return empRepo.findById(empId)
					.orElseThrow(()-> new EmployeeNotFoundException("Employee not found with the given ID."));
	}
	
	@Override
	public Employee getEmployeeByEmpDesignation(String empDesignation) {
		return empRepo.findByDesignation(Designation.valueOf(empDesignation))
					.orElseThrow(()-> new EmployeeNotFoundException("Employee not found with the given ID."));
	}

	@Override
	public EmployeeResDto createEmployeeEntry(EmployeeResDto empDetails) {
		// assign department head as a default manager based on department selected.
		Employee newEmpDetails = EmployeeObjMapper.empDtoToModel(empDetails);
		String deptName = empDetails.getDepartment().getDeptName().toString();
		
		Department deptInfo = deptService.getDepartmentByDeptName(deptName);
		
		if(empDetails.getManager() != null) {
			Long managerEmpId = empDetails.getManager().getEmpId();
			Employee managerEmp = getEmployeeByEmpId(managerEmpId);
			
			if(managerEmp.getDepartment() == null || !managerEmp.getDepartment().getDeptId().equals(deptInfo.getDeptId())) {
				throw new EmployeeManagerDepartmentMismatchException("Manager assigned to new employee belongs to some other department.");
			}

			newEmpDetails.setManager(managerEmp);
			newEmpDetails.setDepartment(managerEmp.getDepartment());
		} else {
			Employee hodEmp = deptInfo.getHeadOfDept();
			newEmpDetails.setManager(hodEmp);
			newEmpDetails.setDepartment(deptInfo);
		}
		
		Employee empSaved = empRepo.save(newEmpDetails);
		return EmployeeObjMapper.empModalToDto(empSaved);
	}

	@Override
	public Employee moveEmployeeToOtherDept(Long empId, Long deptId, Long managerEmpId) {
		Employee emp = empRepo.findById(empId)
							.orElseThrow(()-> new EmployeeNotFoundException("Employee not found with the given ID."));
		
		if(emp.getDesignation().toString().equals(Designation.CEO.toString())) {
			throw new CEODoesNotBelongToAnyDepartmentException("Cannot assign Employee with designation CEO to any department.");
		}
		
		Department dept = deptService.getDepartmentByDeptId(deptId);
		if(managerEmpId != null) {
			Employee managerEmp = getEmployeeByEmpId(managerEmpId);
			if(managerEmp.getDepartment() == null || !managerEmp.getDepartment().getDeptId().equals(deptId)) {
				throw new EmployeeManagerDepartmentMismatchException("Manager selected belongs to some other department.");
			}
			emp.setManager(managerEmp);
		} else {
			emp.setManager(dept.getHeadOfDept());
		}
		emp.setDepartment(dept);
		
		return empRepo.save(emp);
	}
	@Override
	public boolean updateEmployee(Employee emp) {
		return (empRepo.save(emp) != null) ? true : false;
	}

}
