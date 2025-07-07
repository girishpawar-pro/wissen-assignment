package com.assignment.organisation.model;

import java.util.List;

import com.assignment.organisation.enums.DepartmentName;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "department")
public class Department {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long deptId;
	
	@Column(name = "dept_name", nullable = false, length = 15, unique = true)
	@Enumerated(EnumType.STRING)
	private DepartmentName deptName;
	
	@OneToOne()
	@JoinColumn(name = "hod_emp_id")
	private Employee headOfDept;
	
	@OneToMany(mappedBy = "department")
	public List<Employee> employees;
	
	public Department() {}

	public Department(Long deptId, DepartmentName deptName
			, Employee headOfDept
			) {
		super();
		this.deptId = deptId;
		this.deptName = deptName;
		this.headOfDept = headOfDept;
	}

	public Long getDeptId() {
		return deptId;
	}

	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}

	public DepartmentName getDeptName() {
		return deptName;
	}

	public void setDeptName(DepartmentName deptName) {
		this.deptName = deptName;
	}

	public Employee getHeadOfDept() {
		return headOfDept;
	}

	public void setHeadOfDept(Employee headOfDept) {
		this.headOfDept = headOfDept;
	}
	
	@Override
	public String toString() {
		return "Department [deptId=" + deptId + ", deptName=" + deptName + "]";
	}
}
