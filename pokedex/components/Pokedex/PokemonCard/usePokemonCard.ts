import { useRouter } from 'expo-router';

import { useCallback, useEffect, useState } from 'react';

import { fetchPokemon } from '@/services/api';

import { type Pokemon, type Sprites, type Type, } from '@/types/Pokemon';

export const usePokemonCard = (name: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const router = useRouter();

  const fetchData = useCallback(async () => fetchPokemon(name).then(setPokemon), [name]);

  const handlePress = () => router.push({
    pathname: `/${name}`,
    params: { name: name }
  });

  useEffect(() => {
    fetchData();
  }, []);

  return {
    handlePress: handlePress,
    index: pokemon?.id.toString().padStart(4, "0"),
    isLoading: pokemon === null,
    spriteURL: pokemon?.sprites.front_default,
    types: pokemon?.types.reduce((buffer, current) => buffer.concat(current.type), []),
  };
};
