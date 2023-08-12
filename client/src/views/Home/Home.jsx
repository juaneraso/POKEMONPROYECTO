import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemones } from "../../redux/actions";

const Home = () => {
    
  const dispatch  = useDispatch();
  // cuando se monta , que haga el dispatch 
  // useEffect()  - useDispatch()  
   useEffect(()=>{
    dispatch(getPokemones())

   },[dispatch])
    

   return(

        <>
          <h1>Esta es la vista de Home</h1>
          <CardsContainer/>
           
        </>


   )

}

export default Home;