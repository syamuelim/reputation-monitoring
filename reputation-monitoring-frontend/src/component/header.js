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

import { facebookPermission } from "../Config/Menu";

import { useInfluencerContext } from "../service/StateContext";
import * as influcenerService from "../service/Influcener";

const Header = () => {
  useEffect(() => {
    getInfluencers();
  }, []);
  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        console.log(response);
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,birthday,picture.type(large)&access_token=${response.authentication.accessToken}`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
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

  // login to facebook if havnt
  useEffect(() => {
    handleLogin();
  }, [form]);

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
  const { state, dispatch } = useInfluencerContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (chipToDelete) => () => {
    dispatch({
      type: "SELECT_INFLUENCER",
      payload: {
        id: chipToDelete.id,
      },
    });
  };

  let loadData = async () => {
    if (response) {
      const res = await facebookService.getPageId(
        response.authentication.accessToken
      );
      setPageId(res.data.data[0].id);
    }
  };

  let loadIgUserId = async () => {
    if (response && pageId) {
      const res = await facebookService.getInstagramUserId(
        pageId,
        response.authentication.accessToken
      );
      setIgUserId(res.data.instagram_business_account.id);
    }
  };

  let loadBusinessAccount = async () => {
    if (igUserId && response && form.instagramUserName) {
      const res = await facebookService.getBusinessAccount(
        igUserId,
        form.instagramUserName,
        response.authentication.accessToken
      );

      // download
      const a = document.createElement("a");
      a.href = URL.createObjectURL(
        new Blob([JSON.stringify(res.data)], { type: `application/json` })
      );
      a.download = form.instagramUserName + ".json";
      a.click();
    }
  };

  const handleLogin = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      return;
    }
  };

  const getInfluencers = async () => {
    const response = await influcenerService.getInfluencers();
    dispatch({
      type: "SET_INFLUENCER",
      payload: response.data,
    });
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
