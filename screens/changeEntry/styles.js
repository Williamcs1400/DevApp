import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  home: {
    flex: 1,
    marginTop: 100, 
    alignItems: 'center',
  },
  imageOps:{
    width: 0, 
    height: 0,
  },
  textRegister:{
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
    marginTop: 70,
    marginLeft: 30,
    marginRight: 30,
  },
  textLogin:{
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  textButton:{
    textAlign: 'center',
    fontSize: 17,
    color: 'gray',
    fontWeight: 'bold'
  }, 
  button:{
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: '50%',
    height: 50,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: "#88c9bf",
  }
});
