import { FC, ReactNode } from 'react';

import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { PokemonCard } from '@/components/Pokedex';

interface Properties {
  onEndReached?: () => void;
  pokemon: string[];
}

const ListFooter: FC = (): ReactNode => {
  return (
    <View style={styles.flatListSkeleton}>
      <ActivityIndicator size='large' />
    </View>
  );
};

export const List: FC<Properties> = ({ onEndReached, pokemon }): ReactNode => {
  const renderItem = ({ item }: { item: string }) => <PokemonCard name={item}/>;

  return (
    <FlatList
      columnWrapperStyle={styles.flatListColumnWrapper}
      contentContainerStyle={styles.flatListContainer}
      data={pokemon}
      keyExtractor={(name: string) => name}
      numColumns={4}
      renderItem={renderItem}
      ListEmptyComponent={() => <Text>Nenhum pokémon encontrado</Text>}
      ListFooterComponent={() => onEndReached ? ListFooter : null}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  flatListColumnWrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  flatListContainer: {
    justifyContent: 'center',
  },
  flatListSkeleton: {
    flex: 1,
    padding: 40,
  },
});
