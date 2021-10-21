import React from "react";
import { NavLink } from "react-router-dom";
import Styles from "../css/Card.module.css";

const Card = ({ image, name, id, genres, rating }) => {
  return (
    <div className={Styles.card}>
        <NavLink to={`/videogame/${id}`}>{name}</NavLink>
      <div className= {Styles.imageContainer}>
      <img src={image} alt={name} className={Styles.image}/>
      </div>
      <p>{genres}</p>
      <p>{rating}</p>
    </div>
  );
};

export default Card;
