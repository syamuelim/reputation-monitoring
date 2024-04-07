package com.fyp.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.YoutubeResponse;

public interface YoutubeResponseRepository extends JpaRepository<YoutubeResponse, Integer> {
}
