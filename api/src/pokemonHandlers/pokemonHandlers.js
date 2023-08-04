const {getPokemones,getPokemonByName} = require("../controllers/getPokemones");
const postPokemones = require("../controllers/postPokemones");
const getPokemonesById = require("../controllers/getPokemonesById");
const getPokemonDetails = require("../controllers/getPokemonDetails");


const getPokemonDetailsHandler = async (req,res) => {
   const {name} = req.query ;
   const results =  await getPokemonDetails(name);
   res.status(200).json(results);
};



 
const getPokemonHandler = async (req,res) => {
    const {name} = req.query ;
    const results = name ? await getPokemonByName(name) : await getPokemones();
    res.status(200).json(results);
 };


 const postPokemonHandler = async (req,res) => {
  
    try {
       const {name,image,hp,atack,defense,speed,height,weight} = req.body;
       const  newPokemon = await postPokemones(name,image,hp,atack,defense,speed,height,weight); 
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
 



 module.exports = {
    getPokemonHandler, 
    postPokemonHandler,
    getPokemonesByIdHandler,
    getPokemonDetailsHandler
   
 }