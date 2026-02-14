import { useCallback, useEffect, useState } from "react";

import { ActivityIndicator, FlatList, View } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { PokemonCard } from "@/components/PokemonCard";

import { fetchPokemonResourceList, type PokemonResource, type PokemonResourceList } from "@/types/Pokemon";

export default function Index() {
  const [data, setData] = useState<PokemonResource[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [hasNext, setHasNext] = useState(true);

  const [offset, setOffset] = useState(0);

  const [limit, setLimit] = useState(0);

  const fetchData = useCallback(async () => {
    if (isLoading || !hasNext) {
      return;
    }

    setIsLoading(true);

    const resourceList: PokemonResourceList = await fetchPokemonResourceList(offset, limit);

    setData((previous: PokemonResource[]) => [...new Set([...previous, ...resourceList.results])]);

    setHasNext(resourceList.next != null);

    setIsLoading(false);
  }, [offset, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderFooter = () => isLoading ? <ActivityIndicator size="large"/> : null;

  const renderItem = ({ item }: { item: PokemonResource }) => <PokemonCard name={item.name}/>;

  const onEndReached = () => {
    setOffset((previous) => previous + 20);

    setLimit((previous) => previous + 20);

    fetchData();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(resource: PokemonResource) => resource.url}
          numColumns={4}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
