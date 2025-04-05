const modelo = require('../../modelo');
const repositorioBD = require('../../repositorio/bd');
const bd = require('../../bd/bd_utils');

beforeEach(() => {
  modelo.reconfig_repositorio(repositorioBD);
  bd.reconfig('./bd/esmforum-teste.db');
  bd.exec('DELETE FROM respostas', []);
  bd.exec('DELETE FROM perguntas', []);

  const id = bd.exec('INSERT INTO perguntas (texto, id_usuario) VALUES (?, ?)', ['Pergunta teste', 1]).lastInsertRowid;
  bd.exec('INSERT INTO respostas (id_pergunta, texto) VALUES (?, ?)', [id, 'Resposta 1']);
  bd.exec('INSERT INTO respostas (id_pergunta, texto) VALUES (?, ?)', [id, 'Resposta 2']);
});

test('deve retornar respostas de uma pergunta', async () => {
  const perguntas = await modelo.listar_perguntas();
  const idPergunta = perguntas[0].id_pergunta;

  const respostas = await modelo.get_respostas(idPergunta);
  expect(Array.isArray(respostas)).toBe(true);
  expect(respostas.length).toBe(2);
});
