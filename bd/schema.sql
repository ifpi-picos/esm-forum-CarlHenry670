DROP TABLE IF EXISTS respostas;
DROP TABLE IF EXISTS perguntas;

CREATE TABLE perguntas (
  id_pergunta INTEGER PRIMARY KEY AUTOINCREMENT,
  texto TEXT NOT NULL,
  id_usuario INTEGER NOT NULL
);

CREATE TABLE respostas (
  id_resposta INTEGER PRIMARY KEY AUTOINCREMENT,
  id_pergunta INTEGER NOT NULL,
  texto TEXT NOT NULL,
  FOREIGN KEY (id_pergunta) REFERENCES perguntas(id_pergunta)
);
