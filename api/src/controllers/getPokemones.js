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


// const getPokemonByName = async (name) => {
//   const nameMinuscula = name.toLowerCase(); ;

//   const pokemones = await Pokemon.findAll({ where: { name: nameMinuscula } });
  
//   console.log(typeof(name));

//   if (pokemones.length > 0) {
//     // Si el Pokémon existe en la base de datos, devuelve directamente el resultado de la base de datos
//     return pokemones;
//   } else {
//     // Si el Pokémon no está en la base de datos, hace una solicitud a la API de Pokémon para obtenerlo
//     try {
//       const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameMinuscula}`);
//       const apiPokemon = cleanArray([apiResponse.data]);
//       return apiPokemon;
//     } catch (error) {
//       // Si ocurre un error al hacer la solicitud a la API, devuelve un array vacío
//       console.error('Error al obtener el Pokémon de la API:', error.message);
//       return [];
//     }
//   }
// };


const getPokemonByName = async (name) => {
  const nameMinuscula = name.toLowerCase(); ;

  const pokemones = await Pokemon.findAll({ where: { name: nameMinuscula } });
 

  if (pokemones.length > 0) {
    // Si el Pokémon existe en la base de datos, devuelve directamente el resultado de la base de datos
    return pokemones;
  } else {
    // Si el Pokémon no está en la base de datos, hace una solicitud a la API de Pokémon para obtenerlo
    try {
      const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameMinuscula}`);
           
      const pokemonDetails = apiResponse.data;     
           

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

     const apiPokemones = {
      id,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,


     }
     const apiPokemon = cleanArray([apiPokemones]);


      



    } catch (error) {
      // Si ocurre un error al hacer la solicitud a la API, devuelve un array vacío
      console.error('Error al obtener el Pokémon de la API:', error.message);
      return [];
    }
  }
};


//  const getPokemones = async () => {
//    const pokemones = await Pokemon.findAll();      
//    const apiResponse = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=30");  
//    const apiPokemonesRaw = apiResponse.data.results;

//   const apiPokemones = cleanArray(apiPokemonesRaw);

//    return[...pokemones,...apiPokemones];
   
//  };


 const getPokemones = async () => {

  const pokemones = await Pokemon.findAll();      
  const apiResponse = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=30");  
  const pokemonList = apiResponse.data.results;

  const allPokemonInfo = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const detailResponse = await axios.get(pokemon.url);
      const { id, name, sprites, stats, height, weight } = detailResponse.data;
      const hp = stats.find(stat => stat.stat.name === 'hp').base_stat;
      const attack = stats.find(stat => stat.stat.name === 'attack').base_stat;
      const defense = stats.find(stat => stat.stat.name === 'defense').base_stat;
      const speed = stats.find(stat => stat.stat.name === 'speed').base_stat;

      return {
        id,
        name,
        image: sprites.front_default,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
      };
    })
  );
    
 const apiPokemones = cleanArray(allPokemonInfo);

  return[...pokemones,...apiPokemones];
  
};


// const getPokemonesById = async (id,source) => {

//   const pokemon = source === "api" ?
//    (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
//    .data       
//   : await Pokemon.findByPk(id);

//   return pokemon ; 

// }


const getPokemonesById = async (id,source) => {
  const id1 = id ; 
 
  if (source === "api") {   

  const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id1}`);
           
  const pokemonDetails = apiResponse.data;     
       

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

 const apiPokemones = {
  id,
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,


 }
 const apiPokemon = cleanArray([apiPokemones]);
 return apiPokemon;

  }

  else {   return await Pokemon.findByPk(id1) } 
  
      //return pokemon ; 
  


    // Si el Pokémon no está en la base de datos, hace una solicitud a la API de Pokémon para obtenerlo
 

};


 
module.exports  = {getPokemones, getPokemonByName,getPokemonesById};



