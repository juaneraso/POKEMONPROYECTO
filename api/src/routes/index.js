const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const {getPokemonHandler,postPokemonHandler,getPokemonesByIdHandler,getPokemonDetailsHandler,getPokemonTypesHandler,getTypesInternoHandler} = require("../pokemonHandlers/pokemonHandlers");

router.get('/pokemones',getPokemonHandler);
router.post('/pokemones',postPokemonHandler);
router.get('/pokemones/detail/:id',getPokemonesByIdHandler);

//Rutas opcionales 
router.get('/pokemones/detail',getPokemonDetailsHandler);
router.get('/pokemon/types',getPokemonTypesHandler);
router.get('/poke/typesinter',getTypesInternoHandler);

module.exports = router;
