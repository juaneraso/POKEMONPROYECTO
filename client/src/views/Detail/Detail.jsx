import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { searchID } from "../../redux/actions";
import style from "./Detail.module.css";



const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const character = useSelector((state) => state.searchResultsId);
  const pokemones = character[0];
  

   
 //console.log(pokemones);

  useEffect(() => {
    dispatch(searchID(id));
  }, [dispatch, id]);

  return (
    <div className={style.detailContainer}> 
      <div className={style.detailStyle} key={pokemones?.id}>
      <img
            className={style.detailImage}
            src={pokemones?.image}
            alt={pokemones?.name}
           
          />
      <h1>Id: {pokemones?.id}</h1>
      {/* <h2> Name :{pokemones?.name}</h2> */}
      <h2> Name: {pokemones ? pokemones.name.charAt(0).toUpperCase() + pokemones.name.substring(1) : ''}</h2>
      <p>Salud : {pokemones?.hp}</p>
      <p>Ataque: {pokemones?.attack}</p>
      <p>Defensa: {pokemones?.defense}</p>
      <p>Velocidad: {pokemones?.speed}</p>
      <p>Altura: {pokemones?.height}</p>
      <p>Peso: {pokemones?.weight}</p>
      <p>Tipo: {pokemones?.types.join(', ')}</p> 
     </div>
   </div>

  );
};

export default Detail;