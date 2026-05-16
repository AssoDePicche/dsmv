import { createContext, FC, ReactNode, useContext, useState } from 'react';

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
  };
};

export const FavoritesProvider: FC<Properties> = ({ children }): ReactNode => {
  const favorites = useProvideFavorites();

  return <FavoritesContext.Provider value={favorites}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextData => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be inside FavoritesProvider');
  }

  return context;
};
