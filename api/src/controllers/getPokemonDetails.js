const {Pokemon} = require('../db');
const axios = require('axios');

const getPokemonDetails = async (pokemonName) => {

  const pokemones = await Pokemon.findAll({ where: { name : pokemonName} });

  if (pokemones.length > 0) {
    // Si el Pokémon existe en la base de datos, devuelve directamente el resultado de la base de datos
    return pokemones;
  } 

  else {   

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonDetails = response.data;

    // Aquí puedes acceder a todos los atributos del Pokémon en el objeto "pokemonDetails"
    // Por ejemplo:
    const id = pokemonDetails.id;
    const name = pokemonDetails.name;
    const image= pokemonDetails.sprites.front_default;
    const hp = pokemonDetails.stats.find((stat) => stat.stat.name === 'hp').base_stat;
    const attack = pokemonDetails.stats.find((stat) => stat.stat.name === 'attack').base_stat;
    const defense = pokemonDetails.stats.find((stat) => stat.stat.name === 'defense').base_stat;
    const speed = pokemonDetails.stats.find((stat) => stat.stat.name === 'speed').base_stat;
    const height = pokemonDetails.height;
    const weight = pokemonDetails.weight;

    // Puedes hacer cualquier otra operación con los atributos del Pokémon aquí

    // Finalmente, devuelves un objeto con todos los atributos del Pokémon
    return {
      id,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    };
  } catch (error) {
    console.error('Error al obtener los detalles del Pokémon:', error.message);
    return null;
  }
 }
};


module.exports = getPokemonDetails ;