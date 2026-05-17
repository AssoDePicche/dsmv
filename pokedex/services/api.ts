import { type Pokemon, type PokemonResourceList } from '@/types/Pokemon';

const URL: string = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`${URL}/${name}`);

  const pokemon = await response.json();

  return pokemon;
}

export const fetchPokemonResourceList = async (offset: number = 0, limit: number = 20): Promise<PokemonResourceList> => {
  const uri: string = `${URL}?offset=${offset}&limit=${limit}`;

  const response = await fetch(uri);

  const resourceList = await response.json();

  return resourceList;
}
