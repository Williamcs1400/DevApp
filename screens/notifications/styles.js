import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    height: 75,
    marginLeft: 20, 
    marginBottom: 15, 
    marginRight: 20, 
    backgroundColor: '#F4D03F',
    elevation: 5,
    borderRadius: 5,
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
    justifyContent: 'space-between'
  },
  scroolStyle: {
    paddingVertical: 10
  },
  imageUser: {
    height: 75,
    width: 75,
  },
  textAdopt: {
    marginLeft: 10,
    marginRight: 100,
    alignSelf: 'center',
    fontSize: 16,
    color: '#434343'
  },
});