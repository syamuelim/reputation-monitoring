package com.fyp.demo.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReputationCreateRequest {
    public Integer kolId;
    public Integer youtubeChannelId;
    public Integer youtubeResponseId;
    public String date;
}
