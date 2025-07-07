package com.assignment.organisation.exception;

import org.springframework.http.ResponseEntity;

public class DepartmentNotFoundException extends RuntimeException {

	public DepartmentNotFoundException(String message) {
		super(message);
	}
 }
