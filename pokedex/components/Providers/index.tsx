import { FC, ReactNode } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FavoritesProvider } from '@/contexts/Favorites';

interface Properties {
  children: ReactNode;
}

export const Providers: FC<Properties> = ({ children }): ReactNode => {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </SafeAreaProvider>
  );
};
