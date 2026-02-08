import { useEffect, useState } from "react";

import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

import { fetchPokemon, type Pokemon, type Sprites, type Type, } from "@/types/Pokemon";

import Octicons from "@expo/vector-icons/Octicons";

export function PokemonCard({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const [isStarred, setIsStarred] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData(name: string) {
      fetchPokemon(name).then(setPokemon);
    }

    fetchData(name);
  }, [name]);

  if (pokemon == null) {
    return (
      <View>
        <ActivityIndicator size="large"/>
      </View>
    ); 
  }

  const types: Type[] = pokemon.types.reduce((buffer, current) => buffer.concat(current.type), []);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsStarred(!isStarred)}>
        <Octicons name={isStarred ? "star-fill" : "star"} size={24} color="black" />
      </TouchableOpacity>
      <Image source={{ height: 100, uri: pokemon.sprites.front_default, width: 100}}/>
      <Text>
        {pokemon.name}
      </Text>
      <Text>#{pokemon.id.toString().padStart(4, "0")}</Text>
      <View>
        {types.map((type, index) => (
          <View key={index}>
            <Text>{type.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
