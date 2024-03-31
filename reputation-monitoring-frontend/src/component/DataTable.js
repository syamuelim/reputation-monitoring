import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Dimensions } from "react-native";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

import { useInfluencerContext } from "../service/StateContext";
const columns = [
    { id: 'name', label: 'Name', key: 1 },
    {
        object: 'youtubeChannel',
        id: 'followers',
        label: 'YouTube Followers',
        format: (value) => value.toLocaleString('en-US'),
        key: 2
    },
    {
        object: 'youtubeChannel',
        id: 'video_published',
        label: 'YouTube Video Published',
        format: (value) => value.toLocaleString('en-US'),
        key: 3
    },
    {
        object: 'instagramUser',
        id: 'followers',
        label: 'Instagram Followers',
        format: (value) => value.toLocaleString('en-US'),
        key: 4
    },
    {
        object: 'instagramUser',
        id: 'posts',
        label: 'Instagram Post Shared',
        format: (value) => value.toLocaleString('en-US'),
        key: 5
    },
];

const apx = (size = 0) => {
    let width = Dimensions.get("window").width;
    if (width > 750) {
        return size;
    }
    return (width / 750) * size;
};


export default function InflucenerTable() {
    const { state, dispatch } = useInfluencerContext();
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', border: "1px solid #c6c6c6", borderRadius: "8px" }}>
            <TableContainer sx={{ maxHeight: apx(330), height: apx(330), }} >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth,  backgroundColor: theme.palette.coreOrange.main, color: "#fff" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <ThemeProvider theme={theme}>

                        <TableBody>
                            {state.influencers
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{backgroundColor: index % 2 === 1 ? "#dff4ed" : ""}}>
                                            {columns.map((column) => {
                                                const value = column.object ? row[column.object][column.id] : row[column.id];
                                                return (
                                                    <TableCell key={column.key} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : <Chip
                                                                avatar={<Avatar src={row.youtubeChannel.iconUrl}>
                                                                </Avatar>}
                                                                label={value}
                                                                variant={"filled"}
                                                                color="coreGreen"
                                                                clickable={true}
                                                            />}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </ThemeProvider>
                </Table>
            </TableContainer>
        </Paper>
    );
}
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