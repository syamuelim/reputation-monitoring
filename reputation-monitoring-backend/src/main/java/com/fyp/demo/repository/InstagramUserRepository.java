package com.fyp.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.InstagramUser;

public interface InstagramUserRepository extends JpaRepository<InstagramUser, Integer> {
  List<InstagramUser> findByNameContaining(String name);
}