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
      return respostas[id_pergunta].length;
    },
  
    async recuperar_todas_respostas(id_pergunta) {
      return (respostas[id_pergunta] || []).map((texto, i) => ({
        id_resposta: i + 1,
        id_pergunta,
        texto
      }));
    }
  };
  