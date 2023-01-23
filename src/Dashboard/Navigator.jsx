import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
const isLoggedIn = Cookies.get("user");
const isAdmin = () => {
  if (jwt(isLoggedIn).UserType == "admin") {
    return true;
  } else {
    return false;
  }
};

const LogOut = (e) => {
  e.preventDefault();
  Cookies.remove("user");
  window.location.href = "/";
};

const categoryAdmin = [
  {
    id: "Songs",
    children: [{ id: "Add New Song", icon: <LibraryMusicIcon  />, redirect:"/addsong" }],
  },
  {
    id: "Playlist",
    children: [
      { id: "View Playlist", icon: <LibraryMusicIcon /> },
      { id: "Add New Playlist", icon: <LibraryAddIcon /> },
    ],
  },
  {
    id: "Account",
    children: [
      {
        id: "Logout",
        icon: <LogoutIcon />,
        onClick: LogOut,
        redirect: "/",
      },
    ],
  },
];

const NotLogin = [
  {
    id: "Playlist",
    children: [{ id: "All Playlist", icon: <LibraryMusicIcon /> }],
  },
  {
    id: "Account",
    children: [
      {
        id: "Register",
        icon: <PeopleIcon />,
        redirect: "/register",
      },

      {
        id: "Login",
        icon: <LoginIcon />,
        redirect: "/Login",
      },
    ],
  },
];

const NormalUser = [
  {
    id: "Playlist",
    children: [{ id: "My Playlist", icon: <LibraryMusicIcon /> }],
  },
  {
    id: "Account",
    children: [
      {
        id: "Logout",
        icon: <LogoutIcon />,
        onClick: LogOut,
        redirect: "/",
      },
    ],
  },
];

const categories =
  isLoggedIn && isAdmin() ? categoryAdmin : isLoggedIn ? NormalUser : NotLogin;

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          <img src={logo} alt="" />
        </ListItem>
        <Link to="/">
          <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </Link>

        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(
              ({ id: childId, icon, active, redirect, onClick }) => (
                <Link to={`${redirect}`}>
                  <ListItem disablePadding key={childId} onClick={onClick}>
                    <ListItemButton selected={active} sx={item}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              )
            )}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
