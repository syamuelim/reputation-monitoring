import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

import * as WebBrowser from "expo-web-browser";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { useInfluencerContext } from "../../service/StateContext";
import * as reputationService from "../../service/ReputationService";
import * as youtubeService from "../../service/YoutubeService";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const ReputationToolbar = () => {
  const [openStatus, setOpenStatus] = React.useState(false);

  const { state, dispatch } = useInfluencerContext();

  useEffect(() => {}, []);

  const createEntity = async (result) => {
    const commentData = [];
    for (let i = 0; i < result.length; i++) {
      const createResponse = await youtubeService.youtubeResponseCreate(
        result[i].youtubeChannelId,
        {
          json: result[i].json,
        }
      );
      const res = await reputationService.createReputation({
        kolId: result[i].kolId,
        youtubeResponseId: createResponse.data.id,
      });
    }
    handleCloseStatus();
  };

  const handleGenerateReputation = async () => {
    handleClickOpenStatus();
    let result = [];
    for (let i = 0; i < state.influencers.length; i++) {
      let item = state.influencers[i];
      if (item.selected) {
        const response = await youtubeService.getExternalYoutbeChannelComments({
          keyword: item.youtubeChannel.channelId,
          IsByChannelId: true,
          maxResult: 1,
        });
        result.push({
          kolId: item.id,
          youtubeChannelId: item.youtubeChannel.id,
          json: JSON.stringify(response.data),
        });
      }
    }
    createEntity(result);
  };

  const handleClickOpenStatus = () => {
    setOpenStatus(true);
  };

  const handleCloseStatus = () => {
    setOpenStatus(false);
  };

  const startDateChange = (value) => {
    dispatch({
      type: "SET_START_DATE",
      payload: { startDate: value.toISOString() },
    });
  };
  const endDateChange = (value) => {
    dispatch({
      type: "SET_END_DATE",
      payload: { endDate: value.toISOString() },
    });
  };
  return (
    <SafeAreaView>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            minHeight: "40px",
            display: "flex",
            alignSelf: "center",
          }}
          border={"1px solid #c6c6c6"}
          borderRadius={"8px"}
        >
          <EmojiPeopleOutlinedIcon
            sx={{ alignSelf: "center", color: "#5AC8C5", marginLeft: "8px" }}
          ></EmojiPeopleOutlinedIcon>
          <Typography
            sx={{
              alignSelf: "center",
              marginLeft: "8px",
              fontWeight: "bold",
              width: "25%",
            }}
          >
            Influcener Data
          </Typography>

          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <Box
              sx={{
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                margin: "8px",
                maxWidth: "320px",
                padding: "0 4px 0 4px",
              }}
              border={"1px solid #c6c6c6"}
              borderRadius={"8px"}
            >
              <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon>
              <MobileDatePicker
                sx={{
                  height: "40px",
                  ".MuiInputBase-root": { height: "40px" },
                  ".MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
                onChange={startDateChange}
                defaultValue={dayjs()}
              />
              <ArrowRightAltIcon></ArrowRightAltIcon>
              <MobileDatePicker
                onChange={endDateChange}
                sx={{
                  height: "40px",
                  ".MuiInputBase-root": { height: "40px" },
                  ".MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
                defaultValue={dayjs()}
              />
            </Box>
          </LocalizationProvider>
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
              onClick={handleGenerateReputation}
            >
              <SearchIcon
                sx={{
                  alignSelf: "center",
                  color: "coreOrange",
                }}
              ></SearchIcon>
              Generate Reputation
            </Button>
          </Box>
        </Box>
        <Dialog open={openStatus} onClose={handleCloseStatus}>
          <DialogTitle
            sx={{
              backgroundColor: theme.palette.coreGreen.main,
              color: theme.palette.coreGreen.contrastText,
            }}
          >
            Generating
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: theme.palette.coreGreen.main,
            }}
          >
            <CircularProgress color="coreWhite" />
          </DialogContent>
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
    coreWhite: {
      main: "#fff",
      light: "#fff",
      dark: "#fff",
      contrastText: "#fff",
    },
  },
});

export default ReputationToolbar;
