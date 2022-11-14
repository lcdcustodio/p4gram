import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: '20%',
  },
  label: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  labelText: {
    color: '#acacac',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  category: {
    color: 'white',
    marginLeft: 15,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 15,
  },
  btn: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#0195f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  line: {
    borderBottomWidth: 0.6,
    borderBottomColor: '#3a3a3a',
    marginBottom: 15,
  },
});
