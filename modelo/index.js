let repositorio = require('../repositorio/memoria');

function reconfig_repositorio(rep) {
  repositorio = rep;
}

async function listar_perguntas() {
  const perguntas = await repositorio.recuperar_todas_perguntas();
  for (const p of perguntas) {
    p.num_respostas = await repositorio.recuperar_num_respostas(p.id_pergunta);
  }
  return perguntas;
}

async function cadastrar_pergunta(texto) {
  return await repositorio.criar_pergunta(texto);
}

async function cadastrar_resposta(id_pergunta, texto) {
  return await repositorio.criar_resposta(id_pergunta, texto);
}

async function get_pergunta(id_pergunta) {
  return await repositorio.recuperar_pergunta(id_pergunta);
}

async function get_respostas(id_pergunta) {
  return await repositorio.recuperar_todas_respostas(id_pergunta);
}

async function get_num_respostas(id_pergunta) {
  return await repositorio.recuperar_num_respostas(id_pergunta);
}

async function deletar_pergunta(id_pergunta) {
  return await repositorio.deletar_pergunta(id_pergunta);
}

async function deletar_resposta(id_resposta) {
  return await repositorio.deletar_resposta(id_resposta);
}

module.exports = {
  reconfig_repositorio,
  listar_perguntas,
  cadastrar_pergunta,
  cadastrar_resposta,
  get_pergunta,
  get_respostas,
  get_num_respostas,
  deletar_pergunta,
  deletar_resposta  
};
