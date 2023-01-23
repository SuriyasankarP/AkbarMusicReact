import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { redirect } from "react-router-dom";

function AddSong() {
  const ApiUrl = "https://localhost:7123/song";

  const [Data, setData] = useState({
    Name: "",
    Album: "",
    Director: "",
    FileLink: "",
    PosterLink: "",
  });

  function handle(e) {
    const newData = { ...Data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }
  async function submit(e) {
    e.preventDefault();
    await axios
      .post(ApiUrl, {
        Name: Data.Name,
        Album: Data.Album,
        Director: Data.Director,
        FileLink: Data.FileLink,
        PosterLink: Data.PosterLink,
      })
      .then(function (res) {
        redirect("/");
        console.log("Success");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  return (
    <div>
      <Grid>
        <Card style={{ maxWidth: 750, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography
              variant="body"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Add New Song...
            </Typography>
            <form onSubmit={(e) => submit(e)}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    onChange={(e) => handle(e)}
                    id="Name"
                    value={Data.Name}
                    placeholder="Enter Title"
                    label="Song Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    onChange={(e) => handle(e)}
                    id="Album"
                    value={Data.Album}
                    placeholder="Enter Album Name"
                    label="Album Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => handle(e)}
                    id="Director"
                    value={Data.Director}
                    placeholder="Enter Director Name"
                    label="Director Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => handle(e)}
                    id="FileLink"
                    value={Data.FileLink}
                    placeholder="Enter File Link Here"
                    label=" File Link"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => handle(e)}
                    id="PosterLink"
                    value={Data.PosterLink}
                    placeholder="Enter PosterLink Here"
                    label=" Poster Link"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default AddSong;
