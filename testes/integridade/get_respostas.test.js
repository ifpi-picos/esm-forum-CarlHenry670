const modelo = require('../../modelo');
const repositorioBD = require('../../repositorio/bd');
const bd = require('../../bd/bd_utils');

let idPergunta;

beforeEach(() => {
  modelo.reconfig_repositorio(repositorioBD);
  bd.reconfig('./bd/esmforum-teste.db');
  bd.exec('DELETE FROM respostas', []);
  bd.exec('DELETE FROM perguntas', []);
  idPergunta = bd.exec(
    'INSERT INTO perguntas (texto, id_usuario) VALUES (?, ?)',
    ['Pergunta teste', 1]
  ).lastInsertRowid;
  bd.exec('INSERT INTO respostas (id_pergunta, texto) VALUES (?, ?)', [idPergunta, 'Resposta 1']);
  bd.exec('INSERT INTO respostas (id_pergunta, texto) VALUES (?, ?)', [idPergunta, 'Resposta 2']);
});

test('deve retornar respostas da pergunta no banco', async () => {
  const respostas = await modelo.get_respostas(idPergunta);
  expect(Array.isArray(respostas)).toBe(true);
  expect(respostas.length).toBe(2);
});
