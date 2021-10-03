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
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  scroolStyle: {
    paddingVertical: 10
  },
  imageUser: {
    height: 75,
    width: 75,
  },
});