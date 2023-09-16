package com.fyp.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
  List<Student> findByNameContaining(String name);
}