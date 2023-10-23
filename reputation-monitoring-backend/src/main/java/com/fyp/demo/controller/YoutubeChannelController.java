package com.fyp.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.fyp.demo.config.Views;
import com.fyp.demo.model.entity.YoutubeChannel;
import com.fyp.demo.model.entity.YoutubeVideo;
import com.fyp.demo.repository.YoutubeChannelRepository;
import com.fyp.demo.repository.YoutubeVideoRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Youtube Channel", description = "Youtube Channel")
@RestController	
@RequestMapping("/api/youtube_channel/")
public class YoutubeChannelController {

	@Autowired
	YoutubeChannelRepository YoutubeChannelRepository;
	@Autowired
	YoutubeVideoRepository YoutubeVideoRepository;
	@Operation(
      summary = "Get All Youtube Channels")
	@GetMapping("")
	public ResponseEntity<List<YoutubeChannel>> getAllYoutubeChannels(@RequestParam(required = false) String name) {
		try {
			List<YoutubeChannel> youtubeChannels = new ArrayList<YoutubeChannel>();

			if (name == null)
				YoutubeChannelRepository.findAll().forEach(youtubeChannels::add);
			else
				YoutubeChannelRepository.findByChannelNameContaining(name).forEach(youtubeChannels::add);

			if (youtubeChannels.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(youtubeChannels, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("{id}")
	public ResponseEntity<YoutubeChannel> getYoutubeChannelById(@PathVariable("id") long id) {
		Optional<YoutubeChannel> youtubeChannels = YoutubeChannelRepository.findById(id);

		if (youtubeChannels.isPresent()) {
			return new ResponseEntity<>(youtubeChannels.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("video/{id}")
	public ResponseEntity<YoutubeVideo> getYoutubeVideoById(@PathVariable("id") long id) {
		Optional<YoutubeVideo> videos = YoutubeVideoRepository.findById(id);

		if (videos.isPresent()) {
			return new ResponseEntity<>(videos.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("create")
	public ResponseEntity<YoutubeChannel> createYoutubeChannel(@RequestBody YoutubeChannel youtubeChannel) {
		try {
			YoutubeChannel _youtubeChannel = YoutubeChannelRepository
					.save(youtubeChannel);
			return new ResponseEntity<>(_youtubeChannel, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("{id}")
	public ResponseEntity<YoutubeChannel> updateYoutubeChannel(@PathVariable("id") long id, @RequestBody YoutubeChannel youtubeChannel) {

		Optional<YoutubeChannel> youtubeChannels = YoutubeChannelRepository.findById(id);

		if (youtubeChannels.isPresent()) {
			YoutubeChannel _youtubeChannel = youtubeChannels.get();
			_youtubeChannel.setChannelName(youtubeChannel.getChannelName());
			return new ResponseEntity<>(YoutubeChannelRepository.save(_youtubeChannel), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteYoutubeChannel(@PathVariable("id") long id) {
		try {
			YoutubeChannelRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}