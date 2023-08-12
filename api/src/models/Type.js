const { DataTypes } = require('sequelize');

module.exports = (database) => {
    // defino el modelo
  
    database.define('type', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,      
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
   
  
    },{
      timestamps:false,
    });
  };
  