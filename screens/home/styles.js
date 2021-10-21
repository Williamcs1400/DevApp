import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textName:{
    textAlign: 'center',
    fontSize: 45,
    color: 'gray',
    marginTop: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#ffd358',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
