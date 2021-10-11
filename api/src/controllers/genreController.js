const { Router } = require("express");
const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

// GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
const preloadGenres = async (req, res) => {
  try {
    let genres = (
      await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    ).data.results;
    genres = genres.map((e) => e.name);
    genres = genres.map(async (el) => {
        await Genre.findOrCreate({
          where: {
            name: el,
          },
        });
    });
    return 'Videogames loaded'
  } catch (error) {
    return 'No se han cargao'
  }
}
const getGenres = async (res) => {
  try {
    let genres = await Genre.findAll();
    res.json(genres)
  } catch (error) {
    console.log(error);
  }
}
//#endregion

module.exports = { getGenres, preloadGenres };
