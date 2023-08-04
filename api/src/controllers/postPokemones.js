const {Pokemon} = require('../db');

const postPokemones = async(name,image,hp,atack,defense,speed,height,weight) =>{

    const newPokemon = await Pokemon.create({name,image,hp,atack,defense,speed,height,weight});
    return newPokemon;
        
    };
    
    module.exports = postPokemones ; 