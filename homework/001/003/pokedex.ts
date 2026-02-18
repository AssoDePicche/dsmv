import { Either } from "./Either";

import { type Pokemon, fetchPokemon } from "./Pokemon";

if (process.argv.length < 3) {
  console.error("É preciso informar o nome de um Pokémon. Ex: node pokemon.ts pikachu");

  process.exit(1);
}

const name = process.argv[2];

const either: Promise<Either<string, Pokemon>> = await fetchPokemon(name);

if (either.isLeft()) {
  console.error(either.value);

  process.exit(1);
}

const show = (pokemon: Pokemon) => {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const types = pokemon.types.map(type => capitalize(type.type.name)).join(" - ");

  return `${capitalize(pokemon.name)} - ${pokemon.height} m - ${pokemon.weight} kg - ${types}`;
}

const pokemon = either.value;

console.log(show(pokemon));
