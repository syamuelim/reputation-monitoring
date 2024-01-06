package com.fyp.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.YoutubeVideo;

public interface YoutubeVideoRepository extends JpaRepository<YoutubeVideo, Integer> {
}

