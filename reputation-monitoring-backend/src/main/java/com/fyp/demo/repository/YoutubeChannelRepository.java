package com.fyp.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.demo.model.entity.YoutubeChannel;

public interface YoutubeChannelRepository extends JpaRepository<YoutubeChannel, Integer> {
  List<YoutubeChannel> findByChannelNameContaining(String channelName);
  YoutubeChannel findByKolId(Integer kolId);
}

