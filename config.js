const usarBD = process.env.USE_DB === 'true';
const repositorio = usarBD ? require('./repositorio/bd') : require('./repositorio/memoria');
module.exports = repositorio;
