package com.fyp.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.InstagramResponse;

public interface InstagramResponseRepository extends JpaRepository<InstagramResponse, Integer> {
}