const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getVideogame, addVideogame, getGenres, getVideogameById } = require('../controllers/videogameController');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", getVideogame);
router.get("/genres", getGenres);
router.get("/:id", getVideogameById);
router.post("/add", addVideogame);

module.exports = router;