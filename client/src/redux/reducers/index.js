import {
    POST_VIDEOGAME,
GET_GENRES,
GET_ALL_VIDEOGAMES,
ORDER_ALPH,
ORDER_BY_RATING,
FILTER_VIDEOGAMES_BY_GENRE,
GET_VIDEOGAME,
FILTER_ORIGIN,
SET_PAGE
} from '../actions/index'

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

const initialState = {
    videogames: {},
    allVideogames: [],
    videogame: {},
    genres: [],
    name: "",
    order: "",
    page: 1

}

export default function reducer ( state = initialState, {type, payload}) {
    switch(type){
        case POST_VIDEOGAME:
            return {
                ...state
            }
        case GET_GENRES:
            return {
                ...state,
                genres: payload
            }
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                allVideogames: payload
            }
        case ORDER_ALPH:
            return {
                ...state,
                order: payload

            }
        case ORDER_BY_RATING:
            return {
                ...state,
                videogames: payload,

            }
        case FILTER_VIDEOGAMES_BY_GENRE:
            return {
                ...state,
                videogames: payload
            }
        case GET_VIDEOGAME:
            return {
                ...state,
                videogame: payload
            }
        case SET_PAGE:
            return {
                ...state,
                videogame: payload
            }
        case FILTER_ORIGIN:
            return {
                ...state,
                videogame: payload
            }
        default :
        return state
    }
}