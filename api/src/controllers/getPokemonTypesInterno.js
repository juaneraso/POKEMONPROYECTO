const {Type} = require('../db');

const getTypesInterno = async () => {
  const tipos = await Type.findAll();
  return tipos;
};

module.exports = getTypesInterno;