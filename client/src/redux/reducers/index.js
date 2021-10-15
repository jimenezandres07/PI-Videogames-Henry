import {
  POST_VIDEOGAME,
  GET_GENRES,
  GET_ALL_VIDEOGAMES,
  SET_ORDER,
  GET_VIDEOGAME,
  FILTER_ORIGIN,
  SET_PAGE,
  SET_GENRE,
  RESET_PAGE,
} from "../actions/index";

const initialState = {
  videogames: {},
  videogame: {},
  genres: [],
  genre: "",
  name: "",
  order: "",
  page: 1,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_VIDEOGAMES:
      const vidXpage = 15;
      const O = state.order;
      let array = [...payload.all];
      if (state.genre) {
        array = array.filter((e) => e.genres.includes(state.genre));
      }
      if (O === "A - Z") {
        array.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
      }
      if (O === "Z - A") {
        array.sort((a, b) => {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        });
      }
      if (O === "0 - 5") {
        array.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      }
      if (O === "5 - 0") {
        array.sort((a, b) => (a.rating > b.rating ? -1 : 1));
      }
      let slicedVideogames = array.slice(
        vidXpage * (state.page - 1),
        vidXpage * (state.page - 1) + vidXpage
      );

      return {
        ...state,
        videogames: { ...payload, sliced: slicedVideogames },
      };
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };
    case GET_VIDEOGAME:
      return {
        ...state,
        videogame: payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: payload,
      };
    case SET_ORDER:
      return {
        ...state,
        order: payload,
      };
    case FILTER_ORIGIN:
      return {
        ...state,
        videogame: payload,
      };
    case SET_GENRE:
      return {
        ...state,
        genre: payload,
      };
    case RESET_PAGE:
      return {
        ...state,
        genre: "",
        name: "",
        order: "",
        page: 1,
      };
    case POST_VIDEOGAME:
      return {
        ...state
        };
    default:
      return state;
  }
}
