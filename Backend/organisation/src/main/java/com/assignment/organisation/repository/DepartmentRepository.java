package com.assignment.organisation.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.assignment.organisation.enums.DepartmentName;
import com.assignment.organisation.model.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
	Optional<Department> findByDeptName(DepartmentName deptName);
}
