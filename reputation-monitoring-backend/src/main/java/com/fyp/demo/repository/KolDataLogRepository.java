package com.fyp.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.KolDataLog;

public interface KolDataLogRepository extends JpaRepository<KolDataLog, Integer> {

}