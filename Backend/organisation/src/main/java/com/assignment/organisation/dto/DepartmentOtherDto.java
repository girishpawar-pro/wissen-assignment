package com.assignment.organisation.dto;

public class DepartmentOtherDto {

	private Long deptId;
	
	private String deptName;

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

	public DepartmentOtherDto(){}
	
	public DepartmentOtherDto(Long deptId, String deptName) {
		super();
		this.deptId = deptId;
		this.deptName = deptName;
	}

	@Override
	public String toString() {
		return "DepartmentResDto [deptId=" + deptId + ", deptName=" + deptName + "]";
	}
	
	
}
