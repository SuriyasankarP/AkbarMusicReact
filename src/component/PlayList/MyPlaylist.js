import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import PlayListCmp from "./PlayListCmp";

function MyPlaylist() {
  // const [PlayList, setPlayList] = useState([]);
  // const navigate = useNavigate();
  const userId = parseInt(jwt(Cookies.get("user")).UserId);

  // async function GetPlayList() {
  //   await axios.get(getApiUrl).then((res) => {
  //     setPlayList(res.data);
  //   });
  // }
  // useEffect(() => {
  //   GetPlayList();
  // }, []);

  const ApiUrl = "https://localhost:7123/playlist";
  const [Data, setData] = useState({
    PlaylistName: "",
    UserId: userId,
  });

  function handle(e) {
    const newData = { ...Data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function submit(e) {
    e.preventDefault();
    await axios
      .post(ApiUrl, {
        PlaylistName: Data.PlaylistName,
        UserId: Data.UserId,
      })
      .then(function (res) {
        alert("Successfully Added");
      })
      .catch((error) => {
        console(error.response.data);
      });
  }

  return (
    <div>
      <Button
        style={{ marginBottom: "20px" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={(e) => submit(e)}>
          <DialogTitle>Add New</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              onChange={(e) => handle(e)}
              margin="dense"
              id="PlaylistName"
              label="Name Of Playlist"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <div>
        <PlayListCmp />
      </div>
    </div>
  );
}

export default MyPlaylist;
