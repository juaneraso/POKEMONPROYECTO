import React from "react";
import style from "./Landing.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const Landing = () => {
    return(
 
         <div className={style.container}>
          
           <img className={style.backgroundImage}           
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