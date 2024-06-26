const combineArraysToObjectIdOption = (ids, options) => {
  // TODO: generalizarla?
  // funcion que combina dos arrays en un objeto con dos propiedades: id y option
  if (ids.length !== options.length) {
    throw new Error('Los arrays deben tener la misma longitud');
  }

  return ids.map((id, index) => ({
    id: id,
    option: options[index],
  }));
};

export default combineArraysToObjectIdOption;
