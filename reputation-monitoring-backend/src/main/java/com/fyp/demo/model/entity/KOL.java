package com.fyp.demo.model.entity;

import jakarta.persistence.*; 
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "kol")
public class KOL {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "name")
	private String name;
	@Column(name = "other_name")
	private String otherName;

	@Column(name = "instagram_id")
	private int instagramId;

	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "youtube_id")
    private YoutubeChannel youtubeChannel;

	public KOL(String name, String otherName) {
		this.name = name;
		this.otherName = otherName;
	}
}