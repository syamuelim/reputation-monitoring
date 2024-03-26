package com.fyp.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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

import com.fyp.demo.model.entity.InstagramPost;
import com.fyp.demo.model.entity.InstagramResponse;
import com.fyp.demo.model.entity.InstagramUser;
import com.fyp.demo.repository.InstagramPostRepository;
import com.fyp.demo.repository.InstagramResponseRepository;
import com.fyp.demo.repository.InstagramUserRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Instagram", description = "Instagram")
@RestController
@RequestMapping("/api/instagram/")
public class InstagramController {

    @Autowired
    InstagramUserRepository InstagramUserRepository;
    @Autowired
    InstagramPostRepository InstagramPostRepository;
    @Autowired
    InstagramResponseRepository InstagramResponseRepository;

    @Operation(summary = "Get Instagram User")
    @GetMapping("")
    public ResponseEntity<List<InstagramUser>> getInstagramUsers(@RequestParam(required = false) String name) {
        try {
            List<InstagramUser> instagramUsers = new ArrayList<InstagramUser>();

            if (name == null)
                InstagramUserRepository.findAll().forEach(instagramUsers::add);
            else
                InstagramUserRepository.findByNameContaining(name).forEach(instagramUsers::add);

            if (instagramUsers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(instagramUsers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get Instagram Post By Instagram user id")
    @GetMapping("post/{instagramId}")
    public ResponseEntity<List<InstagramPost>> getInstagramPostsByInstagramUserId(
            @PathVariable("instagramId") Integer instagramId,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "3") int itemPerPage) {

        try {
            Pageable pageable = PageRequest.of(page, itemPerPage);

            List<InstagramPost> instagramPosts = new ArrayList<InstagramPost>();
            InstagramPostRepository.findByInstagramIdOrderByCreatedAtDesc(instagramId, pageable)
                    .forEach(instagramPosts::add);
            return new ResponseEntity<>(instagramPosts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Get Instagram Post By Instagram user id")
    @GetMapping("post/{instagramId}/Count")
    public ResponseEntity<Long> getInstagramPostsByInstagramUserIdCount(
            @PathVariable("instagramId") Integer instagramId,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "3") int itemPerPage) {

        try {
            Pageable pageable = PageRequest.of(page, itemPerPage);

            List<InstagramPost> instagramPosts = new ArrayList<InstagramPost>();
            Long count = InstagramPostRepository.countByInstagramId(instagramId);
            return new ResponseEntity<>(count, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<InstagramUser> getKOLById(@PathVariable("id") Integer id) {
        Optional<InstagramUser> instagramUsers = InstagramUserRepository.findById(id);

        if (instagramUsers.isPresent()) {
            return new ResponseEntity<>(instagramUsers.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("create")
    public ResponseEntity<InstagramUser> createKOL(@RequestBody InstagramUser instagramUser) {
        try {
            InstagramUser _instagramUser = InstagramUserRepository
                    .save(new InstagramUser(
                            instagramUser.getKolId(),
                            instagramUser.getInstagramUserId(),
                            instagramUser.getName(),
                            instagramUser.getBusinessType(),
                            instagramUser.getPosts(),
                            instagramUser.getFollowers()));
            return new ResponseEntity<>(_instagramUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<InstagramUser> updateKOL(@PathVariable("id") Integer id,
            @RequestBody InstagramUser instagramUser) {

        Optional<InstagramUser> instagramUsers = InstagramUserRepository.findById(id);

        if (instagramUsers.isPresent()) {
            InstagramUser _instagramUser = instagramUsers.get();
            _instagramUser.setName(instagramUser.getName());
            return new ResponseEntity<>(InstagramUserRepository.save(_instagramUser), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteKOL(@PathVariable("id") Integer id) {
        try {
            InstagramUserRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("{id}/response")
    public ResponseEntity<HttpStatus> createResponse(@PathVariable("id") Integer id, @RequestBody String response) {
        try {
            InstagramResponse _instagramResponse = InstagramResponseRepository
                    .save(new InstagramResponse(id, response));
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("{id}/posts")
    public ResponseEntity<HttpStatus> createPost(@PathVariable("id") Integer id, @RequestBody ArrayList<InstagramPost> posts) {
        try {
            for (InstagramPost post : posts) {
                InstagramPostRepository.save(post);
            }
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}