import React, {useState, useEffect} from 'react';
import {View, Button, Text, Pressable} from 'react-native';
import I18n from 'i18n-js';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {PreferencesContext} from '../../preferencesContext';
import firebase from 'firebase';
import firebaseConfig from '../../configFirebase'

const HomeScreen = ({navigation}) => {
  const [lang, setLang] = useState(I18n.locale);
  const {colors, fonts} = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  let [name, setName] = useState('Carregando');
  const db = firebase.firestore();

  const switchLang = () => {
    setLang(lang === 'pt' ? 'en' : 'pt');
    I18n.locale = lang;
  };

  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
  }

  firebase.auth().onAuthStateChanged(user =>{
    if(user != null){
      console.log('User is logged');
    }
    if(user == null){
      console.log('User is not logged');
      navigation.navigate('ChangeEntry');
    }
  });

  function signout(){
    firebase.auth().signOut().then(() => {
      console.log('exit');
      this.forceUpdate();
    }).catch((error) => {
      console.log('error: ' + error);
    });
  }
  
  async function getUserName(){
    const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');
    await db.collection('users').doc(email64).get().then((querySnapshot) => {
      let names = querySnapshot.get('fullName').split(' ');
      setName(names[0])
    });
  }

  console.log('')
  useEffect(() => {
    getUserName();
  }, []);

  return (
    <View style={{...styles.home, backgroundColor: colors.background}}>
      <Text style={styles.textName}>Olá, {name}</Text>
      <Pressable style={styles.button} onPress={signout}>
        <Text style={styles.text}>Sair</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;