import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    marginLeft: 20, 
    marginBottom: 20, 
    marginRight: 20, 
    backgroundColor: '#cfe9e5',
    elevation: 5,
    borderRadius: 2,
  },
  textCard:{
    fontSize: 30,
    color: '#434343',
    paddingLeft: 15,
    paddingBottom: 5,
    alignSelf: 'center',
  },
  flex:{
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  iconAlert:{
    alignItems: 'flex-end',
  },
  viewBottom:{
    padding: 5,
    backgroundColor: '#F6FAFD'
  },
  textBottom:{ 
    fontSize: 25,
    color: '#434343',
    alignSelf: 'center',
  }
});
