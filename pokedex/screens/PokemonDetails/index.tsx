import { FC, ReactNode } from 'react';

import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { usePokemonDetailsViewModel } from './usePokemonDetailsViewModel';

export const PokemonDetails: FC = (): ReactNode => {
  const { isLoading, pokemon } = usePokemonDetailsViewModel();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>     
        <ActivityIndicator size='large' />
      </SafeAreaView>     
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>{pokemon.name}</Text>
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
