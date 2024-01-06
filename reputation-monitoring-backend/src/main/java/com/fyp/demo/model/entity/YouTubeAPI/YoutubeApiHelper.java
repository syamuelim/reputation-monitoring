package com.fyp.demo.model.entity.YouTubeAPI;

/**
 * Sample Java code for youtube.channels.list
 * See instructions for running these code samples locally:
 * https://developers.google.com/explorer-help/code-samples#java
 */

import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.ChannelListResponse;
import com.google.api.services.youtube.model.CommentThreadListResponse;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.VideoListResponse;
import com.fyp.demo.model.request.YoutubeAPIFilterRequest;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

public class YoutubeApiHelper {
        private static final String CLIENT_SECRETS = "client_secret.json";
        private static final Collection<String> SCOPES = Arrays
                        .asList("https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/youtube.force-ssl");

        private static final String APPLICATION_NAME = "ReputationMonitoring";
        private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

        /**
         * Create an authorized Credential object.
         *
         * @return an authorized Credential object.
         * @throws IOException
         */
        public static Credential authorize(final NetHttpTransport httpTransport) throws IOException {
                // Load client secrets.
                InputStream in = YoutubeApiHelper.class.getResourceAsStream(CLIENT_SECRETS);
                GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
                // Build flow and trigger user authorization request.
                GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(httpTransport, JSON_FACTORY,
                                clientSecrets, SCOPES)
                                .build();
                Credential credential = new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver())
                                .authorize("user");
                return credential;
        }

        /**
         * Build and return an authorized API client service.
         *
         * @return an authorized API client service
         * @throws GeneralSecurityException, IOException
         */
        @Autowired
        public static YouTubeServiceState getService() throws GeneralSecurityException, IOException {
                final NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
                Credential credential = authorize(httpTransport);
                YouTubeServiceState youTubeServiceState = new YouTubeServiceState(
                                new YouTube.Builder(httpTransport, JSON_FACTORY, credential)
                                                .setApplicationName(APPLICATION_NAME)
                                                .build());
                return youTubeServiceState;
        }

        /**
         * Call function to create API service object. Define and
         * execute API request. Print API response.
         *
         * @throws GeneralSecurityException, IOException, GoogleJsonResponseException
         */
        public static ChannelListResponse getChannelName(YouTubeServiceState youTubeServiceState,
                        YoutubeAPIFilterRequest filterRequest)
                        throws GeneralSecurityException, IOException, GoogleJsonResponseException {
                if (youTubeServiceState.initialized == false) {
                        youTubeServiceState = getService();
                }

                // Define and execute the API request
                List<String> partParams = Arrays.asList("snippet", "contentOwnerDetails", "statistics",
                                "contentDetails");
                YouTube.Channels.List request = youTubeServiceState.youtubeService.channels()
                                .list(partParams);
                ChannelListResponse response = request.setId(Arrays.asList(filterRequest.keyword)).execute();

                return response;
        }

        public static SearchListResponse searchChannel(YouTubeServiceState youTubeServiceState,
                        YoutubeAPIFilterRequest filterRequest)
                        throws GeneralSecurityException, IOException, GoogleJsonResponseException {
                if (youTubeServiceState.initialized == false) {
                        youTubeServiceState = getService();
                }
                // Define and execute the API request
                YouTube.Search.List request = youTubeServiceState.youtubeService.search()
                                .list(Arrays.asList("snippet"));
                SearchListResponse response = request.setChannelType("any")
                                .setMaxResults(filterRequest.maxResult)
                                .setOrder("relevance")
                                .setQ(filterRequest.keyword)
                                .setType(Arrays.asList("channel"))
                                .execute();
                return response;
        }

        public static SearchListResponse searchVideoByChannelId(YouTubeServiceState youTubeServiceState,
                        YoutubeAPIFilterRequest filterRequest)
                        throws GeneralSecurityException, IOException, GoogleJsonResponseException {
                if (youTubeServiceState.initialized == false) {
                        youTubeServiceState = getService();
                }
                // Define and execute the API request
                YouTube.Search.List request = youTubeServiceState.youtubeService.search()
                                .list(Arrays.asList("snippet"));
                SearchListResponse response = request.setChannelId(filterRequest.keyword)
                                .setMaxResults(filterRequest.maxResult)
                                .setOrder("date")
                                .setPublishedAfter(filterRequest.createdFrom)
                                .setPublishedBefore(filterRequest.createdTo)
                                .execute();
                return response;
        }

        public static VideoListResponse searchVideoByVideoId(YouTubeServiceState youTubeServiceState,
                        YoutubeAPIFilterRequest filterRequest)
                        throws GeneralSecurityException, IOException, GoogleJsonResponseException {
                if (youTubeServiceState.initialized == false) {
                        youTubeServiceState = getService();
                }
                // Define and execute the API request
                YouTube.Videos.List request = youTubeServiceState.youtubeService.videos()
                                .list(Arrays.asList("topicDetails", "snippet", "statistics"));
                VideoListResponse response = request.setId(Arrays.asList(filterRequest.keyword)).execute();
                return response;
        }

        public static CommentThreadListResponse searchComment(YouTubeServiceState youTubeServiceState, YoutubeAPIFilterRequest filterRequest, Boolean IsByChannel) 
        throws GeneralSecurityException, IOException, GoogleJsonResponseException
        {        
                if (youTubeServiceState.initialized == false) {
                        youTubeServiceState = getService();
                } 

                // Define and execute the API request
                if (IsByChannel == true) {
                        // must be order by time (default)
                        YouTube.CommentThreads.List request = youTubeServiceState.youtubeService.commentThreads()
                                .list(Arrays.asList("snippet,replies"));
                        CommentThreadListResponse response = request.setAllThreadsRelatedToChannelId(filterRequest.keyword)
                                .setMaxResults(filterRequest.maxResult)
                                .setOrder("time")
                                .execute();
                        return response;
                } else {
                        YouTube.CommentThreads.List request = youTubeServiceState.youtubeService.commentThreads()
                                .list(Arrays.asList("snippet","replies"));

                        CommentThreadListResponse response = request.setMaxResults(filterRequest.maxResult)
                                .setOrder("relevance")
                                .setMaxResults(filterRequest.maxResult)
                                .setVideoId(filterRequest.keyword)
                                .execute();
                        return response;
                }
        }
}