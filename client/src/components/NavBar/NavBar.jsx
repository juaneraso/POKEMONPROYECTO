import {Link} from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () =>{
   return(
    <div className={style.mainContainer}>
      <Link to ="/home"  className = {style.navLink} >HOME</Link>
      <Link to = "/create" className = {style.navLink} >FORM</Link>

    </div>

   )

}

   export default  NavBar;