package com.assignment.organisation.dto;

public class DepartmentResDto {

	private Long deptId;
	
	private String deptName;
	
	private EmployeeOtherDto hodEmp;
	
	public DepartmentResDto(){}

	public DepartmentResDto(Long deptId, String deptName, EmployeeOtherDto hodEmp) {
		super();
		this.deptId = deptId;
		this.deptName = deptName;
		this.hodEmp = hodEmp;
	}

	public Long getDeptId() {
		return deptId;
	}

	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	
	public EmployeeOtherDto getHodEmp() {
		return hodEmp;
	}

	public void setHodEmp(EmployeeOtherDto hodEmp) {
		this.hodEmp = hodEmp;
	}

	@Override
	public String toString() {
		return "DepartmentResDto [deptId=" + deptId + ", deptName=" + deptName + ", hodEmp=" + hodEmp + "]";
	}

}
