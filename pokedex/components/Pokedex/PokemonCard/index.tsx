import { FC, ReactNode } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Starred } from './starred';

import { Type } from './type';

import { usePokemonCard } from './usePokemonCard';

interface Properties {
  name: string;
}

export const PokemonCard: FC<Properties> = ({ name }) => {
  const { handlePress, index, isLoading, spriteURL, types } = usePokemonCard(name);

  if (isLoading) {
    return (
      <View style={styles.container} >
        <View style={styles.sprite} />
        <Starred pokemonName={name} />
        <View style={styles.indexPlaceholder} />
        <View style={styles.namePlaceholder} />
        <View style={styles.typePlaceholder} />
      </View>
    ); 
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image source={spriteURL} style={styles.sprite}/>
        <Starred pokemonName={name} />
        <Text style={styles.index}>#{index}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text>{types.map((type, index) => <Type key={index} name={type.name} />)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minWidth: 200,
    maxWidth: 200,
    width: 200,
    padding: 20,
  },
  index: {
    fontSize: 16,
  },
  indexPlaceholder: {
    backgroundColor: 'lightgray',
    borderRadius: 6,
    height: 24,
    width: 60,
    marginBottom: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  namePlaceholder: {
    backgroundColor: 'lightgray',
    borderRadius: 6,
    height: 24,
    marginBottom: 4,
    width: 100,
  },
  sprite: {
    backgroundColor: 'lightgray',
    borderRadius: 12,
    marginBottom: 8,
    height: 100,
    width: 100,
  },
  typePlaceholder: {
    backgroundColor: 'lightgray',
    borderRadius: 100,
    height: 36,
    marginTop: 4,
    width: 36,
  },
});
