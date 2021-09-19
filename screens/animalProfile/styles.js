import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewInternal:{
    padding: 20
  },
  textFielf: {
    color: '#589b9b',
    fontSize: 20,
  },
  textName: {
    color: '#434343',
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 8,
  },
  textValue: {
    color: '#434343',
    fontSize: 15,
  }, 
  listHorizontal: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
    justifyContent: 'space-between'
  }
});
