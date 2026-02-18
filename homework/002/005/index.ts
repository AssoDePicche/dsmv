interface PropsBotao {
  titulo: string;
  ativo?: boolean;
}

const renderizarBotao = ({ titulo, ativo = true }: PropsBotao): string => {
  return ativo ? `[ ${titulo} ]` : `( ${titulo} )`;
};

console.log(renderizarBotao({ titulo: "botao ativo" }));

console.log(renderizarBotao({ titulo: "botao inativo", ativo: false }));
