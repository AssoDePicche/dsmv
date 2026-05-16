import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import { ActivityIndicator } from 'react-native';

import { storage } from '@/services/favorites';

interface FavoritesContextData {
  favorites: string[];
  addFavorite: (pokemonName: string) => void;
  removeFavorite: (pokemonName: string) => void;
  isFavorite: (pokemonName: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextData | null>(null); 

interface Properties {
  children: ReactNode;
}

const useProvideFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await storage.load();

      setFavorites(storedFavorites);
    } catch (error) {
      console.error('Failed to load favorites from storage', error);
    } finally {
      setIsLoading(false);
    }
  }, [favorites]);

  const saveFavorites = useCallback(async () => {
    try {
      await storage.save(favorites);
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

  const addFavorite = (pokemonName: string) => {
    if (favorites.includes(pokemonName)) {
      return;
    }

    setFavorites(previous => [...previous, pokemonName]);
  };

  const removeFavorite = (pokemonName: string) => setFavorites(previous => previous.filter((name: string) => id !== pokemonName));

  const isFavorite = (pokemonName: string) => favorites.includes(pokemonName);

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
