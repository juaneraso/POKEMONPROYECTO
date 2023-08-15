import style from "./Card.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Card = (props) => {

let creado = 'true' ; 

if(props.created === true ){
creado = 'true'

}else{
   creado = 'false'
}


   return(
     
     
      <div className={style.card}  >
        <Link to={`/detail/${props.id}`}>
           <p>Nombre:{props.name}</p>      
           </Link>    
           <img src={props.image} alt='' style={{ width: '100px', height: '100px' }} />          
             <p>Tipos: {props.types.join(', ')}</p>
             <p>Ataque:{props.attack}</p>
             <p>Creado:{creado}</p>
      </div>


    )

}
export default Card;