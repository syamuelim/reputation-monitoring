package com.fyp.demo.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.InstagramPost;

public interface InstagramPostRepository extends JpaRepository<InstagramPost, Integer> {
    List<InstagramPost> findByInstagramIdOrderByCreatedAtDesc(Integer instagramId, Pageable pageable);
    Long countByInstagramId(Integer instagramId);
}