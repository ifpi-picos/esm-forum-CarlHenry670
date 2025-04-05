const modelo = require('../../modelo');
const repositorioMemoria = require('../../repositorio/memoria');

beforeEach(() => {
  modelo.reconfig_repositorio(repositorioMemoria);
});

test('deve retornar respostas de uma pergunta (memória)', async () => {
  const respostas = await modelo.get_respostas(3);
  expect(Array.isArray(respostas)).toBe(true);
  expect(respostas.length).toBe(2);
});
