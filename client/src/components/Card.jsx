import React from "react"
import { NavLink } from "react-router-dom";

const Card = ({background_image, name,id,genres}) => {
    return (
        <div>
            <h1>{name}</h1>
            <img src={background_image} alt={name}/>
            <p>{genres}</p>
            <NavLink to={`/videogames/${id}`}>{name}</NavLink>
        </div>
    )
}

export default Card;

