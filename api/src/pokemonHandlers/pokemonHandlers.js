const getPokemones = require("../controllers/getPokemones");
const postPokemones = require("../controllers/postPokemones");
const getPokemonesById = require("../controllers/getPokemonesById");


const getPokemonHandler = async (req,res) => {
    try {
       const pokemones = await getPokemones(); 
       res.status(200).json(pokemones); 
    }catch(error){
 
      res.status(500).json({error:error.message});
    }
 
 };
 
 const postPokemonHandler = async (req,res) => {
  
    try {
       const {name,imagen,vida,ataque,defensa,velocidad,altura,peso} = req.body;
       const  newPokemon = await postPokemones(name,imagen,vida,ataque,defensa,velocidad,altura,peso); 
       res.status(201).json(newPokemon); 
    }catch(error){
 
      res.status(400).json({error:error.message});
    }
 
 };

 const getPokemonesByIdHandler = async (req,res) => {

    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api" ;

    try {     
       const pokemones = await getPokemonesById(id,source); 
       res.status(200).json(pokemones); 
    }catch(error){
 
      res.status(400).json({error:error.message});
    }
 
 };
 
 const getPokemonesByNameHandler = async (req,res) => {

   const {name} = req.query;
    buscarPokemonByName(name);
  
   try {     
      const pokemones = await getPokemonesById(id,source); 
      res.status(200).json(pokemones); 
   }catch(error){

     res.status(400).json({error:error.message});
   }

};




 module.exports = {
    getPokemonHandler, 
    postPokemonHandler,
    getPokemonesByIdHandler,
    getPokemonesByNameHandler
 }