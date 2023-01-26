import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { useParams } from "react-router-dom";
import axios from "axios";
import SongCard from "./SongCard";

function DetailPlaylistCmp() {
  const userId = parseInt(jwt(Cookies.get("user")).UserId);
  const PlayListId = useParams().id;
  const PlayListName = useParams().playListName;

  const [detailPlayList, setDetailPlayList] = useState([]);
  const [SongList, setSongList] = useState([]);

  useEffect(() => {
    async function getDetailPlaylist() {
      await axios
        .get(
          `https://localhost:7123/api/PlayListSongs?UserId=${userId}&PlayListId=${PlayListId}`
        )
        .then((res) => {
          setDetailPlayList(res.data);
        });
    }
    getDetailPlaylist();
  }, []);
  async function getSongList(List) {
    const ans2 = [];
    await Promise.all(
      List.map(async (e) => {
        await axios
          .get(`https://localhost:7123/song/${e.songId}`)
          .then((res) => {
            ans2.push(res.data);
          });
      })
    );
    setSongList(ans2);
  }

  useEffect(() => {
    getSongList(detailPlayList);
  }, [detailPlayList]);

  return (
    <div>
      <h3>{PlayListName}</h3>

      <hr />
      <br />

      <SongCard detail={SongList} />
    </div>
  );
}
export default DetailPlaylistCmp;
