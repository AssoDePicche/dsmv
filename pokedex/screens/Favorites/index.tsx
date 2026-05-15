import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export const Favorites = () => {
  return (
    <SafeAreaView style={styles.container}>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
