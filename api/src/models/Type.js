const { DataTypes } = require('sequelize');

module.exports = (database) => {
    // defino el modelo
  
    database.define('type', {
      id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,   
        primaryKey:true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
     
  
    },{
      timestamps:false,
    });
  };
  