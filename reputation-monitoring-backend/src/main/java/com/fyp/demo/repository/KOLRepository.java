package com.fyp.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.KOL;

public interface KOLRepository extends JpaRepository<KOL, Long> {
  List<KOL> findByNameContaining(String name);
}