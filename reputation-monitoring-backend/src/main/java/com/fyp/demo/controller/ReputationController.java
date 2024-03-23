package com.fyp.demo.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fyp.demo.model.entity.Reputation;
import com.fyp.demo.repository.ReputationRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "reputation", description = "reputation")
@RestController
@RequestMapping("/api/reputation/")
public class ReputationController {

	@Autowired
	ReputationRepository reputationRepository;

	@GetMapping("{id}")
	public ResponseEntity<List<Reputation>> getById(
			@PathVariable("id") Integer id,
			@RequestParam(required = false) LocalDateTime startDate,
			@RequestParam(required = false) LocalDateTime endDate) {
		try {
			List<Reputation> reputations = new ArrayList<Reputation>();
			reputationRepository.findByKolIdAndReputationAtBetweenOrderByReputationAt(id, startDate, endDate).forEach(reputations::add);
			return new ResponseEntity<>(reputations, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
}