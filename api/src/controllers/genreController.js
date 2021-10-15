const { Router } = require("express");
const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

// GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
const preloadGenres = async (req, res) => {
  try {
    var genres = (
      await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    ).data.results;
    genres = genres.map((e) => {
      return { name: e.name, image: e.image_background };
    });
    genres = await Promise.all(
      genres.map((ele) =>
        Genre.findOrCreate({
          where: {
            name: ele.name,
          },
        })
      )
    );
    // console.log('la concha de tu madre olbois',genres)

    return "Videogames loaded";
  } catch (error) {
    return "No se han cargao";
  }
};
const getGenres = async (req, res) => {
  try {
    let genres = await Genre.findAll();
    genres = genres.map((e) => e.dataValues);
    genres = genres.map((el) => {
      return {
        ...el,
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sopitas.com%2Fentretenimiento%2Falguna-vez-morgan-freeman-fue-joven%2F&psig=AOvVaw374mG8Djvf1PByPk19XKZ6&ust=1634146023350000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCKj2o8ayxfMCFQAAAAAdAAAAABA1'
      };
    });
    res.json(genres);
  } catch (error) {
    console.log(error);
  }
};
//#endregion

module.exports = { getGenres, preloadGenres };
