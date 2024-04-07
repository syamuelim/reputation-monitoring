package com.fyp.demo.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KOLAudienceUpdateRequest {
    public Integer instagramFollowerCount;
    public Integer instagramPostCount;

    public Integer youTubeFollowerCount;
    public Integer youTubeVideoCount;
}
