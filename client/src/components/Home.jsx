import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getVideogames, setPage} from '../redux/actions';
import Card from './Card';

function Home() {
    const dispatch = useDispatch();
    const {videogames, name, order, page} = useSelector((state) => state);

    useEffect(() => {
        dispatch(getVideogames({}))
     }, [dispatch])
    const changePage = (page) => {
        dispatch(getVideogames({page, name, order}));
        dispatch(setPage(page));
    } 


    return (
        <div>
            {
                videogames?.result?.length > 0 && videogames.result.map((vg) => {
                    return (
                        <Card
                        background_image= {vg.background_image}
                        name={vg.name}
                        genres={vg.genres}
                        key = {vg.id}
                        id = {vg.id}
                        />
                    )
                })
            }
            <button
            disabled={page - 1 === 0}
            onClick={() => {
                changePage(page - 1)
            }}
            >previous
            </button>
            <label>{page}</label>
            <button
            disabled= {videogames?.count <= page * 15}
            onClick= {() => {
                changePage(page + 1);
            }}
            >
                next
            </button>
        </div>
    )
}

export default Home
