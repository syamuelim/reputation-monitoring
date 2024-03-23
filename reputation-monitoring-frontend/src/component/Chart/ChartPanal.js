import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions} from "react-native";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import { Typography } from "@mui/material";

const ChartPanal = ({ navigation, onMessage }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const apx = (size = 0) => {
    let width = Dimensions.get("window").width;
    if (width > 750) {
      return size;
    }
    return (width / 750) * size;
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    onMessage(index);
  };

  return (
    <SafeAreaView>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }} height={apx(330)} border={"1px solid #c6c6c6"} borderRadius={"8px"}>
        <List component="nav" aria-label="main mailbox folders" disablePadding>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <AutoGraphIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography style={{ fontWeight: "bold" }}>Reputation</Typography>}/>
          </ListItemButton>
          <Divider />
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <AlignVerticalCenterIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography style={{ fontWeight: "bold" }}>Audience's engagement</Typography>}/>
          </ListItemButton>
        </List>
      </Box>
    </SafeAreaView>
  );
};

export default ChartPanal;
