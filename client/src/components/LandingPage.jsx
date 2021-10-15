import React from "react";
import Styles from "../css/LandingPage.module.css";

function LandingPage() {
  const visitPage = () => {
    window.location = "http://localhost:3000/home";
  };

  return (
    <div className={Styles.landing}>
        <div className = {Styles.btnContainer}>
        <button className={Styles.btn} onClick={visitPage}>
          Go Home!
        </button>
        </div>
    </div>
  );
}

export default LandingPage;
