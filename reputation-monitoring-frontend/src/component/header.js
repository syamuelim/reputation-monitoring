import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import * as facebookService from "../service/FacebookService";
import * as instagramService from "../service/InstagramService";

import { facebookPermission } from "../Config/Menu";

import { useInfluencerContext } from "../service/StateContext";
import * as influcenerService from "../service/Influcener";
import * as youtubeService from "../service/YoutubeService";

const Header = () => {
  WebBrowser.maybeCompleteAuthSession();
  const [user, setUser] = useState(null);
  const [pageId, setPageId] = useState(null);
  const [igUserId, setIgUserId] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "652157000425074",
    scopes: facebookPermission,
    configId: "3654644834792585",
  });
  const [form, setForm] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [openStatus, setopenStatus] = React.useState(false);
  const [loadingStatusText, setLoadingStatusText] = React.useState("");

  const [youtubeList, setYoutubeList] = React.useState([]);
  // temp data only
  const [selectedYoutubeChannel, setSelectedYoutubeChannel] = React.useState(
    {}
  );
  // detailed data from API call
  const [confirmedYoutubeChannel, setConfirmedYoutubeChannel] =
    React.useState(null);
  const [youtubeSelectDialog, setYoutubeSelectDialog] = React.useState(false);
  const { state, dispatch } = useInfluencerContext();

  useEffect(() => {
    getInfluencers();
  }, []);
  useEffect(() => {
    loadUser();
  }, [response]);

  useEffect(() => {
    loadData();
  }, [user]);

  useEffect(() => {
    loadIgUserId();
  }, [pageId]);

  useEffect(() => {
    loadBusinessAccount();
  }, [igUserId]);

  useEffect(() => {
    setYoutubeSelectDialog(true);
  }, [youtubeList]);

  // login to facebook if havnt
  useEffect(() => {
    searchYoutubeChannel();
  }, [form]);

  // finish all youtube fetching
  useEffect(() => {
    if (confirmedYoutubeChannel) {
      console.log({
        channelId: confirmedYoutubeChannel.id,
        channelName: confirmedYoutubeChannel.snippet.title,
        followers: confirmedYoutubeChannel.statistics.subscriberCount,
        video_published: confirmedYoutubeChannel.statistics.videoCount,
      });
    }
  }, [confirmedYoutubeChannel]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenStatus = () => {
    setopenStatus(true);
  };

  const handleCloseStatus = () => {
    setOpenStatus(false);
  };

  const handleLoadingStatusText = (text) => {
    setLoadingStatusText(text);
  };

  const handleDelete = (chipToDelete) => () => {
    dispatch({
      type: "SELECT_INFLUENCER",
      payload: {
        id: chipToDelete.id,
      },
    });
  };

  const loadUser = async () => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        console.log("loadUser");
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,birthday,picture.type(large)&access_token=${response.authentication.accessToken}`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  };
  let loadData = async () => {
    if (response) {
      console.log("loadData");
      if (pageId) {
        loadIgUserId();
      } else {
        const res = await facebookService.getPageId(
          response.authentication.accessToken
        );
        setPageId(res.data.data[0].id);
      }
    }
  };

  let loadIgUserId = async () => {
    console.log(response, pageId);
    if (response && pageId) {
      console.log("enter");
      if (igUserId) {
        loadBusinessAccount();
      } else {
        const res = await facebookService.getInstagramUserId(
          pageId,
          response.authentication.accessToken
        );
        setIgUserId(res.data.instagram_business_account.id);
      }
    }
  };

  const createEntity = async (instagramData) => {
    // create kol
    const kolCreateResponse = await influcenerService.postInfluencers({
      name: form.instagramUserName,
      otherName: form.instagramUserName,
    });

    // create instagram
    const instagramCreateResponse =
      await instagramService.createInstagramEntity({
        kolId: kolCreateResponse.data.id,
        instagramUserId: instagramData.business_discovery.id,
        name: form.instagramUserName,
        posts: instagramData.business_discovery.media_count,
        followers: instagramData.business_discovery.followers_count,
      });

    // create youtube
    const youtubeCreateResponse = await youtubeService.postYoutubeChannel({
      kolId: kolCreateResponse.data.id,
      channelId: confirmedYoutubeChannel.id,
      channelName: confirmedYoutubeChannel.snippet.title,
      followers: confirmedYoutubeChannel.statistics.subscriberCount,
      video_published: confirmedYoutubeChannel.statistics.videoCount,
    });

    // update kol's youtube id and instagram id
    const kolUpdateResponse = await influcenerService.updateInfluencer(
      kolCreateResponse.data.id,
      {
        ...kolCreateResponse.data,
        youtubeChannel: youtubeCreateResponse.data,
        instagramId: instagramCreateResponse.data.id,
      }
    );

    // save kol instagram data for the AI
    const createResponse = await instagramService.createInstagramPostsResponse(
      instagramCreateResponse.data.id,
      {
        json: JSON.stringify(instagramData),
      }
    );

    let postList = [];
    // save kol posts data to the backend
    instagramData.business_discovery.media.data.forEach((post) => {
      const tempPost = {
        postId: post.id,
        mediaUrl: post.media_url,
        commentsCount: post.comments_count,
        instagramId: instagramCreateResponse.data.id,
        content: post.caption,
        likes: post.like_count,
        createdAt: post.timestamp.split("+")[0],
      };
      postList.push(tempPost);
    });

    const createInstagramPostsResponse =
      await instagramService.createInstagramPost(
        instagramCreateResponse.data.id,
        postList
      );
  };

  let loadBusinessAccount = async () => {
    if (igUserId && response && form.instagramUserName) {
      const res = await facebookService.getBusinessAccount(
        igUserId,
        form.instagramUserName,
        response.authentication.accessToken
      );

      // save response
      console.log("b4 down");
      createEntity(res.data, null);
    }
  };

  const handleLogin = async () => {
    if (response) {
      loadUser();
    } else {
      const result = await promptAsync();
      if (result.type !== "success") {
        return;
      }
    }
  };

  const getInfluencers = async () => {
    const response = await influcenerService.getInfluencers();
    dispatch({
      type: "SET_INFLUENCER",
      payload: response.data,
    });
  };

  const searchYoutubeChannel = async () => {
    if (form.youtubeChannelName) {
      const response = await youtubeService.getExternalYoutbeChannels({
        keyword: form.youtubeChannelName,
      });
      console.log(response.data.items);
      setYoutubeList(response.data.items);
    }
  };

  const youtubeSelectDialogOnclick = (item) => {
    setSelectedYoutubeChannel(item);
  };

  // finished youtube, then load the instagram
  const youtubeSelectDialogConfirm = async () => {
    let item = youtubeList[0].snippet;
    const res = await youtubeService.getExternalYoutbeChannelDetails({
      keyword: item.channelId,
    });
    console.log(res.data);
    setConfirmedYoutubeChannel(res.data.items[0]);
  };

  return (
    <SafeAreaView>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100%",
            bgcolor: "white",
            minHeight: "40px",
            display: "flex",
            alignSelf: "center",
            marginTop: "8px",
          }}
          border={"1px solid #c6c6c6"}
          borderRadius={"8px"}
        >
          <ScreenSearchDesktopIcon
            sx={{ alignSelf: "center", color: "#5AC8C5", marginLeft: "8px" }}
          ></ScreenSearchDesktopIcon>
          <Typography
            sx={{
              alignSelf: "center",
              marginLeft: "8px",
              fontWeight: "bold",
              width: "25%",
            }}
          >
            Reputation Monitoring
          </Typography>
          <Box
            sx={{
              bgcolor: "white",
              display: "flex",
              alignSelf: "center",
              justifySelf: "center",
              justifyContent: "center",
            }}
          >
            {state.influencers.map((data) => {
              return (
                <Box key={data.id} sx={{ marginRight: "4px" }}>
                  <Chip
                    label={data.name}
                    onClick={handleDelete(data)}
                    variant={data.selected == true ? "filled" : "outlined"}
                    color="coreGreen"
                    clickable={true}
                  />
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              bgcolor: "white",
              display: "flex",
              alignSelf: "center",
              justifyContent: "end",
              justifySelf: "end",
              marginLeft: "auto",
              marginRight: "8px",
            }}
          >
            <Button
              color="coreOrange"
              variant="contained"
              size="small"
              sx={{ borderRadius: "16px" }}
              onClick={handleClickOpen}
            >
              <AddIcon
                sx={{
                  alignSelf: "center",
                  color: "coreOrange",
                }}
              ></AddIcon>
              Add new
            </Button>
          </Box>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              setForm(formJson);
            },
          }}
        >
          <DialogTitle>Add new influencer to the watch list</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the Instagram username
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="instagramUserName"
              name="instagramUserName"
              placeholder="Instagram Username"
              type="text"
              fullWidth
              variant="outlined"
            />
            <DialogContentText>
              Please enter the YouTube Channel Name
            </DialogContentText>
            <TextField
              required
              margin="dense"
              id="youtubeChannelName"
              name="youtubeChannelName"
              placeholder="Youtube Channel Name"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="coreOrange"
              variant="outlined"
              size="small"
              onClick={handleClose}
              sx={{ borderRadius: "16px" }}
            >
              Cancel
            </Button>
            <Button
              color="coreOrange"
              variant="contained"
              size="small"
              type="submit"
              sx={{ borderRadius: "16px" }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openStatus} onClose={handleCloseStatus}>
          <DialogTitle>{loadingStatusText}</DialogTitle>
          <DialogContent></DialogContent>
        </Dialog>
      </ThemeProvider>
    </SafeAreaView>
  );
};

const theme = createTheme({
  palette: {
    coreGreen: {
      main: "#5AC8C5",
      light: "#5AC8C5",
      dark: "#5AC8C5",
      contrastText: "#fff",
    },
    coreOrange: {
      main: "#c8c55a",
      light: "#c8c55a",
      dark: "#c8c55a",
      contrastText: "#fff",
    },
  },
});

export default Header;
