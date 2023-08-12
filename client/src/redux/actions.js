import axios from "axios";

export const GET_POKEMONES = "GET_POKEMONES";

export const getPokemones = () =>{
   return async function(dispatch){
     const apiData = await axios.get(
        "http://localhost:3001/pokemones"
        );
     const pokemones = apiData.data;
     dispatch({type : GET_POKEMONES, payload:pokemones});
   }; 
};

// export  const getPokemon = (id) =>{
//     return async function (dispatch){
//       const apidData = await axios.get(
//        `https://jsonplaceholder.typicode.com/users/${id}`
//       );
//       const pokemon = apidData.data;
//       dispatch({type:"GET_POKEMON",payload:pokemon});

//     }; 

// };

// export const filterBySource = () => {
//   dispatch({type: "FILTER_BY_SOURCE"});


// };