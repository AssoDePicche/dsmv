import { FC, ReactNode, useState } from 'react';

import { Text, TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useFavorites } from '@/contexts/Favorites';

interface Properties {
  pokemonName: string;
}

export const Starred: FC<Properties> = ({ pokemonName }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const isStarred = isFavorite(pokemonName);

  const toggleState = () => {
    if (isStarred) {
      removeFavorite(pokemonName);
    } else {
      addFavorite(pokemonName);
    }
  };

  if (!pokemonName) {
    return <Ionicons name={isStarred ? 'heart' : 'heart-outline'} size={24} color='lightgray' />;
  }

  return (
    <TouchableOpacity onPress={toggleState}>
      <Ionicons name={isStarred ? 'heart' : 'heart-outline'} size={24} color='black' />
    </TouchableOpacity>
  );
}
