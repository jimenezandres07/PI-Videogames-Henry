import React from "react";

import NavSearch from "./NavSearch";
import Styles from "../css/NavBar.module.css";

export default function NavBar() {
  const visitForm = () => {
    window.location = "http://localhost:3000/form";
  };
  return (
    <div className={Styles.allNav}>
      <NavSearch />
      <button onClick={visitForm} className={Styles.createVid}> Create a Videogame! </button>
    </div>
  );
}
