const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (database) => {
  // defino el modelo

  database.define('pokemon', {
    id:{
         type:DataTypes.UUID,
         primaryKey:true,
         defaultValue: DataTypes.UUIDV4,   
        
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull:false,

    },
    hp: {
      type: DataTypes.INTEGER,      
      allowNull:false,

    },
    attack:{ 
      type: DataTypes.INTEGER,      
      allowNull:false,
    },
    defense:{
      type: DataTypes.INTEGER,      
      allowNull:false,
    },
    speed:{
      type: DataTypes.INTEGER,      
      allowNull:false,

    },
    height:{
      type: DataTypes.INTEGER,      
      allowNull:false,

    },
    weight:{
      type: DataTypes.INTEGER,      
      allowNull:false, 
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue:true,
    }    

  },{
    timestamps:false,

  });
};
