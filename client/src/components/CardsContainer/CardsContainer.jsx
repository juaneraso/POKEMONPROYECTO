import { useSelector } from "react-redux"
import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
const CardsContainer = () => {

 const pokemones = useSelector(state=>state.pokemones);

    return(

      <div className={style.container}>
         {pokemones.map(pokemon => {

            return <Card
                 id = {pokemon.id}
                 name = {pokemon.name}
                 image = {pokemon.image}               
                 types = {pokemon.types}          
                            
            
            />
         })}
      </div>


    )

}
export default CardsContainer;