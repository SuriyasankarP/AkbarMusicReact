import { Button, CardActions, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function SongCard({ detail }) {
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
      {detail.map((sv) => {
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
              {/* {Flag ? (
                <Button
                  onClick={() => {
                    Delete(sv);
                  }}
                  size="small"
                >
                  Delete
                </Button>
              ) : null} */}
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default SongCard;
