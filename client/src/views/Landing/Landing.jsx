import React from "react";
import style from "./Landing.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const Landing = () => {
    return(
 
         <div className={style.container}>
          
           <img className={style.backgroundImage}
            //src="https://media4.giphy.com/media/MY0gDeYdOs8DzfSPFo/giphy.gif?cid=ecf05e47a8ey9m3air6zkk1a5o88ljge26np6ef7rdj742ex&ep=v1_gifs_related&rid=giphy.gif&ct=g"
            src = "https://i.makeagif.com/media/1-24-2015/w03MFY.gif"
            alt="landing"
           
          />
           <h1 className={style.heading}>Bienvenido al proyecto Pokemon</h1>

         <Link to= "/home"> 
          <button  className={style.centeredButton} >INGRESAR</button>
          </Link>
               
         </div>
 
 
    )
 
 }
 
 export default Landing;