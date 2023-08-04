const {Pokemon} = require('../db');
const axios = require("axios");


// const getPokemones = async () => {
//   const pokemones = await Pokemon.findAll();
//   return pokemones;
// };

const cleanArray = (arr)=> 
  arr.map((elem) => {
    return { 
    id : elem.id,
    name:elem.name,
    image:elem.image,
    hp: elem.hp,
    atack:elem.atack,
    defense:elem.defense,
    speed:elem.speed,
    height:elem.height,
    weight:elem.weight,
    created:false,
    };

  });


const getPokemonByName = async (name) => {
  
  const pokemones = await Pokemon.findAll({ where: { name: name } });

  if (pokemones.length > 0) {
    // Si el Pokémon existe en la base de datos, devuelve directamente el resultado de la base de datos
    return pokemones;
  } else {
    // Si el Pokémon no está en la base de datos, hace una solicitud a la API de Pokémon para obtenerlo
    try {
      const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const apiPokemon = cleanArray([apiResponse.data]);
      return apiPokemon;
    } catch (error) {
      // Si ocurre un error al hacer la solicitud a la API, devuelve un array vacío
      console.error('Error al obtener el Pokémon de la API:', error.message);
      return [];
    }
  }
};


 const getPokemones = async () => {
   const pokemones = await Pokemon.findAll();   
   const apiResponse = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=30");  
   const apiPokemonesRaw = apiResponse.data.results;

  const apiPokemones = cleanArray(apiPokemonesRaw);

   return[...pokemones,...apiPokemones];
   
 };




module.exports  = {getPokemones, getPokemonByName};