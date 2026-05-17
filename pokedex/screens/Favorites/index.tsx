import { FC, ReactNode } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { List } from '@/components/Pokedex';

import { useFavorites } from '@/contexts/Favorites';

export const Favorites: FC = (): ReactNode => {
  const { favorites } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Favorites</Text>
      </View>
      <List pokemon={favorites} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
});
