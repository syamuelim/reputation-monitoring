package com.fyp.demo.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fyp.demo.model.entity.Reputation;
import com.fyp.demo.model.request.ReputationCreateRequest;
import com.fyp.demo.repository.ReputationRepository;

import org.springframework.web.bind.annotation.RequestBody;
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
			reputationRepository.findByKolIdAndReputationAtBetweenOrderByReputationAt(id, startDate, endDate)
					.forEach(reputations::add);
			return new ResponseEntity<>(reputations, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("")
	public ResponseEntity<String> createReputation(
			@RequestBody ReputationCreateRequest request) {
		try {
			// Create an instance of RestTemplate
			RestTemplate restTemplate = new RestTemplate();

			// Set the request URL
			String url = "http://localhost:8000/reputation/category";
			
			// Create headers with the desired content type
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
	
			// Create an HttpEntity with the data and headers
			HttpEntity<ReputationCreateRequest> requestEntity = new HttpEntity<>(request, headers);
	
			// Send the POST request
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
	
			// Retrieve the response body
			String responseBody = response.getBody();
			return new ResponseEntity<>(responseBody, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}