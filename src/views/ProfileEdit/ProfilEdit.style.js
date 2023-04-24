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

  label2: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 50,
    //textAlign: 'center',

  },
  

  label: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 65,
    //textAlign: 'center',

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
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 0.7,
    borderColor: 'grey',

  },
  image2: {
    height: 34,
    width: 34,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 0.7,
    borderColor: 'grey',

  },
  login: {
    backgroundColor: '#0195f7',
    width: '85%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  position_btn: {
    height: 40,
    borderRadius: 2,
    backgroundColor: '#262626',
    justifyContent: 'center',
    marginVertical: 5,
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'center',
    width: '100%',
  },


  change: {
    color: '#0098fd',
    fontWeight: '500',
    fontSize: 18,
    marginTop: 15,
  },
  /*
  inputContainer: {
    justifyContent: 'space-around',
    height: '40%',
    marginLeft: 10,
  },
  */

  inputContainer: {
    justifyContent: 'center',
    height: '70%',
    marginLeft: 10,
  },
  inputLabel: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    

  },
  inputLabel2: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 0,
    marginBottom: 5,
    

  },

  input: {
    backgroundColor: 'black',
    fontSize: 18,
    marginTop: 0,
    marginBottom: 0,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
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
    borderWidth: 2,
    borderRadius: 2,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 2,
    marginTop: 10,
  },

  textInput2: {
    backgroundColor: 'black',    
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderRadius: 2,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 2,
    marginLeft: 2,
    marginRigth: 2,
    marginTop: 10,
  },


  keyboardView: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  position_header: {
    color: '#D8D8D8',
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 3,
    fontSize: 16,
    marginLeft: 0,
  },

  icon_pos: {
    
  },

  sheet2: {
    backgroundColor: '#262626',
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
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

  editText: {
    color: '#D8D8D8',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,

  },
  editText2: {
    color: '#D8D8D8',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    marginLeft: 4,

  },

});



/*
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
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
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
});
*/