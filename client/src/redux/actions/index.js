import axios from "axios";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const SET_ORDER = "SET_ORDER";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const SET_PAGE = "SET_PAGE";
export const SET_GENRE = "SET_GENRE";
export const SET_ORIGIN = "SET_ORIGIN";
export const RESET_PAGE = "RESET_PAGE";

export const postVideogame = (videogame) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:3001/videogames/add`, videogame)
      .then(() => {
        return dispatch({
          type: POST_VIDEOGAME,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getGenres = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/genres`)
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

export const getVideogames = ({ name, origin }) => {
  return (dispatch) => {
    axios
      .get(
        `http://localhost:3001/videogames?name=${name ? name : ""}&origin=${
          origin ? origin : ""
        }`
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
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then((videogame) => {
        console.log(videogame);
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

export const setOrder = (order) => {
  return {
    type: SET_ORDER,
    payload: order,
  };
};

export const resetPage = () => {
  return {
    type: RESET_PAGE,
  };
};

export const setGenre = (genre) => {
  return {
    type: SET_GENRE,
    payload: genre,
  };
};

export const setOrigin = (origin) => {
  return {
    type: SET_ORIGIN,
    payload: origin,
  };
};
export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};
export const setName = (name) => {
  return {
    type: SET_PAGE,
    payload: name,
  };
};
