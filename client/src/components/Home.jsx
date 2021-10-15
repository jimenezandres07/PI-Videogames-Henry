import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogames } from "../redux/actions";
import Styles from "../css/Home.module.css";
import Cards from "./Cards";
import NavBar from "./NavBar";
import Order from "./Order";
import Filter from "./Filter";
import Paginado from "./Paginado";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogames({}));
  }, [dispatch]);

  return (
    <div className={Styles.allHome}>
      <NavBar />
      <div className = {Styles.bottomContainer}>
        <div className={Styles.selectsContainer}>
          <Order />
          <Filter />
        </div>
        <div className ={Styles.contentContainer}>
          <Paginado />
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default Home;
