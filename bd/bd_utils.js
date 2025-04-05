const Database = require('better-sqlite3');

let bd = new Database('./bd/esmforum.db');

function reconfig(nome) {
  console.log('🧪 Usando banco:', nome);
  bd = new Database(nome);
}

function query(query, params) {
  return bd.prepare(query).get(params);
}

function queryAll(query, params) {
  return bd.prepare(query).all(params);
}

function exec(statement, params) {
  return bd.prepare(statement).run(params);
}

module.exports = {
  reconfig,
  query,
  queryAll,
  exec
};
