const modelo = require('../../modelo');
const repositorioMemoria = require('../../repositorio/bd');

beforeEach(() => {
  modelo.reconfig_repositorio(repositorioMemoria);
});

test('deve retornar perguntas do repositório de memória', async () => {
  const perguntas = await modelo.listar_perguntas();
  expect(Array.isArray(perguntas)).toBe(true);
  expect(perguntas.length).toBeGreaterThan(0);
});
