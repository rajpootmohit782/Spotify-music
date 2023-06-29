import React, { useEffect, useContext } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import "./styles.css";
import { reducerCases } from "./utils/Constants";
import { StateContext } from "./utils/StateProvider";

export default function App() {
  const [{ token }, dispatch] = useContext(StateContext);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);

  return <div>{token ? <Spotify /> : <Login />}</div>;
}
