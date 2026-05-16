import { FC, ReactNode } from 'react';

import { FlatList, StyleSheet, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { PokemonCard } from '@/components/Pokedex';

import { useFavorites } from '@/contexts/Favorites';

import { type Pokemon } from '@/types/Pokemon';

export const Favorites: FC = (): ReactNode => {
  const { favorites } = useFavorites();

  const renderItem = ({ item }: { item: string }) => <PokemonCard name={item}/>;

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
        data={favorites}
        keyExtractor={(name: string) => name}
        numColumns={4}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text>Nenhum pokémon encontrado</Text>}
      />

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
