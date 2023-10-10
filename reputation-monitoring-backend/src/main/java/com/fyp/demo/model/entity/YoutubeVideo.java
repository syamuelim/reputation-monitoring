package com.fyp.demo.model.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.fyp.demo.config.Views;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "youtube_video")
public class YoutubeVideo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    @JsonBackReference
    @JsonView(Views.Public.class)
    YoutubeChannel youtubeChannel;

	@Column(name = "event_id")
	private Integer eventId;

	@Column(name = "video_name")
	private String videoName;	

    @Column(name = "likes")
	private Integer likes;

    @Column(name = "dislike")
	private Integer dislike;

    @Column(name = "views")
	private Integer views;

    @Column(name = "created_at")
	private LocalDateTime created_at;
}