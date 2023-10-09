package com.fyp.demo.model.entity;

import jakarta.persistence.*; 
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "youtube_channel")
public class YoutubeChannel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "kol_id")
	private int kolId;

	@Column(name = "channel_id")
	private String channelId;

	@Column(name = "channel_name")
	private String channelName;

	@Column(name = "followers")
	private int followers;	

    @Column(name = "video_published")
	private int video_published;
}