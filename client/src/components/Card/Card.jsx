import style from "./Card.module.css";

const Card = (props) => {
   console.log(props);
    return(

      <div className={style.card}  >
           <p>Nombre:{props.name}</p>          
           <img src={props.image} alt='' style={{ width: '100px', height: '100px' }} />          
           <p>Tipos: {props.types.join(', ')}</p>
      </div>


    )

}
export default Card;