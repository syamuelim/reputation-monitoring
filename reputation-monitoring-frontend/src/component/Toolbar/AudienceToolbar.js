import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import Button from "@mui/material/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import * as facebookService from "../../service/FacebookService";
import * as instagramService from "../../service/InstagramService";

import { facebookPermission } from "../../Config/Menu";

import { useInfluencerContext } from "../../service/StateContext";
import * as influcenerService from "../../service/Influcener";
import * as youtubeService from "../../service/YoutubeService";

const AudienceToolbar = () => {
    WebBrowser.maybeCompleteAuthSession();
    const [user, setUser] = useState(null);
    const [pageId, setPageId] = useState(null);
    const [igUserId, setIgUserId] = useState(null);
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: "652157000425074",
        scopes: facebookPermission,
        configId: "3654644834792585",
    });

    const [result, setResult] = React.useState([]);
    const [openStatus, setOpenStatus] = React.useState(false);

    const { state, dispatch } = useInfluencerContext();

    useEffect(() => {
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


    const loadUser = async () => {
        if (response && response.type === "success" && response.authentication) {
            (async () => {
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
        if (response && pageId) {
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

    const createEntity = async (result) => {
        for (let i = 0; i < result.length; i++) {
            const res = await influcenerService.updateAudience(result[i].kolId, result[i])

        }
        setResult([]);
        handleCloseStatus()
    }

    let loadBusinessAccount = async () => {
        if (igUserId && response) {

            for (let i = 0; i < state.influencers.length; i++) {
                let item = state.influencers[i]

                if (item.selected) {
                    const res = await facebookService.getBusinessAccount(
                        igUserId,
                        item.instagramUser.name,
                        response.authentication.accessToken
                    );
                    result[i].instagramFollowerCount = res.data.business_discovery.media_count
                    result[i].instagramPostCount = res.data.business_discovery.followers_count
                }
            }

            // save response
            createEntity(result);
        }
    };

    const handleGetLatestData = async () => {
        handleClickOpenStatus()
        let result = []
        for (let i = 0; i < state.influencers.length; i++) {
            let item = state.influencers[i]
            if (item.selected) {
                const response = await youtubeService.getExternalYoutbeChannelDetails({
                    keyword: item.youtubeChannel.channelId,
                    maxResult: 1
                });
                result.push({
                    kolId: item.id,
                    instagramFollowerCount: null,
                    instagramPostCount: null,
                    youTubeFollowerCount: response.data.items[0].statistics.subscriberCount,
                    youTubeVideoCount: response.data.items[0].statistics.videoCount,
                })
            }
        }
        setResult(result);
        handleLogin()
    }

    const handleClickOpenStatus = () => {
        setOpenStatus(true);
    };

    const handleCloseStatus = () => {
        setOpenStatus(false);
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
                            onClick={handleGetLatestData}
                        >
                            <SearchIcon
                                sx={{
                                    alignSelf: "center",
                                    color: "coreOrange",
                                }}
                            ></SearchIcon>
                            Get New Data
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
                        Updating Data
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

export default AudienceToolbar;
