const {Pokemon} = require('../db');

const getPokemones = async () => {
  const pokemones = await Pokemon.findAll();
  return pokemones;
};


module.exports  = getPokemones; 