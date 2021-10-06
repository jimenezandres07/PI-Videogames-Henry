const { Videogame, Genre, Op } = require("../db");
const { Router, query } = require("express");
require("dotenv").config();
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { API_KEY } = process.env;

const router = Router();

//#region GET GENRES
async function getGenres(req, res, next) {
  try {
    let genres = (
      await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    ).data.results;
    let genresName = genres.map((e) => e.name);
    genresName.map(async (el) => {
      if (el.name) {
        await Genre.findOrCreate({
          where: {
            name: el.name,
          },
        });
      }
    });
    res.status(200).send(genresName);
  } catch (error) {
    next(error);
  }
}
//#endregion

//#region GET VIDEOGAME
async function getVideogame(req, res, next) {
  try {
    let { order, page, name, rating} = req.query;
    page = page ? page : 1;
    let vidXpage = 15;
    let allVideogames = [];

    let apiVideogames = (
      await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    ).data.results;
    let apiVideogames1 = (
      await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`
      )
    ).data.results;
    let apiVideogames2 = (
      await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=40`
      )
    ).data.results;

    let videoGames = apiVideogames.concat(apiVideogames1, apiVideogames2);

    //#region NAME
    if (name && name !== "") {
      let apiSearchVid = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
        )
      ).data.results;
      let dbVideogame = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      allVideogames = apiSearchVid.concat(dbVideogame);
    } else {
      let dbVideogame = await Videogame.findAll({ include: Genre });
      allVideogames = dbVideogame.concat(videoGames);
    }
    //#endregion
    
    //#region 

    /*if (rating === "increment" && rating === "") {
      allVideogames = allVideogames.sort((a, b) => a.rating > b.rating ? 1 : -1);
    }
    if (rating === "decrement"){
      allVideogames = allVideogames.sort((a, b) => a.rating > b.rating ? -1 : 1);
    }*/

    //#endregion

    //#region ORDER

    if (order === "asc" && !order && order === "") {
      allVideogames = allVideogames.sort((a, b) => {
        a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
    } else {
      allVideogames = allVideogames.sort((a, b) => {
        b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      });
    }
    //#endregion

    //#region PAGE

    let result = allVideogames.slice(
      vidXpage * (page - 1),
      vidXpage * (page - 1) + vidXpage
    );

    //#endregion
    return res.send({
      result: result,
      count: allVideogames.length,
    });
  } catch {
    next(console.error("Holi"));
  }
}
//#endregion

//#region ADD VIDEOGAME
const addVideogame = async function (req, res, next) {
  const {
    name,
    background_image,
    description,
    released,
    rating,
    platforms,
    genres,
  } = req.body;
  if (!name || !description || !background_image || !genres || !platforms) {
    const err = new Error("Missing parameters");
    err.status = 400;
    next(err);
  } else {
    let videogame = await Videogame.create({
      name,
      description,
      background_image,
      released,
      rating,
      platforms,
    });

    genres?.map(async (g) => {
      let dbGenres = await Genre.findAll({
        where: {
          name: g,
        },
      });
      await videogame.addGenre(dbGenres);
    });
    res.json({ ...videogame, genres });
    console.log(videogame);
  }
};
//#endregion

//#region getVideogameById

const getVideogameById = async (req, res, next) => {

  const {id} = req.params;
  let videogame;
  if(isNaN(id)){
    videogame = await Videogame.findByPk(id)
  } else {
    videogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    videogame = videogame.data
  }
  return res.json(videogame)

}

//#endregion
module.exports = {
  getVideogame,
  addVideogame,
  getGenres,
  getVideogameById
};
