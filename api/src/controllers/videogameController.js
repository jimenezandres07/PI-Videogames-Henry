const { Videogame, Genre, Op } = require("../db");
const { Router } = require("express");
require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

//#region GET VIDEOGAME
async function getVideogame(req, res, next) {
  try {
    let { order, page, name, rating, origin } = req.query;
    page = page ? page : 1;
    let vidXpage = 15;
    let videogames = [];
    let dbVideogame = await Videogame.findAll();
    //#region NAME
    if (name && name !== "") {
      let apiSearchVid = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
        )
      ).data.results;
      let dbSearchVid = await Videogame.findAll({
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
      dbSearchVid = dbSearchVid.map((e) => e.dataValues);
      videogames = dbSearchVid.concat(apiSearchVid);
      console.log(videogames);
      //#endregion
    } else {
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

      videogames = dbVideogame.concat(
        apiVideogames,
        apiVideogames1,
        apiVideogames2
      );
    }

    //#region ORIGIN
    if (origin === "created") {
      videogames = videogames.filter((vg) => vg.createdDb);
    } else {
      videogames = videogames.filter((vg) => !vg.createdDb);
    }
    //origin === 'created' ? videogames.filter(vg => vg.createdDb) : videogames.filter(vg => !vg.createdDb)
    //#endregion

    //#region RATING

    if (rating === "increment" && rating === "") {
      videogames = videogames.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    }
    if (rating === "decrement") {
      videogames = videogames.sort((a, b) => (a.rating < b.rating ? -1 : 1));
    }

    //#endregion

    //#region ORDER

    if (order === "asc") {
      videogames = videogames.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
    }
    if (order === "desc") {
      videogames = videogames.sort((a, b) => {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      });
    }
    //#endregion

    //#region PAGE

    let result = videogames.slice(
      vidXpage * (page - 1),
      vidXpage * (page - 1) + vidXpage
    );

    //#endregion
    return res.send({
      result: result,
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
      createdDb: true,
    });

    let dbGenres = await Genre.findAll({
      where: {
        name: {
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
  }
  return res.json(videogame);
};

//#endregion
module.exports = {
  getVideogame,
  addVideogame,
  getVideogameById,
};
