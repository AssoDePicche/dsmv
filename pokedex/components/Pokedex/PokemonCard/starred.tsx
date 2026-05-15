import { FC, ReactNode, useState } from 'react';

import { TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

interface Properties {
  initialValue: boolean;
  isLoading: boolean;
}

export const Starred: FC<Properties> = ({ initialValue, isLoading }) => {
  const [isStarred, setIsStarred] = useState<boolean>(initialValue);

  if (isLoading) {
    return <Ionicons name={isStarred ? 'heart' : 'heart-outline'} size={24} color='lightgray' />;
  }

  return (
    <TouchableOpacity onPress={() => setIsStarred(!isStarred)}>
      <Ionicons name={isStarred ? 'heart' : 'heart-outline'} size={24} color='black' />
    </TouchableOpacity>
  );
}
