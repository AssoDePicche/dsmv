interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

type UsuarioSemSenha = Omit<Usuario, "senha">;

type UsuarioAtualizacao = Partial<Usuario>;

const exibirPerfil = (u: UsuarioSemSenha): void => {
  console.log(`${u.id}, ${u.nome}, ${u.senha}`);
};

const atualizarUsuario = (id: number, dados: UsuarioAtualizacao): void => {
  console.log(`${id}, ${dados.nome}, ${dados.email}`);
};

const u: Usuario = {
  id: 1,
  nome: "alpacas",
  email: "alpacas@papacas.com",
  senha: "senha"
};

exibirPerfil(u);

const dados: UsuarioAtualizacao = { nome: "alpacas papacas" };

exibirPerfil(1, dados);
