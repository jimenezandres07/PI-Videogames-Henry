const { Videogame, Genre, Op } = require("../db");
const { Router } = require("express");
require("dotenv").config();
const axios = require("axios");
const db = require("../db");
const { API_KEY } = process.env;

//#region GET VIDEOGAME
async function getVideogame(req, res, next) {
  try {
    let { name, origin } = req.query;
    //page = page ? page : 1;
    //let vidXpage = 15;
    let videogames = [];
    let dbVideogames;
    let apiVideogames;
    //let dbVideogame = await Videogame.findAll();

    //#region NAME
    if (name && name !== "") {
      apiVideogames = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
        )
      ).data.results;
      apiVideogames = apiVideogames.map((e) => {
        let mappedApiGenres = e.genres.map((el) => el.name);
        return {
          name: e.name,
          image: e.background_image,
          genres: mappedApiGenres,
          id: e.id,
        };
      });
      dbVideogames = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      dbVideogames = dbVideogames.map((e) => e.dataValues);
      dbVideogames = dbVideogames.map((el) => {
        let vgGenres = el.genres.map((ele) => ele.name);
        return {
          ...el,
          genres: vgGenres,
        };
      });
      videogames = dbVideogames.concat(apiVideogames);
      //#endregion
    } else {
      let apVideogames = (
        await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
      ).data.results;
      let apVideogames1 = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`
        )
      ).data.results;
      let apVideogames2 = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=40`
        )
      ).data.results;
      apiVideogames = apVideogames.concat(apVideogames1, apVideogames2);
      apiVideogames = apiVideogames.map((e) => {
        let mappedApiGenres = e.genres.map((el) => el.name);
        return {
          name: e.name,
          genres: mappedApiGenres,
          id: e.id,
          image: e.background_image,
          rating: e.rating
        };
      });
      dbVideogames = await Videogame.findAll({
        include: Genre,
      });
      dbVideogames = dbVideogames.map((e) => e.dataValues);

      dbVideogames = dbVideogames.map((el) => {
        let vgGenres = el.genres.map((ele) => ele.name);
        return {
          ...el,
          genres: vgGenres,
        };
      });

      videogames = dbVideogames.concat(apiVideogames);
    }

    //#region ORIGIN
    if (origin === "created") {
      videogames = videogames.filter((vg) => vg.createdDb);
    }
    if (origin === "existent") {
      videogames = videogames.filter((vg) => !vg.createdDb);
    }
    //origin === 'created' ? videogames.filter(vg => vg.createdDb) : videogames.filter(vg => !vg.createdDb)
    //#endregion



    //#region PAGE

    //#endregion
    return res.send({
      all: videogames,
      count: videogames.length,
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
    image,
    description,
    released,
    rating,
    platforms,
    genres,
  } = req.body;
  if (!name || !description || !image || !genres || !platforms) {
    const err = new Error("Missing parameters");
    err.status = 400;
    next(err);
  } else {
    let videogame = await Videogame.create({
      name,
      description,
      image,
      released,
      rating,
      platforms,
      createdDb: true,
    });

    let dbGenres = await Genre.findAll({
      where: {
        id: {
          [Op.in]: genres,
        },
      },
    });
    await videogame.addGenre(dbGenres);

    res.send("Videogame created");
  }
};
//#endregion

//#region getVideogameById

const getVideogameById = async (req, res, next) => {
  const { id } = req.params;
  let videogame;
  if (isNaN(id)) {
    videogame = await Videogame.findByPk(id);
  } else {
    videogame = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    videogame = videogame.data;
    let mappedPlatforms = videogame.platforms.map((e) => e.platform.name)
    videogame = {
      name : videogame.name,
      description: videogame.description,
      released: videogame.released,
      rating: videogame.rating,
      platforms: mappedPlatforms,
      image: videogame.background_image
    }
  }
  return res.json(videogame);
};

//#endregion
module.exports = {
  getVideogame,
  addVideogame,
  getVideogameById,
};
