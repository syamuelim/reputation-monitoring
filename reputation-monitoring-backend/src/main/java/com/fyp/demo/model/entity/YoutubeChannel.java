package com.fyp.demo.model.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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
	private Integer kolId;

	@Column(name = "channel_id")
	private String channelId;

	@Column(name = "channel_name")
	private String channelName;

	@Column(name = "followers")
	private Integer followers;	

    @Column(name = "video_published")
	private Integer video_published;

	@Column(name = "icon_url")
	private String iconUrl;

	@OneToMany(mappedBy = "youtubeChannel", cascade = CascadeType.ALL)
	@JsonManagedReference
	@OrderBy("dislike DESC, likes ASC")
    private Set<YoutubeVideo> youtubeVideos = new HashSet<YoutubeVideo>();
}