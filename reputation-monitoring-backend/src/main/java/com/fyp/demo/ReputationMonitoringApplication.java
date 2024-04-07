package com.fyp.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.fyp.demo")
public class ReputationMonitoringApplication {
	public static void main(String[] args) {
		SpringApplication.run(ReputationMonitoringApplication.class, args);
	}
}

