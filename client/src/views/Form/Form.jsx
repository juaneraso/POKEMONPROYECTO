import { useState } from "react";
import axios from "axios";
import style from "./Form.module.css"

const Form = () => {

  const types = [
    { name: "Normal", value: 1 },
    { name: "Fighting", value: 2 },
    { name: "Flying", value: 3},
    { name: "Poison", value: 4},
    { name: "Ground", value: 5},
    { name: "Rock", value: 6},
    { name: "Bug", value: 7},
    { name: "Ghost", value: 8},
    { name: "Steel", value: 9},
    { name: "Fire", value: 10},
    { name: "Water", value: 11},
    { name: "Grass", value: 12},
    { name: "Electric", value:13},
    { name: "Psychic", value: 14},
    { name: "Ice", value: 15},
    { name: "Dragon", value: 16},
    { name: "Dark", value: 17},
    { name: "Fairy", value: 18},
    { name: "Unknow", value: 19},
    { name: "Shadow", value: 20},

    // ...otros tipos
  ]; 

  const [typeError, setTypeError] = useState("");
  const [showTypeOptions, setShowTypeOptions] = useState(false);




  const [form, setForm] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types:[]
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: []
  });

  const toggleType = (typeValue) => {
    const updatedTypes = [...form.types];

    if (updatedTypes.includes(typeValue)) {
      updatedTypes.splice(updatedTypes.indexOf(typeValue), 1); // Deseleccionar tipo
    } else {
      if (updatedTypes.length < 2) {
        updatedTypes.push(typeValue); // Seleccionar tipo si no hay dos seleccionados
      } else {
        setTypeError("Solo puedes seleccionar hasta dos tipos.");
        return;
      }
    }

    setTypeError("");
    setErrors({ ...errors, types: [] });

    setForm({ ...form, types: updatedTypes });
  };




  const validate = (formData) => {
    const newErrors = {};

    // Validar cada campo aquí
    if (!formData.name) {
      newErrors.name = "Nombre es requerido";
    }else if (/\d/.test(formData.name)) {
      newErrors.name = "Nombre no debe contener numeros";
    }

    if(!formData.image){
      newErrors.image = "Imagen es requerida";
    }

    if(!formData.hp){
      newErrors.hp = "Salud es requerida";
    }  else if (formData.hp < 0 || formData.hp > 150) {
      newErrors.hp = "Salud debe estar entre 0 y 150";
    }

    if(!formData.attack){
      newErrors.attack = "Ataque es requerido";
    } else if (formData.attack < 0 || formData.attack > 150) {
      newErrors.attack = "Ataque debe estar entre 0 y 150";
    }
    
    if(!formData.defense){
      newErrors.defense = "Defensa es requerida";
    } else if (formData.defense < 0 || formData.defense > 150) {
      newErrors.defense = "Salud debe estar entre 0 y 150";
    }

    if(!formData.speed){
      newErrors.speed = "Velocidad es requerida";
    } else if (formData.speed < 0 || formData.speed > 150) {
      newErrors.speed = "Velocidad debe estar entre 0 y 150";
    }

    if(!formData.height){
      newErrors.height = "Altura es requerida";
    } else if (formData.height < 0 || formData.height > 300) {
      newErrors.height = "Altura debe estar entre 0 y 300";
    }

    if(!formData.weight){
      newErrors.weight = "Peso es requerido";
    } else if (formData.weight < 0 || formData.weight > 1500) {
      newErrors.weight = "Peso debe estar entre 0 y 1500";
    }

    if(formData.types.length === 0 && typeError === ""){
      newErrors.types = "Al menos un tipo es requerido";
    } 
     
    return newErrors;
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    const newForm = { ...form, [property]: value };
    const newErrors = validate(newForm);

    setForm(newForm);
    setErrors(newErrors);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newErrors = validate(form);

    if (Object.keys(newErrors).length === 0) {
      axios
        .post("http://localhost:3001/pokemones", form)
        .then((res) => {
         alert("Pokemon creado")        
        resetForm();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert("El Pokémon ya existe");
          } else {
            alert(err);
          }
        });
      console.log(form);
      } else {
      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      image: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: []
    });
  
    setErrors({
      name: "",
      image: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: []
    });
  
    setTypeError("");
    setShowTypeOptions(false);
  };








  const formIsDisabled =
  !form.name ||
  !form.image ||
  !form.hp ||
  !form.attack ||
  !form.defense ||
  !form.speed ||
  !form.height ||
  !form.weight ||
  form.types.length === 0 ||
  errors.name ||
  errors.image ||
  errors.hp ||
  errors.attack ||
  errors.defense ||
  errors.speed ||
  errors.height ||
  errors.weight ||
  typeError !== "";



    return(
 
         <form onSubmit={submitHandler}>
         
        <div className={style.formContainer}>
           <h1>Crea tu propio pokemon</h1>

               <label className={style.labelStyle} >Nombre</label>               
               <input  type="text" value = {form.name} onChange ={changeHandler} name="name"/>
              {errors.name && <span className={style.errorText}>{errors.name}</span> }
                           
           
              <label className={style.labelStyle}>Imagen</label>
              <input type="text" value = {form.image} onChange ={changeHandler}name="image"/>
              {errors.image && <span className={style.errorText}>{errors.image}</span> }      
                
           
              <label className={style.labelStyle}>Salud</label>
              <input type="number"value = {form.hp} onChange ={changeHandler}name="hp"/>
              {errors.hp && <span className={style.errorText}>{errors.hp}</span> }
           
              <label className={style.labelStyle}>Ataque</label>               
              <input type="number" value = {form.attack} onChange ={changeHandler} name="attack"/>
              {errors.attack && <span className={style.errorText}>{errors.attack}</span> }
                           
           
              <label className={style.labelStyle}>Defensa</label>
              <input type="number" value = {form.defense} onChange ={changeHandler}name="defense"/>
              {errors.defense && <span className={style.errorText}>{errors.defense}</span> }        
                
           
              <label className={style.labelStyle}>Velocidad</label>
              <input type="number"value = {form.speed} onChange ={changeHandler}name="speed"/>
              {errors.speed && <span className={style.errorText}>{errors.speed}</span> }
           
              <label className={style.labelStyle}>Altura</label>               
              <input type="number" value = {form.height} onChange ={changeHandler} name="height"/>
              {errors.height && <span className={style.errorText}>{errors.height}</span> }
                          
           
              <label className={style.labelStyle}>Peso</label>
              <input type="number" value = {form.weight} onChange ={changeHandler}name="weight"/>
              {errors.weight && <span className={style.errorText}>{errors.weight}</span> }                  
                                              
         <br></br>

{/* <label onClick={() => setShowTypeOptions(!showTypeOptions)}>Click para seleccionar tipo</label> */}

      <button  className={`${style.buttonStyleTipo} ${style.buttonHover}`} 
              onClick={() => setShowTypeOptions(!showTypeOptions)}>Seleccionar tipo</button>
             {showTypeOptions && (
            <div>
            {types.map((type) => (
            <label key={type.value}>
            <input
              type="checkbox"
              checked={form.types.includes(type.value)}
              onChange={() => toggleType(type.value)}
            />
            {type.name}


          </label>
        ))}
      </div>
        )}
        <br></br>
         
      {typeError && <p className={style.errorText}>{typeError}</p>}
      {errors.types && <span className={style.errorText}>{errors.types}</span>} 
              {/* <label>Tipo: </label>
              <input type="number" value = {form.types} onChange ={changeHandler}name="types"/>  */}
           
           <button className={`${style.buttonStyleCrear} ${formIsDisabled ? style.buttonDisabled : ""}`}   
              disabled={formIsDisabled}
               type="submit">Crear</button>

          </div>
            
         </form>
 
 
    )
 
 }
 
 export default Form;