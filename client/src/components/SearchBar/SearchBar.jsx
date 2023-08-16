import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import { getPokemones, searchPokemones } from "../../redux/actions";
import  style from "./Searchbar.module.css";
//import { useNavigate } from "react-router-dom"

import { searchPokemones, cleanSearch} from "../../redux/actions";


const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  
  

  const handleSearch = (event) => {
   
    event.preventDefault();
    dispatch(searchPokemones(query)); // Pasar la consulta actual


  };

  const handleBackToAll = (event) => {
    event.preventDefault(); 
    dispatch(cleanSearch()); // 
    
  };

  return (

    <div className={style.searchbar}>
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Buscar</button>     

     
      <button type="button" onClick={handleBackToAll}>
          Volver a todos los Pokémones
        </button>
      
        

    </form>

      

    </div>
  );
};

export default SearchBar;