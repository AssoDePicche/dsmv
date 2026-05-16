import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import { ActivityIndicator } from 'react-native';

import { getItem, setItem } from '@/services/storage';

const FAVORITES_KEY: string = '@Pokedex:favorites';

interface FavoritesContextData {
  favorites: number[];
  addFavorite: (pokemonId: number) => void;
  removeFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextData | null>(null); 

interface Properties {
  children: ReactNode;
}

const useProvideFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await getItem(FAVORITES_KEY);

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites from storage', error);
    } finally {
      setIsLoading(false);
    }
  }, [favorites]);

  const saveFavorites = useCallback(async () => {
    try {
      await setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites in storage', error);
    }
  }, [favorites]);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveFavorites();
    }
  }, [favorites, isLoading]);

  const addFavorite = (pokemonId: number) => {
    if (favorites.includes(pokemonId)) {
      return;
    }

    setFavorites(previous => [...previous, pokemonId]);
  };

  const removeFavorite = (pokemonId: number) => setFavorites(previous => previous.filter((id: number) => id !== pokemonId));

  const isFavorite = (pokemonId: number) => favorites.includes(pokemonId);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    isLoading,
  };
};

export const FavoritesProvider: FC<Properties> = ({ children }): ReactNode => {
  const favorites = useProvideFavorites();

  if (favorites.isLoading) {
    return <ActivityIndicator size='large' />
  }

  return <FavoritesContext.Provider value={favorites}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextData => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be inside FavoritesProvider');
  }

  return context;
};
