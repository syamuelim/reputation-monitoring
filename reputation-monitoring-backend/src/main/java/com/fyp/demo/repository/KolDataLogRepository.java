package com.fyp.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.KolDataLog;
import java.util.List;


public interface KolDataLogRepository extends JpaRepository<KolDataLog, Integer> {
    List<KolDataLog> findByKolId(Integer kolId);
}