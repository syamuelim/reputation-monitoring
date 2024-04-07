// package com.fyp.demo.controller;

// import java.io.IOException;
// import java.security.GeneralSecurityException;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.fyp.demo.model.entity.YoutubeChannel;
// import com.fyp.demo.model.entity.YoutubeResponse;
// import com.fyp.demo.model.entity.YoutubeVideo;
// import com.fyp.demo.model.entity.YouTubeAPI.YouTubeServiceState;
// import com.fyp.demo.model.entity.YouTubeAPI.YoutubeApiHelper;
// import com.fyp.demo.model.request.InstagramResponseCreateRequest;
// import com.fyp.demo.model.request.YoutubeAPIFilterRequest;
// import com.fyp.demo.repository.YoutubeChannelRepository;
// import com.fyp.demo.repository.YoutubeResponseRepository;
// import com.fyp.demo.repository.YoutubeVideoRepository;
// import com.google.api.services.youtube.model.ChannelListResponse;
// import com.google.api.services.youtube.model.CommentThreadListResponse;
// import com.google.api.services.youtube.model.SearchListResponse;
// import com.google.api.services.youtube.model.VideoListResponse;

// import io.swagger.v3.oas.annotations.Operation;
// import io.swagger.v3.oas.annotations.tags.Tag;

// @Tag(name = "Youtube Channel", description = "Youtube Channel")
// @RestController
// @RequestMapping("/api/youtube_channel/")
// public class YoutubeChannelController {

//     @Autowired
//     YoutubeChannelRepository YoutubeChannelRepository;
//     @Autowired
//     YoutubeVideoRepository YoutubeVideoRepository;
//     @Autowired
//     YoutubeResponseRepository _youtubeResponseRepository;
//     YouTubeServiceState youTubeServiceState;

//     public YoutubeChannelController() throws GeneralSecurityException,
//             IOException {
//         this.youTubeServiceState = YoutubeApiHelper.getService();
//     }

//     @Operation(summary = "Get All Youtube Channels")
//     @GetMapping("")
//     public ResponseEntity<List<YoutubeChannel>> getAllYoutubeChannels(@RequestParam(required = false) String name) {
//         try {
//             List<YoutubeChannel> youtubeChannels = new ArrayList<YoutubeChannel>();

//             if (name == null)
//                 YoutubeChannelRepository.findAll().forEach(youtubeChannels::add);
//             else
//                 YoutubeChannelRepository.findByChannelNameContaining(name).forEach(youtubeChannels::add);

//             if (youtubeChannels.isEmpty()) {
//                 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//             }

//             return new ResponseEntity<>(youtubeChannels, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @GetMapping("{id}")
//     public ResponseEntity<YoutubeChannel> getYoutubeChannelById(@PathVariable("id") Integer id) {
//         Optional<YoutubeChannel> youtubeChannels = YoutubeChannelRepository.findById(id);

//         if (youtubeChannels.isPresent()) {
//             return new ResponseEntity<>(youtubeChannels.get(), HttpStatus.OK);
//         } else {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }

//     @GetMapping("video/{id}")
//     public ResponseEntity<YoutubeVideo> getYoutubeVideoById(@PathVariable("id") Integer id) {
//         Optional<YoutubeVideo> videos = YoutubeVideoRepository.findById(id);

//         if (videos.isPresent()) {
//             return new ResponseEntity<>(videos.get(), HttpStatus.OK);
//         } else {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }

//     @GetMapping("/external/channel/Details")
//     public ResponseEntity<ChannelListResponse> queryYoutbeChannelDetails(
//             @RequestParam String keyword,
//             @RequestParam(required = false, defaultValue = "10") Long maxResult,
//             @RequestParam(required = false) String createdFrom,
//             @RequestParam(required = false) String createdTo) {
//         ChannelListResponse result;
//         YoutubeAPIFilterRequest request = new YoutubeAPIFilterRequest(keyword,
//                 maxResult, createdFrom, createdTo);
//         try {
//             result = YoutubeApiHelper.getChannelName(youTubeServiceState, request);
//             return new ResponseEntity<>(result, HttpStatus.OK);
//         } catch (GeneralSecurityException | IOException e) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }

//     @GetMapping("/external/channel")
//     public ResponseEntity<SearchListResponse> queryYoutbeChannel(
//             @RequestParam String keyword,
//             @RequestParam(required = false, defaultValue = "10") Long maxResult,
//             @RequestParam(required = false) String createdFrom,
//             @RequestParam(required = false) String createdTo) {
//         SearchListResponse result;
//         YoutubeAPIFilterRequest request = new YoutubeAPIFilterRequest(keyword,
//                 maxResult, createdFrom, createdTo);
//         try {
//             result = YoutubeApiHelper.searchChannel(youTubeServiceState, request);
//             return new ResponseEntity<>(result, HttpStatus.OK);
//         } catch (GeneralSecurityException | IOException e) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }

//     @GetMapping("/external/channel/videos")
//     public ResponseEntity<SearchListResponse> queryVideosByChannelId(

//             @RequestParam String keyword,
//             @RequestParam(required = false, defaultValue = "10") Long maxResult,
//             @RequestParam(required = false) String createdFrom,
//             @RequestParam(required = false) String createdTo) {
//         SearchListResponse result;
//         YoutubeAPIFilterRequest request = new YoutubeAPIFilterRequest(keyword,
//                 maxResult, createdFrom, createdTo);
//         try {
//             result = YoutubeApiHelper.searchVideoByChannelId(youTubeServiceState,
//                     request);
//             return new ResponseEntity<>(result, HttpStatus.OK);
//         } catch (GeneralSecurityException | IOException e) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }

//     @GetMapping("/external/channel/video/Id")
//     public ResponseEntity<VideoListResponse> queryVideosByVideoId(

//             @RequestParam String keyword,
//             @RequestParam(required = false, defaultValue = "10") Long maxResult,
//             @RequestParam(required = false) String createdFrom,
//             @RequestParam(required = false) String createdTo) {
//         VideoListResponse result;
//         YoutubeAPIFilterRequest request = new YoutubeAPIFilterRequest(keyword,
//                 maxResult, createdFrom, createdTo);
//         try {
//             result = YoutubeApiHelper.searchVideoByVideoId(youTubeServiceState, request);
//             return new ResponseEntity<>(result, HttpStatus.OK);
//         } catch (GeneralSecurityException | IOException e) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }

//     @GetMapping("/external/channel/comments")
//     public ResponseEntity<CommentThreadListResponse> queryComments(

//             @RequestParam String keyword,
//             @RequestParam Boolean IsByChannelId,
//             @RequestParam(required = false, defaultValue = "10") Long maxResult,
//             @RequestParam(required = false) String createdFrom,
//             @RequestParam(required = false) String createdTo) {
//         CommentThreadListResponse result;
//         YoutubeAPIFilterRequest request = new YoutubeAPIFilterRequest(keyword,
//                 maxResult, createdFrom, createdTo);
//         try {
//             result = YoutubeApiHelper.searchComment(youTubeServiceState, request,
//                     IsByChannelId);
//             return new ResponseEntity<>(result, HttpStatus.OK);
//         } catch (GeneralSecurityException | IOException e) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }

//     @PostMapping("create")
//     public ResponseEntity<YoutubeChannel> createYoutubeChannel(@RequestBody YoutubeChannel youtubeChannel) {
//         try {
//             YoutubeChannel _youtubeChannel = YoutubeChannelRepository
//                     .save(youtubeChannel);
//             return new ResponseEntity<>(_youtubeChannel, HttpStatus.CREATED);
//         } catch (Exception e) {
//             return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @PutMapping("{id}")
//     public ResponseEntity<YoutubeChannel> updateYoutubeChannel(@PathVariable("id") Integer id,
//             @RequestBody YoutubeChannel youtubeChannel) {

//         Optional<YoutubeChannel> youtubeChannels = YoutubeChannelRepository.findById(id);

//         if (youtubeChannels.isPresent()) {
//             YoutubeChannel _youtubeChannel = youtubeChannels.get();
//             _youtubeChannel.setChannelName(youtubeChannel.getChannelName());
//             return new ResponseEntity<>(YoutubeChannelRepository.save(_youtubeChannel),
//                     HttpStatus.OK);
//         } else {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//     }

//     @DeleteMapping("{id}")
//     public ResponseEntity<HttpStatus> deleteYoutubeChannel(@PathVariable("id") Integer id) {
//         try {
//             YoutubeChannelRepository.deleteById(id);
//             return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @PostMapping("{id}/response")
//     public ResponseEntity<YoutubeResponse> createResponse(@PathVariable("id") Integer id,
//             @RequestBody InstagramResponseCreateRequest response) {
//         try {
//             YoutubeResponse youtubeResponse = _youtubeResponseRepository.save(new YoutubeResponse(id, response.getJson()));
//             return new ResponseEntity<>(youtubeResponse, HttpStatus.CREATED);
//         } catch (Exception e) {
//             return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

// }