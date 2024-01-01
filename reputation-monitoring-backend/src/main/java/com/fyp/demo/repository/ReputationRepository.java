package com.fyp.demo.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.Reputation;

public interface ReputationRepository extends JpaRepository<Reputation, Integer> {
  List<Reputation> findByKolId(Integer kolId);
  List<Reputation> findByKolIdAndReputationAtBetweenOrderByReputationAt(Integer kolId, LocalDateTime startDate, LocalDateTime endDate);
}