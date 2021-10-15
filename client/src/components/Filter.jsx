import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setGenre, getVideogames, setPage, setOrigin, getGenres} from '../redux/actions/index'

function Filter() {
    const {origin, name, genres} = useSelector(state => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const handleGenreSelect = (e)=>{
        dispatch(setPage(1))
        dispatch(setGenre(e.target.value))
        dispatch(getVideogames({origin, name}))
    }

    const handleOriginSelect = (e) => {
        dispatch(setPage(1))
        dispatch(setOrigin(e.target.value))
        dispatch(getVideogames({origin: e.target.value, name}))
    }


    return (
        <div>
            
            <select onChange = {handleGenreSelect}> 
                <option defaultValue ='' key = 'genres'>Genres</option>
            {
                genres?.map((e) => {

                    return(<option value= {e.name} key={e.id}> {e.name} </option>)
                })
            }
            </select>
            <select type='select' onClick= {handleOriginSelect}>
            <option defaultValue ='' key = 'origin'>Origin</option>
                <option value= 'created'>Created</option>
                <option value= 'existent'>Existent</option>
            </select>
        </div>
    )
}

export default Filter
