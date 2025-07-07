package com.assignment.organisation.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.organisation.enums.DepartmentName;
import com.assignment.organisation.enums.Designation;
import com.assignment.organisation.enums.Gender;

@RestController
@RequestMapping("/fields")
public class FieldsController {
	
	@GetMapping("/designation")
	public ResponseEntity<List<Designation>> getAllDesignation() {
		return new ResponseEntity<>(Arrays.asList(Designation.values()), HttpStatus.OK);
	}
	
	@GetMapping("/gender")
	public ResponseEntity<List<Gender>> getAllGender() {
		return new ResponseEntity<>(Arrays.asList(Gender.values()), HttpStatus.OK);
	}
	
	@GetMapping("/department")
	public ResponseEntity<List<DepartmentName>> getAllDepartment() {
		return new ResponseEntity<>(Arrays.asList(DepartmentName.values()), HttpStatus.OK);
	}
	
}
