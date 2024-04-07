package com.fyp.demo.model.entity;

import jakarta.persistence.*; 
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "instagram")
public class InstagramUser {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "kol_id")
	private Integer kolId;

	@Column(name = "instagram_user_id")
	private String instagramUserId;

	@Column(name = "name")
	private String name;	
    
    @Column(name = "business_type")
	private String businessType; 

    @Column(name = "posts")
	private Integer posts;

    @Column(name = "followers")
	private Integer followers;



	public InstagramUser(Integer kolId, String instagramUserId, String name, String businessType, Integer posts, Integer followers) {
        this.kolId = kolId;
        this.instagramUserId = instagramUserId;
		this.name = name;
        this.businessType = businessType;
        this.posts = posts;
        this.followers = followers;
	}
}