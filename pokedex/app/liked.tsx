import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Liked() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
