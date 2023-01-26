import Cookies from "js-cookie";
import React from "react";
import HomeAuth from "./HomeAuth";
import HomeNormal from "./HomeNormal";
function Home() {
  const Token = Cookies.get("user");
  return Token ? (
    <>
      <HomeAuth />
    </>
  ) : (
    <>
      <HomeNormal />
    </>
  );
}

export default Home;
