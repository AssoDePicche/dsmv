type Sucesso = { tipo: "sucesso", dados: string[] };

type Erro = { tipo: "erro", mensagem: string };

type Resultado = Sucesso | Erro;

const exibirResultado = (r: Resultado): void => {
  if (r.tipo === "sucesso") {
    console.log(r.dados);

    return;
  }

  console.log(r.mensagem);
};

const r: Resultado = { tipo: "sucesso", dados: ["1", "2"] } as Sucesso;

exibirResultado(r);
