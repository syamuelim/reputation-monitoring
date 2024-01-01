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
@Table(name = "reputation")
public class Reputation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "kol_id")
	private Integer kolId;
	
    @Column(name = "rating")
	private double rating;

	@Column(name = "rating_attribute_id")
	private Double ratingAttributeId;

    @Column(name = "status")
    private String status;

    @Column(name ="created_at")
    private LocalDateTime createdAt;

	public Reputation(int kolId, double rating, double ratingAttributeId) {
		this.kolId =kolId;
        this.rating =rating;
		this.ratingAttributeId = ratingAttributeId;
        this.status =  "ACTIVE";
        this.createdAt = LocalDateTime.now();
	}
}