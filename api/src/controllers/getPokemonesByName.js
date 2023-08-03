const {Pokemon} = require('../db');
const axios = require("axios");


const buscarPokemonByName = async (name) => {
   const pokemones = await Pokemon.findAll({where:{name : name}}) 
  

}