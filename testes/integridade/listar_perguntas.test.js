const modelo = require('../../modelo');
const repositorioBD = require('../../repositorio/bd');
const bd = require('../../bd/bd_utils');

beforeEach(() => {
  modelo.reconfig_repositorio(repositorioBD);
  bd.reconfig('./bd/esmforum-teste.db');
  bd.exec('DELETE FROM respostas', []);
  bd.exec('DELETE FROM perguntas', []);
  bd.exec('INSERT INTO perguntas (texto, id_usuario) VALUES (?, ?)', ['Pergunta 1', 1]);
});

test('deve retornar perguntas cadastradas no banco', async () => {
  const perguntas = await modelo.listar_perguntas();
  expect(Array.isArray(perguntas)).toBe(true);
  expect(perguntas.length).toBeGreaterThan(0);
});
