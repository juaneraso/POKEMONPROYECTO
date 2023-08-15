const {Pokemon,Type} = require('../db');
const axios = require("axios");
//const Type = require('../models/Type');


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
    attack:elem.attack,
    defense:elem.defense,
    speed:elem.speed,
    height:elem.height,
    weight:elem.weight,
    types:elem.types,
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
  

  //const pokemones = await Pokemon.findAll({ where: { name: nameMinuscula } });
  const pokemones = await Pokemon.findAll({
    where: { name: nameMinuscula },
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });


  const cleanArray3 = (arr)=> 
  arr.map((elem) => {
    return { 
    id : elem.id,
    name:elem.name,
    image:elem.image,
    hp: elem.hp,
    attack:elem.attack,
    defense:elem.defense,
    speed:elem.speed,
    height:elem.height,
    weight:elem.weight,
    types: elem.types.map(type => type.name),
    created:false,
    };

  }); 

  const pokemonesBuenos2 = cleanArray3(pokemones);


  if (pokemones.length > 0) {
    // Si el Pokémon existe en la base de datos, devuelve directamente el resultado de la base de datos
    return pokemonesBuenos2;

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
      const pokemonTypes = pokemonDetails.types.map(typeInfo => typeInfo.type.name);
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
      types : pokemonTypes

     }
     const apiPokemon = cleanArray([apiPokemones]);
     return apiPokemon;


      



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

  const pokemones = await Pokemon.findAll({
   include:{
    model: Type,
    attributes:["name"],
    through:{
     attributes:[],

    }

   },


  });     

  const formattedPokemones = pokemones.map(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      height: pokemon.height,
      weight: pokemon.weight,
      created: pokemon.created,
      types: pokemon.types.map(type => type.name),
    };
  });
  
 // return formattedPokemones;
 
  
  const apiResponse = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=36");  
  const pokemonList = apiResponse.data.results;

  const allPokemonInfo = await Promise.all(

    pokemonList.map(async (pokemon) => {
      const detailResponse = await axios.get(pokemon.url);
      const { id, name, sprites, stats, height, weight,types} = detailResponse.data;
      const hp = stats.find(stat => stat.stat.name === 'hp').base_stat;
      const attack = stats.find(stat => stat.stat.name === 'attack').base_stat;
      const defense = stats.find(stat => stat.stat.name === 'defense').base_stat;
      const speed = stats.find(stat => stat.stat.name === 'speed').base_stat;
      const pokemonTypes = types.map(typeInfo => typeInfo.type.name);
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
        types : pokemonTypes
    
      };
    })
  );
    
 const apiPokemones = cleanArray(allPokemonInfo);

  return[...formattedPokemones,...apiPokemones];
  
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
 console.log(id1);
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
  const pokemonTypes = pokemonDetails.types.map(typeInfo => typeInfo.type.name);

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
  types : pokemonTypes

 }
 const apiPokemon = cleanArray([apiPokemones]);
 return apiPokemon;

  }


  else {  
    
    //const pokemonesBase =  await Pokemon.findByPk(id1);
    const pokemonesBase = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const cleanArray2 = (arr)=> 
    arr.map((elem) => {
      return { 
      id : elem.id,
      name:elem.name,
      image:elem.image,
      hp: elem.hp,
      attack:elem.attack,
      defense:elem.defense,
      speed:elem.speed,
      height:elem.height,
      weight:elem.weight,
      types: elem.types.map(type => type.name),
      created:false,
      };
  
    });


    
   const pokemonesBuenos = cleanArray2([pokemonesBase]);
   
    
    
    return pokemonesBuenos } 
  
      //return pokemon ; 
  


    // Si el Pokémon no está en la base de datos, hace una solicitud a la API de Pokémon para obtenerlo
 

};


 
module.exports  = {getPokemones, getPokemonByName,getPokemonesById};

