import { unique, groupBy, sumBy } from "./arrayUtils.js";

const A = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const B = [0, 1, 1, 2, 3, 5, 8, 13, 21, 30];

const C = [
  { tipo: "A" },
  { tipo: "B" },
  { tipo: "AB" },
  { tipo: "A" },
  { tipo: "A" },
  { tipo: "AB" },
];

const D = [
  { tipo: "C" },
  { tipo: "C" },
  { tipo: "CD" },
  { tipo: "CD" },
  { tipo: "D" },
  { tipo: "DC" },
];

const E = [
  { valor: 2 },
  { valor: 4 },
  { valor: 6 },
  { valor: 10 },
  { valor: 16 },
  { valor: 26 },
];

const F = [
  { valor: 1 },
  { valor: 3 },
  { valor: 5 },
  { valor: 7 },
  { valor: 9 },
  { valor: 11 },
];

console.log(`A: ${JSON.stringify(A)}`);
console.log(`B: ${JSON.stringify(B)}`);
console.log(`unique(A): ${JSON.stringify(unique(A))}`);
console.log(`unique(B): ${JSON.stringify(unique(B))}`);

console.log(`C: ${JSON.stringify(C)}`);
console.log(`D: ${JSON.stringify(D)}`);
console.log(`groupBy(C, "tipo"): ${JSON.stringify(groupBy(C, "tipo"))}`);
console.log(`groupBy(D, "tipo"): ${JSON.stringify(groupBy(D, "tipo"))}`);

console.log(`E: ${JSON.stringify(E)}`);
console.log(`sumBy(E, "valor"): ${JSON.stringify(sumBy(E, "valor"))}`);
console.log(`F: ${JSON.stringify(F)}`);
console.log(`sumBy(F, "valor"): ${JSON.stringify(sumBy(F, "valor"))}`);
