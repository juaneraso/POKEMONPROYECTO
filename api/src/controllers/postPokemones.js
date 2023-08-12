const {Pokemon} = require('../db');

const postPokemones = async(name,image,hp,attack,defense,speed,height,weight,types) =>{
    
    const newPokemon = await Pokemon.create({name,image,hp,attack,defense,speed,height,weight});
    
    newPokemon.addTypes(types);
    return newPokemon;
        
        };
    
    module.exports = postPokemones ; 