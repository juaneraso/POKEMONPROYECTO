import { useState } from "react";
import axios from "axios";

const Form = () => {

    const [form,setForm]= useState({
      name:"",
      image:"",
      hp:"",
      attack:"",
      defense:"",
      speed:"",
      height:"",
      weight:"",
      types:"" 

    })

//  const [errors,setErrors] = useState({
//      name:"",
//      image:"",
//      hp:"",
//      attack:"",
//      defense:"",
//      speed:"",
//      height:"",
//      weight:"",
//      types:"" 

//  })


    const changeHandler = (event) =>{
          // leer lo que escribi 
      const property = event.target.name ;
      const value = event.target.value;


      //validate({...form,[property]:value});
      setForm({...form,[property]:value});      

    }

    // const validate = (form) => {
    //  if   (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)){
    //       setErrors({...errors,email:""})


    //  } else{
    
    //       setErrors({...errors,email:"Hay un error en email"})
    //  }

    //   if(form.email ==="") setErrors({...errors,email:"Email vacio"})
    // }



     const submitHandler = (event) =>{
      event.preventDefault();
      axios.post("http://localhost:3001/pokemones",form)
      .then(res => alert(res))
      .catch(err=> alert(err))
      console.log(form);
     }

    return(
 
         <form onSubmit={submitHandler}>

           <div>
               <label>Name: </label>               
               <input type="text" value = {form.name} onChange ={changeHandler} name="name"/>
                 {/* {errors.email && <span>{errors.email}</span> } */}
           </div>
                 
           <div>
              <label>Imagen: </label>
              <input type="text" value = {form.image} onChange ={changeHandler}name="image"/>
           </div>          
                
           <div>
              <label>Salud: </label>
              <input type="number"value = {form.hp} onChange ={changeHandler}name="hp"/>
           </div>

           <div>
               <label>Ataque: </label>               
               <input type="number" value = {form.attack} onChange ={changeHandler} name="attack"/>

           </div>
                 
           <div>
              <label>Defensa: </label>
              <input type="number" value = {form.defense} onChange ={changeHandler}name="defense"/>
           </div>          
                
           <div>
              <label>Velocidad: </label>
              <input type="number"value = {form.speed} onChange ={changeHandler}name="speed"/>
           </div>

           <div>
               <label>Altura: </label>               
               <input type="number" value = {form.height} onChange ={changeHandler} name="height"/>
              
           </div>
                 
           <div>
              <label>Peso: </label>
              <input type="number" value = {form.weight} onChange ={changeHandler}name="weight"/>
           </div>          
                
           <div>
              <label>Tipo: </label>
              <input type="number" value = {form.types} onChange ={changeHandler}name="types"/>
           </div>



           
           <button type="submit">SUBMIT</button>
          
            
         </form>
 
 
    )
 
 }
 
 export default Form;