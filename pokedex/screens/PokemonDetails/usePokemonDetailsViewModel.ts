import { useLocalSearchParams } from 'expo-router';

import { useCallback, useEffect, useState } from 'react';

import { fetchPokemon } from '@/services/api';

import { type Pokemon } from '@/types/Pokemon';

interface PokemonDetailsViewModel {
  isLoading: boolean;
  pokemon: Pokemon;
}

export const usePokemonDetailsViewModel = () => {
  const { name } = useLocalSearchParams();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const fetchData = useCallback(async () => fetchPokemon(name).then(setPokemon), [name]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isLoading: pokemon === null,
    pokemon: pokemon,
  };
};
