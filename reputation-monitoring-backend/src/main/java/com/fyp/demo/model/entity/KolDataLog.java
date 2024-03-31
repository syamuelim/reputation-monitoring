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
@Table(name = "kol_data_log")
public class KolDataLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "kol_id")
    private Integer KolId;

    @Column(name = "youtube_follower_count")
    private Integer YoutubeFollowerCount;
    @Column(name = "youtube_video_published")
    private Integer YoutubeVideoPublished;

    @Column(name = "instagram_count")
    private Integer InstagramCount;
    @Column(name = "instagram_post_shared")
    private Integer InstagramPostShared;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}