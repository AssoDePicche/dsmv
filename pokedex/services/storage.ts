import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key: string) => AsyncStorage.getItem(key);

export const setItem = async (key: string, value: string) => AsyncStorage.setItem(key, value);
