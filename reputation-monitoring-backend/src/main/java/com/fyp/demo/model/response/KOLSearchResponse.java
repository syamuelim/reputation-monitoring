package com.fyp.demo.model.response;

import java.util.Optional;

import com.fyp.demo.model.entity.InstagramUser;
import com.fyp.demo.model.entity.YoutubeChannel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KOLSearchResponse {
    public int id;

    public String name;
    public String otherName;

    public Integer instagramId;
    public Integer youtubeId;

    public YoutubeChannel youtubeChannel;
    public Optional<InstagramUser> instagramUser;

}
