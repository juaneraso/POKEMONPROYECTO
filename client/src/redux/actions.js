//import axios from "axios";

export const GET_POKEMONES = "GET_POKEMONES";

export const getPokemones = () => {
  return async function (dispatch) {
    try {
      const response = await fetch("http://localhost:3001/pokemones");    
      
      const pokemones = await response.json();
      dispatch({ type: GET_POKEMONES, payload: pokemones });
    } catch (error) {
      // Manejo de error aquí, puedes dispatchear una acción de error si es necesario
      alert("Algo salio mal");
      console.log(error);
    }
  };
};




// export const getPokemones = () => {
//   return async function (dispatch) {
//     try {
//       const apiData = await axios.get("http://localhost:3001/pokemones");
//       const pokemones = apiData.data;
//       dispatch({ type: GET_POKEMONES, payload: pokemones });
//     } catch (error) {
//       // Manejo de error aquí, puedes dispatchear una acción de error si es necesario
     
//       alert("Algo salio mal");
//       console.log(error);
//     }
//   };
// };



// export const searchPokemones = (query) => {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(`http://localhost:3001/pokemones?name=${query}`);
//       console.log(response.data);
//       const searchResults = response.data;
//       dispatch({ type: SEARCH_POKEMONES, payload: searchResults });
//     } catch (error) {
//       // Manejo de error aquí
//       console.error("Error searching pokemones:", error);
//     }
//   };
// };
export const SEARCH_POKEMONES = "SEARCH_POKEMONES";
export const searchPokemones = (query) => {
  return async function (dispatch) {
    try {
      const response = await fetch(`http://localhost:3001/pokemones?name=${query}`);
      const responseData = await response.json();
     
      if(response.status === 404) {
        alert(responseData.error);

      } else if(response.status === 200){  
         
          const searchResults = responseData;
         
           dispatch({ type: SEARCH_POKEMONES, payload: searchResults });
      }
    } catch (error) {
      // Manejo de error aquí
      alert("Algo salio mal");
    }
  };
};




export const SEARCH_ID = "SEARCH_ID";

export const searchID = (id) => {
  return async function (dispatch) {
    try {
      const response = await fetch(`http://localhost:3001/pokemones/detail/${id}`); 
      
      const searchResultsId = await response.json();
      dispatch({ type: SEARCH_ID, payload: searchResultsId });
    } catch (error) {
      // Manejo de error aquí
      console.error("Error searching ID:", error);
    }
  };
};


// export const searchID = (id) => {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(`http://localhost:3001/pokemones/detail/${id}`);
//       const searchResultsId = response.data;
//       dispatch({ type: SEARCH_ID, payload: searchResultsId });
//     } catch (error) {
//       // Manejo de error aquí
//       console.error("Error searching ID:", error);
//     }
//   };
// };

export const CLEAN_SEARCH = "CLEAN_SEARCH";

export const cleanSearch = () => {
  return {
    type: CLEAN_SEARCH
  }
}



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