const {Pokemon} = require('../db');

const postPokemones = async(name,imagen,vida,ataque,defensa,velocidad,altura,peso) =>{

    const newPokemon = await Pokemon.create({name,imagen,vida,ataque,defensa,velocidad,altura,peso});
    return newPokemon;
        
    };
    
    module.exports = postPokemones ;