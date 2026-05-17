import { FC, ReactNode } from 'react';

import { StyleSheet, TextInput, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { List } from '@/components/Pokedex';

import { type PokemonResource } from '@/types/Pokemon';

import { usePokedexViewModel } from  './usePokedexViewModel';

export const Pokedex: FC = (): ReactNode => {
  const { data, fetchNext, search, setSearch } = usePokedexViewModel();

  const pokemon: string[] = data.map((resource: PokemonResource) => resource.name);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Pokédex</Text>
        <TextInput onChangeText={setSearch} placeholder='Search pokémon...' style={styles.input} value={search} />
      </View>
      <List onEndReached={fetchNext} pokemon={pokemon} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    gap: 8,
    justifyContent: 'center',
    padding: 36,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
  },
});
