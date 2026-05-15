import { FC, ReactNode } from 'react';

import { Image, StyleSheet, View } from 'react-native';

import Bug from '@/assets/images/pokemon/bug.svg';
import Dark from '@/assets/images/pokemon/dark.svg';
import Dragon from '@/assets/images/pokemon/dragon.svg';
import Electric from '@/assets/images/pokemon/electric.svg';
import Fairy from '@/assets/images/pokemon/fairy.svg';
import Fighting from '@/assets/images/pokemon/fighting.svg';
import Fire from '@/assets/images/pokemon/fire.svg';
import Flying from '@/assets/images/pokemon/flying.svg';
import Ghost from '@/assets/images/pokemon/ghost.svg';
import Grass from '@/assets/images/pokemon/grass.svg';
import Ground from '@/assets/images/pokemon/ground.svg';
import Ice from '@/assets/images/pokemon/ice.svg';
import Normal from '@/assets/images/pokemon/normal.svg';
import Poison from '@/assets/images/pokemon/poison.svg';
import Psychic from '@/assets/images/pokemon/psychic.svg';
import Rock from '@/assets/images/pokemon/rock.svg';
import Steel from '@/assets/images/pokemon/steel.svg';
import Water from '@/assets/images/pokemon/water.svg';

const icons = new Map<string, object>([
    ['bug', Bug],
    ['dark', Dark],
    ['dragon', Dragon],
    ['electric', Electric],
    ['fairy', Fairy],
    ['fighting', Fighting],
    ['fire', Fire],
    ['flying', Flying],
    ['ghost', Ghost],
    ['grass', Grass],
    ['ground', Ground],
    ['ice', Ice],
    ['normal', Normal],
    ['poison', Poison],
    ['psychic', Psychic],
    ['rock', Rock],
    ['steel', Steel],
    ['water', Water],
]);

interface Properties {
  name: string;
}

export const Type: FC<Properties> = ({ name }): ReactNode => {
  const url = icons.get(name.toLowerCase());

  return (
    <View style={styles.padding}>
      <Image source={url} style={styles.image}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  image: {
    height: 36,
    width: 36,
  },
});
