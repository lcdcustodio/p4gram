import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
const defaultImage = require('../../../assets/images/maicon_01.png');
const ProfileHeader = ({route}) => {

  console.log('ProfileHeader');
  console.log(route);

  return (
    <View style={styles.container3}>
      <View>
        <Image
          source={route ? route.image : defaultImage}
          style={styles.image3}
        />
      </View>
      <View style={styles.numbers}>
        <View style={styles.left}>
          <Text style={styles.numberContainer}>3.854</Text>
          <Text style={styles.text}>Publicações</Text>
        </View>

        <View style={styles.mid}>
          <Text style={styles.numberContainer}>255 mil</Text>
          <Text style={styles.text}>Seguidores</Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.numberContainer}>2.483</Text>
          <Text style={styles.text}>Seguindo</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 10,
  },
  image3: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  numbers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '73%',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  numberContainer: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 5,
  },

  text: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
});
export default ProfileHeader;
