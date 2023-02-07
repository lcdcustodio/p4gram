import React from 'react';
import {Image, View} from 'react-native';

import styles from './Tag.style';

const Tag = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../storage/images/aguia_01.png')}
      />
      <Image
        style={styles.image}
        source={require('../../storage/images/aguia_03.png')}
      />
    </View>
  );
};

export default Tag;
