package com.fyp.demo.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.system.Session;

public interface SessionRepository extends JpaRepository<Session, Integer> {
    Optional<Session> findByUserName(String userName);
}