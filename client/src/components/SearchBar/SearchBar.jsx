import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { searchPokemones } from "../../redux/actions";
//import { getPokemones } from "../../redux/actions";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
   
    event.preventDefault();
    dispatch(searchPokemones(query)); // Pasar la consulta actual


  };

  const handleBackToAll = () => {
    
    dispatch(searchPokemones("")); // Restablecer la búsqueda a vacío
  };

  return (
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
  );
};

export default SearchBar;