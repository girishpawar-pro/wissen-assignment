package com.assignment.organisation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler({EmployeeNotFoundException.class})
	public ResponseEntity<Object> handleEmployeeNotFoundException(EmployeeNotFoundException exception) {
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(exception.getMessage());
	}
	
	@ExceptionHandler({EmployeeAlreadyExistException.class})
	public ResponseEntity<Object> handleEmployeeAlreadyExistException(EmployeeAlreadyExistException exception) {
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(exception.getMessage());
	}
	
	@ExceptionHandler({DepartmentNotFoundException.class})
	public ResponseEntity<Object> handleDepartmentNotFoundException(DepartmentNotFoundException exception) {
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(exception.getMessage());
	}
	
	@ExceptionHandler({EmployeeManagerDepartmentMismatchException.class})
	public ResponseEntity<Object> handleEmployeeManagerDepartmentMismatchException(EmployeeManagerDepartmentMismatchException exception) {
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(exception.getMessage());
	}
	
	@ExceptionHandler({CEODoesNotBelongToAnyDepartmentException.class})
	public ResponseEntity<Object> handleCEODoesNotBelongToAnyDepartmentException(CEODoesNotBelongToAnyDepartmentException exception) {
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(exception.getMessage());
	}
	
	@ExceptionHandler({EmployeeIsAlreadyHODException.class})
	public ResponseEntity<Object> handleEmployeeIsAlreadyHODException(EmployeeIsAlreadyHODException exception) {
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(exception.getMessage());
	}
	
	@ExceptionHandler({HeadOfDepartmentNotAssignedException.class})
	public ResponseEntity<Object> handleHeadOfDepartmentNotAssignedException(HeadOfDepartmentNotAssignedException exception) {
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(exception.getMessage());
	}
	
}
