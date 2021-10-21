import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAVideogame } from "../redux/actions/index";
import Styles from "../css/Videogame.module.css";

function Videogame(props) {
  const { id } = props.match.params;
  const { videogame } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAVideogame(id));
  }, [dispatch, id]);

  const goBack = () => {
    history.goBack();
  };
  return (
    <div className={Styles.allVideogame}>
      <div className= {Styles.left}>
        <button onClick={goBack} className={Styles.btnBack}>⏪</button>
      </div>
      <div className= {Styles.right}>
        {videogame ? (
          <div>
            <div>
              <img src={videogame.image} alt="" className={Styles.videogameImage}/>
            </div>
            <div>
            <p>{videogame.name}</p>
            <p>{videogame.description}</p>
             <p>{videogame.released}</p>
             {videogame.genres.map((e) => {
              return (
                <p>{e.name}</p>
              )
            })} 
            <p>{videogame.rating}</p>
            <p>{videogame.platforms}</p>
            </div>
          </div>
        ) : (
          <div>Cargando...</div>
        )}
      </div>
    </div>
  );
}

export default Videogame;
