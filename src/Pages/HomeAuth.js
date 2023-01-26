import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Cookies from "js-cookie";
import jwt from "jwt-decode";

function HomeAuth() {
  const userId = jwt(Cookies.get("user")).UserId;
  const [Submit, setSubmit] = useState({
    SongId: 0,
    PlaylistId: null,
    UserId: userId,
  });
  const [Data, setData] = useState([]);

  const ApiUrl = "https://localhost:7123/song";

  async function getSongs() {
    await axios.get(ApiUrl).then((res) => {
      setData(res.data);
    });
  }
  useEffect(() => {
    getSongs();
  }, []);

  const [PlayList, setPlayList] = useState([]);

  const getApiUrl = `https://localhost:7123/playlist?UserId=${userId}`;
  async function GetPlayList() {
    await axios.get(getApiUrl).then((res) => {
      setPlayList(res.data);
    });
  }
  useEffect(() => {
    GetPlayList();
  }, [PlayList]);

  const Delete = async (sv) => {
    if (window.confirm("Are You Sure Want to Delete ")) {
      await axios.delete(ApiUrl + "/" + sv.id);
      setData(Data.filter((p) => p.id !== sv.id));
    }
  };
  const [open, setOpen] = useState(false);

  const getsongId = (sv) => {
    const ans = { ...Submit, SongId: sv };
    setSubmit({ ...ans });
  };

  const handleClickOpen = (sv) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Add To PLaylist Api Call

  function handle(e) {
    const newData = { ...Submit };
    newData[e.target.id] = parseInt(e.target.value);
    setSubmit(newData);
  }

  async function submitPlaylist(e) {
    e.preventDefault();
    await axios
      .post("https://localhost:7123/api/PlayListSongs", {
        songId: Submit.SongId,
        playListId: Submit.PlaylistId,
        userId: Submit.UserId,
      })
      .then(function (res) {
        alert("Successfully Added");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }
  const Token = Cookies.get("user");
  var Flag = 0;
  if (Token) {
    if (jwt(Token).UserType == "admin") {
      Flag = 1;
    }
  }

  return (
    <div
      className="container"
      style={{
        display: "flex",
        // justifyContent: "space-between",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <form onSubmit={(e) => submitPlaylist(e)}>
          <DialogTitle>Add New</DialogTitle>

          <DialogContent>
            <select
              onChange={(e) => {
                handle(e);
              }}
              style={{ padding: "15px 20px", width: "100%", fontSize: "16px" }}
              id="PlaylistId"
            >
              {PlayList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.playlistName}
                  </option>
                );
              })}
            </select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {Data.map((sv) => {
        return (
          <Card style={{ flexShrink: 0, flexBasis: "200px" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              style={{ objectFit: "cover" ,objectPosition: "top"}}
              image={sv.posterLink}
              width="100%"
            />
            <CardContent>
              <Typography gutterBottom style={{ fontSize: 16 }}>
                {sv.name}
              </Typography>
              <Typography style={{ fontSize: 14 }} color="text.secondary">
                Album : {sv.album}
              </Typography>
              <Typography style={{ fontSize: 14 }} color="text.secondary">
                Director : {sv.director}
              </Typography>
            </CardContent>
            <CardActions>
              <Button href={sv.fileLink} size="small">
                Download
              </Button>
              {Flag ? (
                <Button
                  onClick={() => {
                    Delete(sv);
                  }}
                  size="small"
                >
                  Delete
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    getsongId(sv.id);
                    handleClickOpen();
                  }}
                  size="small"
                >
                  Add To Playlist
                </Button>
              )}
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
export default HomeAuth;
