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
    if (window.confirm("Are You Sure Want to Delete ")) {
      await axios.delete(ApiUrl + "/" + sv.id);
      setData(Data.filter((p) => p.id !== sv.id));
    }
  };
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
      {Data.map((sv) => {
        return (
          <Card sx={{ width: "23%" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
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
              ) : null}
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
export default Home;
