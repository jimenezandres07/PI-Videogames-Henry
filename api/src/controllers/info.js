const { Videogame, Genre, Op } = require("../db");
require('dotenv').config();
const axios = require("axios");

//#InfoAPI
const infoApi = async () => {
    let apiVideogames = (
        await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
      ).data;
      let apiVideogames1 = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`
        )
      ).data;
      let apiVideogames2 = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=40`
        )
      ).data;
  
      let videoGames = apiVideogames.concat(apiVideogames1, apiVideogames2);

      videoGames.map(el => {
          
      })
}
//#endregion

//#InfoDb

const infoDb = async () => {

}

//#endregion

//#InfoEtc...

//#endregion