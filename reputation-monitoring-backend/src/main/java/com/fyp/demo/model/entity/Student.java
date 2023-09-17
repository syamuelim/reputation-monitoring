package com.fyp.demo.model.entity;

import jakarta.persistence.*; // for Spring Boot 3
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor
@Table(name = "student")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "name")
	private String name;
	
	public Student(String name) {
		this.name = name;
	}
}