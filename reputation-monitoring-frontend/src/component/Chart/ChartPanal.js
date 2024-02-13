import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';

const ChartPanal = ({ navigation, onMessage }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    onMessage(index);
  };

  return (
    <SafeAreaView>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <List component="nav" aria-label="main mailbox folders" disablePadding>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <AutoGraphIcon />
            </ListItemIcon>
            <ListItemText primary="Reputation" />
          </ListItemButton>
          <Divider />
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <AlignVerticalCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Audience's engagement" />
          </ListItemButton>
        </List>
      </Box>
    </SafeAreaView>
  );
};

export default ChartPanal;
