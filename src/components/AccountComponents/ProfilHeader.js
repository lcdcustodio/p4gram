import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import DefaultImage from '../../../assets/images/ftv.png';
const ProfileHeader = ({route}) => {

  console.log('ProfileHeader');
  //console.log(route.image);

  return (
    <View style={styles.container3}>
      <View>
        <Image
          source={route.image ? {uri: route.image} : DefaultImage}          
          style={styles.image3}
        />
      </View>
      <View style={styles.numbers}>
        <View style={styles.left}>
          <Text style={styles.numberContainer}>{route.scoreCount}</Text>
          <Text style={styles.text}>Pontuação</Text>
        </View>

        <View style={styles.mid}>
          <Text style={styles.numberContainer}>{route.matchCount}</Text>
          <Text style={styles.text}>Jogos</Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.numberContainer}>{route.followingCount}</Text>
          <Text style={styles.text}>Grupos</Text>
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
