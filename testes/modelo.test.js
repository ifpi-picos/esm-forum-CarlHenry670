const fs = require('fs');
const sqlite3 = require('better-sqlite3');
const bd = require('../bd/bd_utils');
const modelo = require('../modelo');
const repositorioBD = require('../repositorio/bd');

beforeAll(() => {
  modelo.reconfig_repositorio(repositorioBD);
  bd.reconfig('./bd/esmforum-teste.db');

  const schemaSQL = fs.readFileSync('./bd/schema.sql', 'utf8');
  const db = new sqlite3('./bd/esmforum-teste.db');
  db.exec(schemaSQL);
  db.close();
});

beforeEach(() => {
  bd.exec('DELETE FROM respostas', []);
  bd.exec('DELETE FROM perguntas', []);
});

test('deve retornar 0 perguntas inicialmente', async () => {
  const perguntas = await modelo.listar_perguntas();
  expect(perguntas.length).toBe(0);
});
