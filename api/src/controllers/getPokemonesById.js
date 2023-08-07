const {Pokemon} = require('../db');
const axios = require("axios");



const getPokemonesById = async (id,source) => {
    const pokemon = source === "api" ?
     (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
     .data       
    : await Pokemon.findByPk(id);
    return pokemon ; 

  }
  

// const pokemonName = 'pikachu';
// axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//   .then(response => {
//     const speed = response.data.stats.find(stat => stat.stat.name === 'speed').base_stat;
//     console.log(`La velocidad de ${pokemonName} es: ${speed}`);
//   })
//   .catch(error => console.error('Error:', error));




  




module.exports = getPokemonesById;