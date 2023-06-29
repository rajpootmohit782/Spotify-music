import React, { useEffect, useContext } from "react";

import { StateContext } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import styled from "styled-components";

const Playlists = () => {
  const [{ token, playlists }, dispatch] = useContext(StateContext);
  useEffect(() => {
    const getPlaylistsData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/featured-playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        const { items } = response.data.playlists;
        const playlists = items.map(({ name, id }) => {
          return { name, id };
        });
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
        console.log(playlists);
      } catch (error) {
        console.log("Error fetching playlists:", error);
      }
    };

    getPlaylistsData();
  }, [token, dispatch]);
  return (
    <Container>
      <ul>
        {playlists.map(({ name, id }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </Container>
  );
};

export default Playlists;

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
    }
  }
`;
