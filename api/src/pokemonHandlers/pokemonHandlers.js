const {getPokemones,getPokemonByName,getPokemonesById} = require("../controllers/getPokemones");
const postPokemones = require("../controllers/postPokemones");
//const getPokemonesById = require("../controllers/getPokemonesById");
const getPokemonDetails = require("../controllers/getPokemonDetails");
const getPokemonTypes = require("../controllers/getPokemonTypes");
const getTypesInterno = require("../controllers/getPokemonTypesInterno");


const getPokemonHandler = async (req,res) => {
   const {name} = req.query ;
   const results = name ? await getPokemonByName(name) : await getPokemones();
   if(results.error){

     return res.status(404).json(results);
   }
   return  res.status(200).json(results);

};

const postPokemonHandler = async (req,res) => {
  
   try {
      const {name,image,hp,attack,defense,speed,height,weight,types} = req.body;  //desestructuro datos del body 
      const nameMinuscula = name.toLowerCase(); //convierto el nombre a minuscula

      const  newPokemon = await postPokemones(nameMinuscula,image,hp,attack,defense,speed,height,weight,types); 
      res.status(201).json(newPokemon); 
   }catch(error){

     res.status(400).json({error:error.message});
   }

};

const getPokemonesByIdHandler = async (req,res) => {

   const {id} = req.params;          //obtengo la id
   const source = isNaN(id) ? "bdd" : "api" ;  // si no es numerica busca en la bd

   try {     
      const pokemones = await getPokemonesById(id,source); 
      res.status(200).json(pokemones); 
   }catch(error){

     res.status(400).json({error:error.message});
   }

};


// Otros handlers utilizados para debug 


const getPokemonDetailsHandler = async (req,res) => {
   const {name} = req.query ;
   
   //const nameMinuscula = name.toLowerCase();
 

   const results =  await getPokemonDetails(name);
   res.status(200).json(results);
};

const getTypesInternoHandler = async (req,res) => {
   
   const typesInterno =  await getTypesInterno();
   res.status(200).json(typesInterno);
};

 




 




 
 const getPokemonTypesHandler = async (req,res) => {
   //const {type} = req.query ;
   try{
      const types = await getPokemonTypes();  
      res.status(200).json(types);
   
   }catch(error){
      res.status(400).json({error:error.message});
   }
    
};



 module.exports = {
    getPokemonHandler, 
    postPokemonHandler,
    getPokemonesByIdHandler,
    getPokemonDetailsHandler,
    getPokemonTypesHandler,
    getTypesInternoHandler
   
 }