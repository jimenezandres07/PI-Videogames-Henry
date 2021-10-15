import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import {getAVideogame} from '../redux/actions/index';
import Styles from '../css/Videogame.module.css'

function Videogame(props) {
    const { id } = props.match.params;
    const { videogame } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAVideogame(id))
    }, [dispatch, id])

    const goBack = () => {
        history.goBack()
    }
    return (
        <div className = {Styles.allVideogame}>
            <button onClick={goBack}>⏪</button>
            {

                videogame ? 
                <div>
                    <img src={videogame.image} alt=""/>
                    <p>{videogame.name}</p>
                    <p>{videogame.description}</p>
                </div>
                :
                <div>Cargando...</div>
            }
        </div>
    )
}

export default Videogame
