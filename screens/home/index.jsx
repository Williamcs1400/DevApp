import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import I18n from 'i18n-js';
import styles from './styles';
import firebase from 'firebase';
import firebaseConfig from '../../configFirebase'

const HomeScreen = ({navigation}) => {
  const [lang, setLang] = useState(I18n.locale);
  let [userIsLogged, setUserIsLogged] = useState('opa');

  const switchLang = () => {
    setLang(lang === 'pt' ? 'en' : 'pt');
    I18n.locale = lang;
  };

  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
  }

  firebase.auth().onAuthStateChanged(user =>{
    if(user != null){
      setUserIsLogged('Usuário está logado')
      console.log('User is logged');
    }
    if(user == null){
      setUserIsLogged('Usuário não está logado')
      console.log('User is not logged');
      navigation.navigate('Login');
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

  return (
    <View style={styles.home}>
      <Text style={styles.textLogged}>{userIsLogged}</Text>
      <Text>{I18n.t('home')}</Text>
      <Button
        title={I18n.t('goToDetails')}
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title={I18n.t('register')}
        onPress={() => navigation.navigate('Login')}
      />
      <Button title={lang} onPress={switchLang} />
      <Button title={I18n.t('signout')} onPress={signout} />
    </View>
  );
};

export default HomeScreen;
