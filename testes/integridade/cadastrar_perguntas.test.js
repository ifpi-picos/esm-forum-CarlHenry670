const modelo = require('../../modelo');
const repositorioBD = require('../../repositorio/bd');
const bd = require('../../bd/bd_utils');

beforeEach(() => {
  modelo.reconfig_repositorio(repositorioBD);
  bd.reconfig('./bd/esmforum-teste.db');
  bd.exec('DELETE FROM respostas', []);
  bd.exec('DELETE FROM perguntas', []);
});

test('deve adicionar nova pergunta no banco de dados', async () => {
  const texto = 'Pergunta de teste';
  const id = await modelo.cadastrar_pergunta(texto);
  const perguntas = await modelo.listar_perguntas();
  const encontrada = perguntas.find(p => p.id_pergunta === id);
  expect(encontrada.texto).toBe(texto);
});
