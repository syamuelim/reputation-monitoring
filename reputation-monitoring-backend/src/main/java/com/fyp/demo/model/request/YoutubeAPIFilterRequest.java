package com.fyp.demo.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class YoutubeAPIFilterRequest {
  public String keyword;
  public Long maxResult;
  public String createdFrom;
  public String createdTo;

  public YoutubeAPIFilterRequest(String keyword, Long maxResult, String createdFrom, String createdTo) {
    this.keyword = keyword;
    this.maxResult = maxResult;
    this.createdFrom = createdFrom;
    this.createdTo = createdTo;
  }
  public YoutubeAPIFilterRequest(String keyword) {
    this.keyword = keyword;
  }
}
