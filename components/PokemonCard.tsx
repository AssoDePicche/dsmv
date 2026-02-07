import { useState } from "react";

import { Button, Image, Text, View } from "react-native";

import { Type, Sprites } from "@/types/Pokemon";

interface Properties {
  id: number;
  name: string;
  sprites: Sprites;
  types: Type[];
}

export function PokemonCard(properties: Properties) {
  const [isStarred, setIsStarred] = useState<boolean>(false);

  return (
    <View>
      <Button onPress={() => setIsStarred(!isStarred)} title={isStarred ? "Star" : "Remove Star"}/>
      <Image source={{ height: 100, uri: properties.sprites.front_default, width: 100}}/>
      <Text>{properties.name} {isStarred && "⭐"}</Text>
      <Text>#{properties.id.toString().padStart(4, "0")}</Text>
      <View>
        {properties.types.map((type, index) => (
          <View key={index}>
            <Text>{type.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
