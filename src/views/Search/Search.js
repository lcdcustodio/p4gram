import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Container from '../../components/Container/Container';
import SearchBar from '../../components/SearchBar/SearchBar';
import message from '../../storage/database/search_list';

import styles from '../Message/styles';

const Search = ({navigation}) => {
  return (
    <Container insets={{bottom: true, top: true}}>

      <ScrollView>
        <View style={{marginTop: 10}}>
          <SearchBar />
        </View>


        <View>
          {message.map((data, index) => {

            console.log('Search');
            console.log(data);

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate({
                    name: 'Search_details',                    
                    params: {
                      image: data.image,                      
                      name: data.name,
                      username: data.postName,
                      bio: data.bio,                      
                    },                    
                  });
                }}>
                <View style={styles.messageContainer}>
                  <Image style={styles.image} source={data.image} />
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.user}>{data.name}</Text>                    
                    <Text style={styles.message}>{data.postName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Container>
  );
};

export default Search;
