const perguntas = [
  { id_pergunta: 1, texto: "Qual a capital do Brasil?", id_usuario: 1 },
  { id_pergunta: 2, texto: "O que é Node.js?", id_usuario: 1 },
  { id_pergunta: 3, texto: "Como funciona o Jest?", id_usuario: 1 }
];

const respostas = {
  1: ["Brasília."],
  2: ["É um ambiente de execução JavaScript."],
  3: ["Framework de testes.", "Biblioteca para JS."]
};

let respostaIdCounter = 1;
const respostaIndex = {};

for (const [id_pergunta, lista] of Object.entries(respostas)) {
  respostas[id_pergunta] = lista.map((texto, i) => {
    const id = respostaIdCounter++;
    respostaIndex[id] = { id_pergunta: parseInt(id_pergunta), index: i };
    return texto;
  });
}

module.exports = {
  async recuperar_todas_perguntas() {
    return perguntas;
  },

  async recuperar_pergunta(id) {
    return perguntas.find(p => p.id_pergunta === id);
  },

  async recuperar_num_respostas(id_pergunta) {
    return respostas[id_pergunta]?.length || 0;
  },

  async criar_pergunta(texto) {
    const nova = {
      id_pergunta: perguntas.length + 1,
      texto,
      id_usuario: 1
    };
    perguntas.push(nova);
    return nova.id_pergunta;
  },

  async criar_resposta(id_pergunta, texto) {
    if (!respostas[id_pergunta]) respostas[id_pergunta] = [];

    respostas[id_pergunta].push(texto);

    const index = respostas[id_pergunta].length - 1;
    const id_resposta = respostaIdCounter++;
    respostaIndex[id_resposta] = { id_pergunta, index };

    return id_resposta;
  },

  async recuperar_todas_respostas(id_pergunta) {
    return (respostas[id_pergunta] || []).map((texto, i) => {
      const id_resposta = Object.entries(respostaIndex).find(
        ([_, v]) => v.id_pergunta === id_pergunta && v.index === i
      )?.[0];

      return {
        id_resposta: parseInt(id_resposta),
        id_pergunta,
        texto
      };
    });
  },

  async deletar_pergunta(id_pergunta) {
    const index = perguntas.findIndex(p => p.id_pergunta === id_pergunta);
    if (index !== -1) {
      perguntas.splice(index, 1);
      delete respostas[id_pergunta];

      for (const [id, meta] of Object.entries(respostaIndex)) {
        if (meta.id_pergunta === id_pergunta) {
          delete respostaIndex[id];
        }
      }

      return true;
    }
    return false;
  },

  async deletar_resposta(id_resposta) {
    const local = respostaIndex[id_resposta];
    if (!local) return false;

    const { id_pergunta, index } = local;

    if (respostas[id_pergunta]) {
      respostas[id_pergunta].splice(index, 1);
      delete respostaIndex[id_resposta];

      for (const [id, v] of Object.entries(respostaIndex)) {
        if (v.id_pergunta === id_pergunta && v.index > index) {
          v.index -= 1;
        }
      }

      return true;
    }
    return false;
  }
};
