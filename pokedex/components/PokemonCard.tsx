import { useEffect, useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import SkeletonContent from "react-native-reanimated-skeleton";

import { fetchPokemon, type Pokemon, type Sprites, type Type, } from "@/types/Pokemon";

import Bug from "@/assets/images/pokemon/bug.svg";
import Dark from "@/assets/images/pokemon/dark.svg";
import Dragon from "@/assets/images/pokemon/dragon.svg";
import Electric from "@/assets/images/pokemon/electric.svg";
import Fairy from "@/assets/images/pokemon/fairy.svg";
import Fighting from "@/assets/images/pokemon/fighting.svg";
import Fire from "@/assets/images/pokemon/fire.svg";
import Flying from "@/assets/images/pokemon/flying.svg";
import Ghost from "@/assets/images/pokemon/ghost.svg";
import Grass from "@/assets/images/pokemon/grass.svg";
import Ground from "@/assets/images/pokemon/ground.svg";
import Ice from "@/assets/images/pokemon/ice.svg";
import Normal from "@/assets/images/pokemon/normal.svg";
import Poison from "@/assets/images/pokemon/poison.svg";
import Psychic from "@/assets/images/pokemon/psychic.svg";
import Rock from "@/assets/images/pokemon/rock.svg";
import Steel from "@/assets/images/pokemon/steel.svg";
import Water from "@/assets/images/pokemon/water.svg";

import Ionicons from "@expo/vector-icons/Ionicons";

function Starred({ initialValue, isLoading } : { initialValue: boolean, isLoading: boolean }) {
  const [isStarred, setIsStarred] = useState<boolean>(initialValue);

  if (isLoading) {
    return <Ionicons name={isStarred ? "heart" : "heart-outline"} size={24} color="lightgray" />;
  }

  return (
    <TouchableOpacity onPress={() => setIsStarred(!isStarred)}>
      <Ionicons name={isStarred ? "heart" : "heart-outline"} size={24} color="black" />
    </TouchableOpacity>
  );
}

function getTypeIcon(type: string) {
  const icons = new Map<string, object>([
    ["bug", Bug],
    ["dark", Dark],
    ["dragon", Dragon],
    ["electric", Electric],
    ["fairy", Fairy],
    ["fighting", Fighting],
    ["fire", Fire],
    ["flying", Flying],
    ["ghost", Ghost],
    ["grass", Grass],
    ["ground", Ground],
    ["ice", Ice],
    ["normal", Normal],
    ["poison", Poison],
    ["psychic", Psychic],
    ["rock", Rock],
    ["steel", Steel],
    ["water", Water],
  ]);

  return icons.get(type.toLowerCase());
}

export function PokemonCard({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    async function fetchData(name: string) {
      fetchPokemon(name).then(setPokemon);
    }

    fetchData(name);
  }, [name]);

  if (pokemon == null) {
    return (
      <View style={styles.container}>
        <View style={styles.sprite}/>
        <Starred initialValue={false} isLoading={true}/>
        <View style={styles.indexPlaceholder}/>
        <View style={styles.namePlaceholder}/>
        <View style={styles.typePlaceholder}/>
      </View>
    ); 
  }

  const types: Type[] = pokemon.types.reduce((buffer, current) => buffer.concat(current.type), []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon.sprites.front_default}} style={styles.sprite}/>
      <Starred initialValue={false} isLoading={false}/>
      <Text style={styles.index}>#{pokemon.id.toString().padStart(4, "0")}</Text>
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text>
        {types.map((type, index) => {
          return (
            <View style={{ padding: 4}}>
              <Image source={getTypeIcon(type.name)} style={{ width: 36, height: 36 }}/>
            </View>
        )})}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    minWidth: 200,
    maxWidth: 200,
    width: 200,
    padding: 20,
  },
  index: {
    fontSize: 16,
  },
  indexPlaceholder: {
    backgroundColor: "lightgray",
    borderRadius: 6,
    height: 24,
    width: 60,
    marginBottom: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  namePlaceholder: {
    backgroundColor: "lightgray",
    borderRadius: 6,
    height: 24,
    marginBottom: 4,
    width: 100,
  },
  sprite: {
    backgroundColor: "lightgray",
    borderRadius: 12,
    marginBottom: 8,
    height: 100,
    width: 100,
  },
  typePlaceholder: {
    backgroundColor: "lightgray",
    borderRadius: 100,
    height: 36,
    marginTop: 4,
    width: 36,
  },
});
