import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import jwt from "jwt-decode";
import Cookies from "js-cookie";

function Header(props) {
  const { onDrawerToggle } = props;
  const Token = Cookies.get("user");
  var Flag = 0;
  if (Token) {
    Flag=1;
  }

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            {!Flag ? (
              <>
                <Grid item>
                  <IconButton color="inherit" sx={{ p: 0.5 }}>
                    <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                  </IconButton>
                </Grid>

                <Grid item>UserNotLogin</Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <IconButton color="inherit" sx={{ p: 0.5 }}>
                    <Avatar>{jwt(Token).UserName[0]}</Avatar>
                  </IconButton>
                </Grid>

                <Grid item>{jwt(Token).UserName}</Grid>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
