import { FC, ReactNode, useState } from 'react';

import { Text, TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useFavorites } from '@/contexts/Favorites';

interface Properties {
  pokemonId: number;
}

export const Starred: FC<Properties> = ({ pokemonId }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite }= useFavorites();

  const isStarred = isFavorite(pokemonId);

  const toggleState = () => {
    if (isStarred) {
      removeFavorite(pokemonId);
    } else {
      addFavorite(pokemonId);
    }
  };

  if (!pokemonId) {
    return <Ionicons name={isStarred ? 'heart' : 'heart-outline'} size={24} color='lightgray' />;
  }

  return (
    <TouchableOpacity onPress={toggleState}>
      <Ionicons name={isStarred ? 'heart' : 'heart-outline'} size={24} color='black' />
    </TouchableOpacity>
  );
}
