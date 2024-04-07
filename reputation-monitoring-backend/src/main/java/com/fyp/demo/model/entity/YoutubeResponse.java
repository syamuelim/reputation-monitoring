package com.fyp.demo.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "youtube_channel_response")
public class YoutubeResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "youtube_channel_id")
    private Integer youtubeChannelId;

    @Column(name = "response")
    private String response;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public YoutubeResponse(Integer youtubeChannelId, String response) {
        this.youtubeChannelId = youtubeChannelId;
        this.response = response;
        this.createdAt = LocalDateTime.now();
        ;
    }
}