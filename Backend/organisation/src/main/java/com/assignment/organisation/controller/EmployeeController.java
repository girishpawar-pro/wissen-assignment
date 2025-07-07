package com.assignment.organisation.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.organisation.dto.EmployeeResDto;
import com.assignment.organisation.objmapper.EmployeeObjMapper;
import com.assignment.organisation.service.EmployeeService;

@RestController
@RequestMapping("/emp")
public class EmployeeController {
	
	@Autowired
	private EmployeeService empService;

	@GetMapping
	public ResponseEntity<List<EmployeeResDto>> getAllEmployees() {
		List<EmployeeResDto> allEmpResp = empService.getAllEmployees()
													.stream()
													.map(EmployeeObjMapper::empModalToDto).collect(Collectors.toList());
		return new ResponseEntity<>(allEmpResp, HttpStatus.OK);
	}
	
	@GetMapping("/{empId}")
	public ResponseEntity<EmployeeResDto> getEmployeeById(@PathVariable Long empId) {
		EmployeeResDto empResp = EmployeeObjMapper.empModalToDto(empService.getEmployeeByEmpId(empId));
		return new ResponseEntity<>(empResp, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<EmployeeResDto> createEmployeeEntry(@RequestBody EmployeeResDto empDto){
		return new ResponseEntity<>(empService.createEmployeeEntry(empDto), HttpStatus.CREATED);
	}
	
	@PatchMapping("/{empId}/move-to/{deptId}/under/{managerEmpId}")
	public ResponseEntity<EmployeeResDto> moveEmployeeToOtherDepartment(
			@PathVariable Long empId, 
			@PathVariable Long deptId, 
			@PathVariable(required = false, name = "managerEmpId") Long managerEmpId){
		
		EmployeeResDto empMovedResponse = EmployeeObjMapper.empModalToDto(empService.moveEmployeeToOtherDept(empId, deptId, managerEmpId));
		return new ResponseEntity<>(empMovedResponse, HttpStatus.OK);
	}
}
