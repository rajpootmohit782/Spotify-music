import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import Body from "./Body";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { StateContext } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
const Spotify = () => {
  const [{ token, playlists }, dispatch] = useContext(StateContext);
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerbackground, setHeaderBackground] = useState(false);
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log("hiiiiiiiiiiiii");
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      console.log(userInfo);
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [token, dispatch]);
  return (
    <Container>
      <div className="spotify_body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />
          <div className="body_contents"></div>
          <Body headerBackground={headerbackground} />
        </div>
      </div>
      <div className="Spotify_footer">
        <Footer />
      </div>
    </Container>
  );
};

export default Spotify;
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify_body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
  }
  .body {
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    height: 100%;
    width: 100%;
    overflow: auto;
  }
`;
