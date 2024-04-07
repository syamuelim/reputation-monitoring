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
@Table(name = "instagram_response")
public class InstagramResponse {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "instagram_id")
	private Integer instagramId;

	@Column(name = "response")
	private String response;	

    @Column(name = "created_at")
    private LocalDateTime createdAt;


	public InstagramResponse( Integer instagramId, String response) {
        this.instagramId = instagramId;
		this.response = response;
        this.createdAt = LocalDateTime.now();;
	}
}