import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import {getAVideogame} from '../redux/actions/index';

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
        <div>
            <button onClick={goBack}>⏪</button>
            {

                videogame?.name ? 
                <>
                    <img src={videogame.image} alt=""/>
                    <p>{videogame.name}</p>
                </>
                :
                <div>Cargando...</div>
            }
        </div>
    )
}

export default Videogame
