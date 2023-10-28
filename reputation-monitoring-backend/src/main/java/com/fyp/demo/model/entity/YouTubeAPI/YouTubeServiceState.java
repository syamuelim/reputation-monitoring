package com.fyp.demo.model.entity.YouTubeAPI;


import com.google.api.services.youtube.YouTube;

public class YouTubeServiceState {
    public final YouTube youtubeService;
    public Boolean initialized = false;

    public YouTubeServiceState(YouTube youtubeService) {
        this.youtubeService = youtubeService;
        this.initialized = true;
    }
}
