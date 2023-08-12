const {Type} = require('../db');
const axios = require('axios');


const getPokemonTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type/');
      const typesOfPokemon = response.data.results.map((type) => type.name);
    
      //console.log(typesOfPokemon);
      return typesOfPokemon;
    } catch (error) {
      console.error('Error al obtener los tipos de Pokémon:', error.message);
      return [];
    }
  };



  // const saveTypesToDatabase = async () => {
  //   const types = await getPokemonTypes();
  
  //   if (types.length === 0) {
  //     console.log('No se encontraron tipos de pokémon.');
  //     return;
  //   }
  
  //   try {
  //     // Utiliza el método bulkCreate() para guardar los tipos en la base de datos
           
      
  //     const typeObjects = types.map((name) => ({ name }));
  //     console.log(typeObjects);

  //     await Type.bulkCreate(typeObjects);
  //     console.log('Tipos de pokémon guardados en la base de datos correctamente.');
  //   } catch (error) {
  //     console.error('Error al guardar los tipos de pokémon en la base de datos:', error.message);
  //   }
  // };
  
  // // Llamar a la función para guardar los tipos de pokémon en la base de datos


  // saveTypesToDatabase();


/*********************** */



// Para solo un registro 
  
  // const saveTypeToDatabase = async (typeName) => {
  //   try {
  //     // Utiliza el método create() del modelo Type para guardar el tipo en la base de datos
  //     await Type.create({ name: "Fuego" });

  //     console.log(`Tipo "${typeName}" guardado en la base de datos correctamente.`);
  //   } catch (error) {
  //     console.error('Error al guardar el tipo en la base de datos:', error.message);
  //   }
  // };
  // const typeName = 'Fuego';
  // saveTypeToDatabase(typeName);






  
module.exports = getPokemonTypes;