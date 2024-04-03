package com.fyp.demo.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fyp.demo.model.entity.KolDataLog;
import com.fyp.demo.repository.KolDataLogRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "audience", description = "Audience")
@RestController
@RequestMapping("/api/audience/")
public class KolDataLogController {
	@Autowired
	KolDataLogRepository _KolDataLogRepository;
	@Autowired
	KolDataLogRepository _youtubDataLogRepository;

	@GetMapping("{kolId}")
	public ResponseEntity<List<KolDataLog>> getAudienceDataById(@RequestParam Integer kolId) {
		try {
			List<KolDataLog> dataLogs = new ArrayList<KolDataLog>();
			_KolDataLogRepository.findByKolId(kolId).forEach(dataLogs::add);
			return new ResponseEntity<>(dataLogs, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
}