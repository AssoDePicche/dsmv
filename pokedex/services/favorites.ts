import { getItem, setItem } from '@/services/storage';

const FAVORITES_KEY: string = '@Pokedex:favorites';

const loadFavorites = async (): number[] => {
  const storedFavorites = await getItem(FAVORITES_KEY);

  if (storedFavorites) {
    return JSON.parse(storedFavorites);
  }
};

export const saveFavorites = async (favorites: number[]) => setItem(FAVORITES_KEY, JSON.stringify(favorites));

export const storage = {
  load: loadFavorites,
  save: saveFavorites,
};
