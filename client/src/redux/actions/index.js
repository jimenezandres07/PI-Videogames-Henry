import axios from "axios";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const ORDER_ALPH = "ORDER_ALPH";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const FILTER_VIDEOGAMES_BY_GENRE = "FILTER_VIDEOGAMES_BY_GENRE";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const SET_PAGE = "SET_PAGE";

export const postVideogame = (videogame) => {
  return async function (dispatch) {
    let response = axios.post(`http://localhost:3001/videogames/genres`, videogame)
    return response
  }
};

export const getGenres = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/videogames/genres`)
      .then((response) => {
        return dispatch({
          type: GET_GENRES,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const getVideogames = ({ page, order, name, origin, rating }) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:3001/videogames?page=${page ? page : 1}&order=${
          order ? order : ""
        }&name=${name ? name : ""}&origin=${origin ? origin : ""}&rating=${rating ? rating : ""}`
      )
      .then((videogames) => {
        return dispatch({
          type: GET_ALL_VIDEOGAMES,
          payload: videogames.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const getAVideogame = (id) => {
  return async (dispatch) => {
    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then((videogame) => {
        return dispatch({
          type: GET_VIDEOGAME,
          payload: videogame.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const orderAlph = (order) => {
  return {
    type: ORDER_ALPH,
    payload: order,
  };
};

export const orderByRating = (rating) => {
  return {
    type: ORDER_BY_RATING,
    payload: rating,
  };
};

export const filterVideogamesByGenre = (payload) => {
  return {
    type: FILTER_VIDEOGAMES_BY_GENRE,
    payload,
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_ORIGIN,
    payload: origin
  }
};
export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page
  }
};
