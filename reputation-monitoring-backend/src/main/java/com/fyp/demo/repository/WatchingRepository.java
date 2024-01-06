package com.fyp.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.system.Watching;

public interface WatchingRepository extends JpaRepository<Watching, Integer> {
      List<Watching> findBySessionId(Integer sessionId);
}