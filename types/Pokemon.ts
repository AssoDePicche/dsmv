export interface Ability {
  name: string;
  url: string;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: Ability;
}

export interface PokemonForm {
  name: string;
  url: string;
}

export interface GameVersion {
  name: string;
  url: string;
}

export interface GameIndices {
  game_index: number;
  version: GameVersion;
}

export interface Item {
  name: string;
  url: string;
}

export interface ItemVersionDetails {
  rarity: number;
  version: GameVersion;
}

export interface HeldItem {
  item: Item;
  version_details: ItemVersionDetails[];
}

export interface Move {
  name: string;
  url: string;
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface MoveVersionGroupDetails {
  level_learned_at: number;
  version_group: GameVersion;
  move_learn_method: MoveLearnMethod;
  order: number;
}

export interface PokemonMove {
  move: Move;
  version_group_details: MoveVersionGroupDetails[];
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface Cry {
  latest: string;
  legacy: string;
}

export interface Stat {
  name: string;url: string;
}

export interface PokemonStat {
  base_stat: number;
  effor: number;
  stat: Stat;
}

export interface Type {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: Type;
}

export interface Generation {
  name: string;
  url: string;
}

export interface PastPokemonType {
  generation: Generation;
  types: PokemonType[];
}

export interface PastPokemonAbility {
  generation: Generation;
  ability: PokemonAbility;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: PokemonForm[];
  game_indices: GameIndices;
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  species: Species;
  sprites: Sprites;
  cries: Cry[];
  stats: Stat[];
  types: PokemonType[];
  past_types: PokemonPokemonType[];
}

export async function fetchPokemon(name: string): Pokemon {
  const URL = "https://pokeapi.co/api/v2/pokemon/" + name;

  const response = await fetch(URL);

  const pokemon = await response.json();

  return pokemon;
}
