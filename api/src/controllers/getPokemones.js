const { Pokemon, Type } = require('../db');
// const Type = require('../models/Type');

const cleanArray = (arr) => 
  arr.map((elem) => {
    return { 
      id: elem.id,
      name: elem.name,
      image: elem.image,
      hp: elem.hp,
      attack: elem.attack,
      defense: elem.defense,
      speed: elem.speed,
      height: elem.height,
      weight: elem.weight,
      types: elem.types,
      created: false,
    };
  });

const getPokemonByName = async (name) => {
  const nameMinuscula = name.toLowerCase();

  const pokemones = await Pokemon.findAll({
    where: { name: nameMinuscula },
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  const cleanArray3 = (arr) => 
    arr.map((elem) => {
      return { 
        id: elem.id,
        name: elem.name,
        image: elem.image,
        hp: elem.hp,
        attack: elem.attack,
        defense: elem.defense,
        speed: elem.speed,
        height: elem.height,
        weight: elem.weight,
        types: elem.types.map(type => type.name),
        created: false,
      };
    });

  const pokemonesBuenos2 = cleanArray3(pokemones);

  if (pokemones.length > 0) {
    return pokemonesBuenos2;
  } else {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameMinuscula}`);
   
      
      const pokemonDetails = await response.json();      
      const id = pokemonDetails.id;
      const name = pokemonDetails.name;
      const image = pokemonDetails.sprites.front_default;
      const hp = pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat;
      const attack = pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat;
      const defense = pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat;
      const speed = pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat;
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
        types: pokemonTypes,
      };
      
      const apiPokemon = cleanArray([apiPokemones]);
      return apiPokemon;
    } catch (error) {
      console.error('Error al obtener el Pokémon de la API:', error.message);
      return { error: 'Pokemon no encontrado' };
    }
  }
};

const getPokemones = async () => {
  const pokemones = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      },
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

  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=36");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const pokemonList = await response.json();

    const allPokemonInfo = await Promise.all(
      pokemonList.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        if (!detailResponse.ok) {
          throw new Error(`HTTP error! Status: ${detailResponse.status}`);
        }
        const { id, name, sprites, stats, height, weight, types } = await detailResponse.json();
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
          types: pokemonTypes,
        };
      })
    );

    const apiPokemones = cleanArray(allPokemonInfo);

    return [...formattedPokemones, ...apiPokemones];
  } catch (error) {
    console.error('Error al obtener los Pokémon de la API:', error.message);
    return formattedPokemones;
  }
};

const getPokemonesById = async (id, source) => {
  const id1 = id;

  if (source === 'api') {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id1}`);
   

      const pokemonDetails = await response.json();

      const id = pokemonDetails.id;
      const name = pokemonDetails.name;
      const image = pokemonDetails.sprites.front_default;
      const hp = pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat;
      const attack = pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat;
      const defense = pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat;
      const speed = pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat;
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
        types: pokemonTypes,
      };

      const apiPokemon = cleanArray([apiPokemones]);
      return apiPokemon;
    } catch (error) {
      console.error('Error al obtener el Pokémon de la API:', error.message);
      return { error: 'Pokemon no encontrado' };
    }
  } else {
    try {
      const pokemonesBase = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      });

      const cleanArray2 = (arr) => 
        arr.map((elem) => {
          return { 
            id: elem.id,
            name: elem.name,
            image: elem.image,
            hp: elem.hp,
            attack: elem.attack,
            defense: elem.defense,
            speed: elem.speed,
            height: elem.height,
            weight: elem.weight,
            types: elem.types.map(type => type.name),
            created: false,
          };
        });

      const pokemonesBuenos = cleanArray2([pokemonesBase]);

      return pokemonesBuenos;
    } catch (error) {
      console.error('Error al obtener el Pokémon de la base de datos:', error.message);
      return { error: 'Pokemon no encontrado' };
    }
  }
};

module.exports = { getPokemones, getPokemonByName, getPokemonesById };
