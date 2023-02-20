import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  body: {
    backgroundColor: 'black',
    flex: 1,
    padding: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  icon: {paddingRight: 25},

  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    margin: 30,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  change: {
    color: '#0098fd',
    fontWeight: '500',
    fontSize: 18,
    marginTop: 15,
  },
  inputContainer: {
    justifyContent: 'space-around',
    height: '40%',
    marginLeft: 10,
  },
  inputLabel: {
    color: 'grey',
    fontWeight: '500',
  },
  input: {
    color: 'white',
    fontSize: 19,
  },
  /*
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  */
  line: {
    borderBottomColor: '#3a3a3a',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },


  blueText: {
    color: '#0098fd',
    fontSize: 18,
    marginLeft: 10,
  },
  blueContainer: {
    justifyContent: 'space-around',
    height: '25%',
  },
  sheetText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 17,
  },
  textInput: {
    backgroundColor: '#3a3a3a',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 6,
    paddingRight: 6,
    marginBottom: 20,
  },
  keyboardView: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  create: {
    backgroundColor: '#0195f7',    
    width: '100%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    type:"outline",    
    backgroundColor: '#ffffff',
    padding: 10,    
  
  },
  createText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },

  sheet2: {
    backgroundColor: '#262626',
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sheet3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label2: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 15,
  },
  label3: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 15,
  },

});
