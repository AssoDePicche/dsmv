import { useCallback, useEffect, useState } from 'react';

import { fetchPokemonResourceList } from '@/services/api';

import { type Pokemon, type PokemonResourceList } from '@/types/Pokemon';

interface PokedexViewModel {
  data: PokemonResource[];
  isLoading: boolean;
  hasNext: boolean;
  fetchNext: () => void;
  setSearch: (query: string) => void;
}

export const usePokedexViewModel = (): PokedexViewModel => {
  const [data, setData] = useState<PokemonResource[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [hasNext, setHasNext] = useState<boolean>(true);

  const [offset, setOffset] = useState(0);

  const [limit, setLimit] = useState(0);

  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const resourceList: PokemonResourceList = await fetchPokemonResourceList(offset, limit);

    setHasNext(resourceList.next != null);

    if (!search.trim()) {
      setData((previous: PokemonResource[]) => [...previous, ...resourceList.results]);
    } else {
      const filteredData: PokemonResource[] = resourceList.results.filter(pokemon => pokemon.name.includes(search.toLowerCase())).slice(0, 5);

      setData(filteredData);
    }

    setIsLoading(false);
  }, [offset, limit, search]);

  useEffect(() => {
    fetchData();
  }, []);

  const filterPokemon = (pokemon: PokemonResource) => pokemon.name.toLowerCase().includes(search.toLowerCase()); 

  return {
    data: data.filter(filterPokemon),
    isLoading: isLoading,
    hasNext: hasNext,
    fetchNext: () => {
      setOffset((previous) => previous + 20);

      setLimit((previous) => previous + 20);

      fetchData();
    },
    setSearch: setSearch,
  };
};
