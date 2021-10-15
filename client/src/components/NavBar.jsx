import React from "react";

import NavSearch from "./NavSearch";
import Styles from "../css/NavBar.module.css";

export default function NavBar() {
  const visitPage = () => {
    window.location = "http://localhost:3000/form";
  };
  return (
    <div className={Styles.allNav}>
      <NavSearch />
      <button onClick={visitPage}> Create a Videogame! </button>
    </div>
  );
}
