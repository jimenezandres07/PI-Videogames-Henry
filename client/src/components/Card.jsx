import React from "react"
import { NavLink } from "react-router-dom";

const Card = ({image, name,id,genres, rating}) => {
    return (
        <div>
            <h1>{name}</h1>
            <img src={image} alt={name}/>
            <p>{genres}</p>
            <p>{rating}</p>
            <NavLink to={`/videogame/${id}`}>{name}</NavLink>
        </div>
    )
}

export default Card;

