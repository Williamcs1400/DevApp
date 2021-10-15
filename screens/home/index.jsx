import React, {useState} from 'react';
import {View, Button} from 'react-native';
import I18n from 'i18n-js';
import {useTheme} from 'react-native-paper';
import firebase from 'firebase';
import styles from './styles';
import {PreferencesContext} from '../../preferencesContext';
import firebaseConfig from '../../configFirebase';

const HomeScreen = ({navigation}) => {
  const [lang, setLang] = useState(I18n.locale);
  const {colors, fonts} = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  const [userIsLogged, setUserIsLogged] = useState('Carregando');

  const switchLang = () => {
    setLang(lang === 'pt' ? 'en' : 'pt');
    I18n.locale = lang;
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setUserIsLogged('Usuário está logado');
      console.log('User is logged');
    }
    if (user == null) {
      setUserIsLogged('Usuário não está logado');
      console.log('User is not logged');
      navigation.navigate('ChangeEntry');
    }
  });

  function signout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('exit');
        // this.forceUpdate(); wtf?
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }

  return (
    <View style={{...styles.home, backgroundColor: colors.background}}>
      {/* <Text style={{color: colors.primary}}>{I18n.t('home')}</Text>

      <TouchableRipple>
        <Switch onValueChange={toggleTheme} color="red" value={isThemeDark} />
      </TouchableRipple>

      <Text style={{...fonts.thin, color: colors.text}}>thin</Text>
      <Text style={{...fonts.light, color: colors.text}}>light</Text>
      <Text style={{...fonts.regular, color: colors.text}}>regular</Text>
      <Text style={{...fonts.medium, color: colors.text}}>medium</Text>
      <Text style={{...fonts.bold, color: colors.text}}>bold</Text>

      <Button color={colors.primaryOrange} title="primaryOrange" />
      <Button color={colors.secondaryOrange} title="secondaryOrange" />
      <Button color={colors.terciaryOrange} title="terciaryOrange" />
      <Button color={colors.primaryTeal} title="primaryTeal" />
      <Button color={colors.secondaryTeal} title="secondaryTeal" />
      <Button color={colors.terciaryTeal} title="terciaryTeal" /> */}

      {/* <Button
        title={I18n.t('goToDetails')}
        onPress={() => navigation.navigate('Details')}
      /> */}
      {/* <Button title={lang} onPress={switchLang} />
      {/* <Button title={'Lista de animais'} onPress={() => navigation.navigate('AnimalsList', {type: 'all'})} /> */}
      {/* <Button
        color={colors.primaryOrange}
        title="Meus animais"
        onPress={() => navigation.navigate('AnimalsList', {type: 'my'})} */}
      {/* /> */}
      <Button title={I18n.t('signOut')} onPress={signout} />
      <Button
        color={colors.primaryOrange}
        title="Cadastro de animais"
        onPress={() => navigation.navigate('RegisterAnimalScreen')}
      />
      {/* <Button
        color={colors.primaryOrange}
        title="cadastro de bichos"
        onPress={() => navigation.navigate('AnimalsList')}
      /> */}
      {/* <Button color={colors.primaryTeal} title={lang} onPress={switchLang} /> */}
    </View>
  );
};

export default HomeScreen;
