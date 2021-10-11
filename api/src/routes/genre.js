const { Router } = require("express");
const {getGenres} = require('../controllers/genreController')


const router = Router();

//#region GET GENRES
router.get('/', getGenres)

  module.exports = router;