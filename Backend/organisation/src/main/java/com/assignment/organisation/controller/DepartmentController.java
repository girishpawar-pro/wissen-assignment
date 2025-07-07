package com.assignment.organisation.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.organisation.dto.DepartmentResDto;
import com.assignment.organisation.dto.EmployeeOtherDto;
import com.assignment.organisation.objmapper.DepartmentObjMapper;
import com.assignment.organisation.service.DepartmentService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/dept")
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;
	
	@GetMapping
	public ResponseEntity<List<DepartmentResDto>> getAllDepartments(){
		List<DepartmentResDto> allDept = departmentService.getAllDepartment() 
													.stream()
													.map(DepartmentObjMapper::deptModalToDto)
													.collect(Collectors.toList());
		return new ResponseEntity<>(allDept, HttpStatus.OK);
	}
	
	@GetMapping("/{deptId}")
	public ResponseEntity<DepartmentResDto> getDepartmentByDeptId(@PathVariable Long deptId){
		DepartmentResDto dept = DepartmentObjMapper.deptModalToDto(departmentService.getDepartmentByDeptId(deptId));
		return new ResponseEntity<>(dept, HttpStatus.OK);
			
	}
	
	@GetMapping("/{deptName}")
	public ResponseEntity<DepartmentResDto> getDepartmentByDeptId(@PathVariable String deptName){
		DepartmentResDto dept = DepartmentObjMapper.deptModalToDto(departmentService.getDepartmentByDeptName(deptName));
		return new ResponseEntity<>(dept, HttpStatus.OK);		
	}
	
	@PatchMapping("/{deptId}/change-hod/{empId}")
	public ResponseEntity<DepartmentResDto> changeDepartmentHead(@PathVariable Long deptId, @PathVariable Long empId) {
		DepartmentResDto deptInfo = DepartmentObjMapper.deptModalToDto(departmentService.changeHOD(deptId, empId));
		return new ResponseEntity<>(deptInfo, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<DepartmentResDto> addNewDepartment(@RequestBody DepartmentResDto newDept) {
		DepartmentResDto newDeptCreated = departmentService.createNewDepartment(newDept);
		return new ResponseEntity<>(newDeptCreated, HttpStatus.CREATED);
	}
	
}
