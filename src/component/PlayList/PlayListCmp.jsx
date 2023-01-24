import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import axios from "axios";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [PlayList, setPlayList] = React.useState([]);
  //   const navigate = useNavigate();
  const userId = parseInt(jwt(Cookies.get("user")).UserId);
  const getApiUrl = `https://localhost:7123/playlist?UserId=${userId}`;

  async function GetPlayList() {
    await axios.get(getApiUrl).then((res) => {
      setPlayList(res.data);
    });
  }
  React.useEffect(() => {
    GetPlayList();
  }, [PlayList]);

  const Delete = async (sv) => {
    if (window.confirm("Are You Sure Want to Delete ")) {
      await axios.delete("https://localhost:7123/playlist" + "/" + sv.id);
      setPlayList(PlayList.filter((p) => p.id !== sv.id));
    }
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Demo>
          <List dense={dense}>
            {PlayList.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        Delete(item);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.playlistName} />
                </ListItem>
              );
            })}
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
