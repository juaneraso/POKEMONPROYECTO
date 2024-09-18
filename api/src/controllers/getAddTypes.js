const { Type } = require("../db");
const axios = require("axios");

const getAddTypes = async () => {
  const types = await getPokemonTypes();

  if (types.length === 0) {
    console.log("No se encontraron tipos de pokémon.");
    return;
  }

  try {
    // Utiliza el método bulkCreate() para guardar los tipos en la base de datos

    const typeObjects = types.map((name) => ({ name }));
    console.log(typeObjects);

    await Type.bulkCreate(typeObjects);
    console.log(
      "Tipos de pokémon guardados en la base de datos correctamente."
    );

    return typeObjects;
  } catch (error) {
    console.error(
      "Error al guardar los tipos de pokémon en la base de datos:",
      error.message
    );
  }
};

const getPokemonTypes = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type/");
    const typesOfPokemon = response.data.results.map((type) => type.name);

    //console.log(typesOfPokemon);
    return typesOfPokemon;
  } catch (error) {
    console.error("Error al obtener los tipos de Pokémon:", error.message);
    return [];
  }
};

// Llamar a la función para guardar los tipos de pokémon en la base de datos

//getAddTypes();

module.exports = getAddTypes;
