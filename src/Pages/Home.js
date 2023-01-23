import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Button, CardActions } from "@mui/material";
import Cookies from "js-cookie";
import jwt from "jwt-decode";

// import axios from "axios";

function Home() {
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

  const Delete = async (sv) => {
    await axios.delete(ApiUrl + "/" + sv.id);
    setData(Data.filter((p) => p.id !== sv.id));
  };
  const Token = Cookies.get("user");
  var Flag = 0;
  if (Token) {
    if (jwt(Token).UserType == "admin") {
      Flag = 1;
    }
  }

  return (
    <div className="container" style={{ display: "flex", gap: 20 }}>
      {Data.map((sv) => {
        return (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={sv.posterLink}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {sv.name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Album : {sv.album}
              </Typography>
              <Typography variant="h6" color="text.secondary">
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
              ) : null}
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
export default Home;
