interface Produto {
  nome: string;
  preco: number;
}

const obterPrimeiro = <T>(lista: T[]): T => lista[0];

console.log(obterPrimeiro(["primeiro", "segundo"]));

console.log(obterPrimeiro([0, 1]));

console.log(obterPrimeiro([
 { nome: "produto 1", preco: 69.99 },
 { nome: "produto 2", preco: 32.57 },
]));
