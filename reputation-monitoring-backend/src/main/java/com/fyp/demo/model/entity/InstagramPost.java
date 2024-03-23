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
@Table(name = "instagram_post")
public class InstagramPost {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "post_id")
    private String postId;

    @Column(name = "media_url")
    private String mediaUrl;

    @Column(name = "comments_count")
    private Integer commentsCount;

    @Column(name = "event_id")
    private Integer eventId;

    @Column(name = "instagram_id")
    private Integer instagramId;

    @Column(name = "content")
    private String content;

    @Column(name = "likes")
    private Integer likes;

    @Column(name = "hashtag")
    private String hashtag;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public InstagramPost(String postId, String mediaUrl, Integer commentsCount, Integer eventId, Integer instagramId, String content, Integer likes, String hashtag, LocalDateTime createdAt) {
        this.postId = postId;
        this.mediaUrl = mediaUrl;
		this.commentsCount = commentsCount;
        this.eventId = eventId;
        this.instagramId = instagramId;
        this.content = content;
        this.likes = likes;
        this.hashtag = hashtag;
        this.createdAt = createdAt;
	}
}