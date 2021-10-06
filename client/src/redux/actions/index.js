export const getVideogames = (payload) => {
  return (dispatch) => {
      axios.get(`http://localhost:3001/videogames`)
      .then(videogames => {
          return dispatch({
              type: 'GET_ALL_VIDEOGAMES',
              payload: videogames.data
          })
      }).catch(err => {
          console.error('Quackk')
      })
  };
};

export const orderVideogames = (payload) => {
  return {
    type: "ORDER_VIDEOGAMES",
    payload,
  };
};

export const filterVideogames = (payload) => {
  return {
    type: "FILTER_VIDEOGAMES",
    payload,
  };
};

export const getAVideogame = (payload) => {
  return {
    type: "GET_AVIDEOGAME",
    payload,
  };
};

export const createVideogame = (payload) => {
  return {
    type: "CREATE_VIDEOGAME",
    payload,
  };
};
