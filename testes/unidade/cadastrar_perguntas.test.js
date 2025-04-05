const modelo = require('../../modelo');
const repositorioMemoria = require('../../repositorio/memoria');

beforeEach(() => {
  modelo.reconfig_repositorio(repositorioMemoria);
});

test('deve adicionar nova pergunta na memória', async () => {
  const texto = 'Pergunta de teste';
  const id = await modelo.cadastrar_pergunta(texto);
  const perguntas = await modelo.listar_perguntas();
  const encontrada = perguntas.find(p => p.id_pergunta === id);
  expect(encontrada.texto).toBe(texto);
});
