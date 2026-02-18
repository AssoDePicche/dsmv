interface Livro {
  titulo: string;
  autor: string;
  ano: number;
  disponivel: boolean;
}

const biblioteca: Livro[] = [
  { titulo: "O Apanhador no Campo de Centeio", autor: "J. D. Salinger", ano: 1945, disponivel: true },
  { titulo: "1984", autor: "George Orwell", ano: 1949, disponivel: true },
  { titulo: "Assassinato no Expresso do Oriente", autor: "Agatha Christie", ano: 1934, disponivel: false },
];

const listarTitulosDisponiveis = (biblioteca: Livro[]): string[] => {
  return biblioteca.filter((livro) => livro.disponivel).map(livro => livro.titulo);
};

console.log(listarTitulosDisponiveis(biblioteca));
