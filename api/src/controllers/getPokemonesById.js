const {Pokemon} = require('../db');
const axios = require("axios");

// const getPokemonesById = async(id) =>{
//  const pokemon = await Pokemon.findByPk(id);
//  return pokemon;
//await (axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data   
// }; https://jsonplaceholder.typicode.com/users 

 
const getPokemonesById = async (id,source) => {
    const pokemon = source === "api" ?
     (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
     .data       
    : await Pokemon.findByPk(id);
    return pokemon ; 

  }



module.exports = getPokemonesById;