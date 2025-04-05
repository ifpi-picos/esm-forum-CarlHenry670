const modelo = require('../../modelo');
const repositorioMemoria = require('../../repositorio/memoria');

beforeEach(() => {
  modelo.reconfig_repositorio(repositorioMemoria);
});

test('deve deletar uma resposta da memória', async () => {
  const id_pergunta = 3;
  const novaRespostaId = await modelo.cadastrar_resposta(id_pergunta, 'Resposta a ser deletada');

  let respostas = await modelo.get_respostas(id_pergunta);
  expect(respostas.some(r => r.id_resposta === novaRespostaId)).toBe(true);

  await modelo.deletar_resposta(novaRespostaId);

  respostas = await modelo.get_respostas(id_pergunta);
  expect(respostas.some(r => r.id_resposta === novaRespostaId)).toBe(false);
});
