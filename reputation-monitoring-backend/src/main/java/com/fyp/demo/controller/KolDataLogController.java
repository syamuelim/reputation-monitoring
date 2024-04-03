package com.fyp.demo.controller;

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

import com.fyp.demo.model.entity.system.Watching;
import com.fyp.demo.repository.KolDataLogRepository;
import com.fyp.demo.repository.WatchingRepository;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;

@Tag(name = "audience", description = "Audience")
@RestController
@RequestMapping("/api/audience/")
public class KolDataLogController {

	@Autowired
	KolDataLogRepository watchingRepository;

	@GetMapping("")
	public ResponseEntity<List<Watching>> getAllKOLs() {
		try {
			List<Watching> watchLists = new ArrayList<Watching>();
			watchingRepository.findBySessionId((Integer) httpSession.getAttribute("session_id")).forEach(watchLists::add);
			if (watchLists.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(watchLists, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("create")
	public ResponseEntity<Watching> createWatchList(@RequestParam Integer kolId) {
		try {
			Watching _watching = watchingRepository.save(new Watching((Integer) httpSession.getAttribute("session_id"), kolId));
			return new ResponseEntity<>(_watching, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}