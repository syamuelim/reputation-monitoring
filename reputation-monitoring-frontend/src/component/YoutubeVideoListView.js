import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { View, Text } from "react-native";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

import * as youtubeService from "../service/YoutubeService";

const YoutubeVideoListView = ({ youtubeChannelId }) => {
  const [youtubeComments, setYoutubeComments] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    loadYoutubeComments(youtubeChannelId);
  }, [youtubeChannelId]);

  let loadYoutubeComments = async (youtubeChannelId) => {
    // find reputation data
    const youtubeCommentsResponse =
      await youtubeService.getExternalYoutbeChannelComments({
        keyword: youtubeChannelId,
        IsByChannelId: true,
        maxResult: 10,
        // createdFrom: null,
        // createdTo: null
      });
    console.log(youtubeCommentsResponse.data.items);
    setYoutubeComments(youtubeCommentsResponse.data.items);
  };

  return (
    <SafeAreaView>
      <Box
        sx={{
          maxHeight: 738,
          height: 738,
          width: "100%",
          bgcolor: "background.paper",
          overflowY: "scroll",
          overflowX: "hidden",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
        border={"1px solid #c6c6c6"}
        borderRadius={"8px"}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              alignSelf: "center",
              fontWeight: "bold",
              position: "sticky",
              top: 0,
              background: "white",
              width: "100%",
              textAlign: "center",
            }}
          >
            Latest Comments
          </Typography>
          {youtubeComments.map((comment, index) => (
            <View key={index}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src={
                      comment.snippet.topLevelComment.snippet
                        .authorProfileImageUrl
                    }
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    comment.snippet.topLevelComment.snippet.authorDisplayName
                  }
                  secondary={
                    <Typography display="flex" sx={{flexDirection: "column"}}>
                      <Typography variant="caption" color="text.secondary">
                        {comment.snippet.topLevelComment.snippet.textDisplay}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >{`likes: ${comment.snippet.topLevelComment.snippet.likeCount}`}</Typography>
                    </Typography>
                  }
                ></ListItemText>
              </ListItem>
              <Divider variant="middle" component="li" />
            </View>
          ))}
        </Container>
      </Box>
    </SafeAreaView>
  );
};

export default YoutubeVideoListView;
