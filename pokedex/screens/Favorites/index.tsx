import { FC, ReactNode } from 'react';

import { StyleSheet, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useFavorites } from '@/contexts/Favorites';

import { type Pokemon } from '@/types/Pokemon';

export const Favorites: FC = (): ReactNode => {
  const { favorites } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
    {favorites.map((p: number, index: number) => (<Text key={index}>{p}</Text>))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
