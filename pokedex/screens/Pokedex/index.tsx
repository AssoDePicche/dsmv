import { FC, ReactNode } from 'react';

import { ActivityIndicator, FlatList, StyleSheet, TextInput, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { PokemonCard } from '@/components/Pokedex';

import { type Pokemon } from '@/types/Pokemon';

import { usePokedexViewModel } from  './usePokedexViewModel';

export const Pokedex: FC = (): ReactNode => {
  const { data, isLoading, hasNext, fetchNext, setSearch } = usePokedexViewModel();

  const renderFooter = () => isLoading ? <ActivityIndicator size="large"/> : null;

  const renderItem = ({ item }: { item: PokemonResource }) => <PokemonCard name={item.name}/>;

  const onEndReached = () => fetchNext();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Pokédex</Text>
        <TextInput onChangeText={setSearch} placeholder='Search pokémon...' />
      </View>
      <FlatList
        data={data}
        keyExtractor={(resource: PokemonResource) => resource.url}
        numColumns={4}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text>Nenhum pokémon encontrado</Text>}
        ListFooterComponent={renderFooter}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
