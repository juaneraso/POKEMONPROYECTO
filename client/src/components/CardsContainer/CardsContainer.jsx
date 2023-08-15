import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useState } from "react";


const CardsContainer = () => {

 const pokemones = useSelector(state=>state.pokemones);
 const searchResults = useSelector((state) => state.searchResults);


 const [selectedType, setSelectedType] = useState(null);
 const [showCreated, setShowCreated] = useState("all");
 const [sortOrder, setSortOrder] = useState("default");
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 12;

 const startIndex = (currentPage - 1) * itemsPerPage;
 const endIndex = startIndex + itemsPerPage;

 const combinedData = searchResults.length > 0 ? searchResults : pokemones;

 const types = ["normal","fighting","flying","poison","ground","rock","bug",
                "ghost","steel","fire","water","grass","electric","psychic",
                "ice","dragon","dark","fairy","unknow","shadow"];



 const getFilteredAndSortedData = () => {
   const filteredData = combinedData.filter((pokemon) => {
     const typeFilter = !selectedType || pokemon.types.includes(selectedType);
     //const createdFilter = showCreated === "all" || pokemon.created === showCreated;
     //const createdFilter = showCreated === "all" ? true : showCreated === false;
     const createdFilter = showCreated === "all" || pokemon.created === (showCreated === "true");

     return typeFilter && createdFilter;
   });


   


   switch (sortOrder) {
     case "nameAsc":
       return filteredData.slice().sort((a, b) => a.name.localeCompare(b.name));
     case "nameDesc":
       return filteredData.slice().sort((a, b) => b.name.localeCompare(a.name));
     case "AtaqueAsc":
       return filteredData.slice().sort((a, b) => a.attack - b.attack);
     case "AtaqueDesc":
       return filteredData.slice().sort((a, b) => b.attack - a.attack);
     default:
       return filteredData;
   }
 };
 
 const filteredAndSortedData = getFilteredAndSortedData();

 //console.log(combinedData);
 
 
    return(

      <div className={style.container}>

         <button onClick={() => setSortOrder("default")}>Orden original</button>
         <button onClick={() => setSortOrder("nameAsc")}>Nombre A-Z</button>
         <button onClick={() => setSortOrder("nameDesc")}>Nombre Z-A</button>
         <button onClick={() => setSortOrder("AtaqueAsc")}>Ataque ascendente</button>
         <button onClick={() => setSortOrder("AtaqueDesc")}>Ataque descendente</button>



         <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType || ""}>
        <option value="">Mostrar todos</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {capitalizeFirstLetter(type)}
          </option>
        ))}
      </select>

      <select onChange={(e) => setShowCreated(e.target.value)} value={showCreated}>
        <option value="all">Mostrar todos</option>
        <option value={true}>Creados</option>
        <option value={false}>No Creados</option>
      </select>


         {/* <button onClick={() => setSelectedType("grass")}>Planta</button>
         <button onClick={() => setSelectedType("fire")}>Fuego</button>
         <button onClick={() => {setShowCreated("all");
                                 setSelectedType(null)}  
                                              }>Mostrar todos</button>
         <button onClick={() => setShowCreated(true)}>Creados</button>
         <button onClick={() => setShowCreated(false)}>No Creados</button> */}

       <div className={style.cards}>
  
        {filteredAndSortedData.slice(startIndex, endIndex).map(pokemon => {
  
         return <Card
          key={pokemon.id}
          id = {pokemon.id}
          name = {pokemon.name}
          image = {pokemon.image}               
          types = {pokemon.types}
          attack = {pokemon.attack}
          created = {pokemon.created}
          
          
                                 
           />
          })}

            </div>
    
           <div className={style.pagination}>
                       <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                         Anterior
                       </button>
                       <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= filteredAndSortedData.length}>
                         Siguiente
                       </button>
                </div>


    
      </div>


    )

}
export default CardsContainer;


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}