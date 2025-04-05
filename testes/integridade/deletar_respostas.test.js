const modelo = require('../../modelo');
const repositorioMemoria = require('../../repositorio/memoria');

beforeEach(() => {
  modelo.reconfig_repositorio(repositorioMemoria);
});

test('deve deletar uma pergunta da memória', async () => {
  const texto = 'Pergunta a ser deletada';
  const id = await modelo.cadastrar_pergunta(texto);

  let perguntas = await modelo.listar_perguntas();
  expect(perguntas.some(p => p.id_pergunta === id)).toBe(true);

  await modelo.deletar_pergunta(id);

  perguntas = await modelo.listar_perguntas();
  expect(perguntas.some(p => p.id_pergunta === id)).toBe(false);
});
