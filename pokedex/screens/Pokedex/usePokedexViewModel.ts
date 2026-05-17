import { useCallback, useEffect, useState, useRef } from 'react';

import { fetchPokemonResourceList } from '@/services/api';

import { type PokemonResourceList, type PokemonResource } from '@/types/Pokemon';

interface PokedexViewModel {
  data: PokemonResource[];
  fetchNext: () => void;
  search: string;
  setSearch: (query: string) => void;
}

export const usePokedexViewModel = (): PokedexViewModel => {
  const [data, setData] = useState<PokemonResource[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [hasNext, setHasNext] = useState<boolean>(true);

  const [offset, setOffset] = useState<number>(0);

  const [search, setSearch] = useState<string>('');

  const limit = 20;

  const isFetchingRef = useRef(false);

  const fetchData = useCallback(async (currentOffset: number) => {
    if (isFetchingRef.current) return;
    
    isFetchingRef.current = true;

    setIsLoading(true);
    
    try {
      const resource: PokemonResourceList = await fetchPokemonResourceList(currentOffset, limit);
      
      setHasNext(resource.next != null);
      
      setData((previous) => {
        return currentOffset === 0 ? resource.results : [...previous, ...resource.results];
      });
    } catch (error) {
      console.error('Failed to fetch pokemon:', error);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchData(offset);
  }, [offset, fetchData]);

  const fetchNext = useCallback(() => {
    if (isFetchingRef.current || !hasNext) {
      return;
    }

    setOffset((prevOffset) => prevOffset + limit);
  }, [hasNext]);

  const filteredData = data.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()));

  return {
    data: filteredData,
    fetchNext,
    search,
    setSearch,
  };
};
