import React, {useState} from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import I18n from 'i18n-js';
import styles from './styles';
import firebase from 'firebase'
import * as GoogleSignIn from 'expo-google-sign-in';

const Login = ({navigation}) => {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangepassword] = React.useState(null);

  function loginEmailAndPassword(){
    if(email != null && password != null){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Home')

      })
      .catch(error => {
        console.log('ERROR')
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
        console.error(error);
      });
    }
  }

  /*function loginGoogle(){
    state = { user: null };

    
    initAsync = async () => {
      await GoogleSignIn.initAsync();
      this._syncUserWithStateAsync();
    };
  
    _syncUserWithStateAsync = async () => {
      const user = await GoogleSignIn.signInSilentlyAsync();
      this.setState({ user });
    };
  
    signOutAsync = async () => {
      await GoogleSignIn.signOutAsync();
      this.setState({ user: null });
    };
  
    signInAsync = async () => {
      try {
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();
        if (type === 'success') {
          console.log('SUCESSO GOOGLE')
          this._syncUserWithStateAsync();
        }
      } catch ({ message }) {
        alert('login: Error:' + message);
      }
    };  
  }*/
  
  return (
    <SafeAreaView style={styles.home}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email"
        keyboardType={'email-address'}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={onChangepassword}
        value={password}
        placeholder={I18n.t('password')}
      />
      <Button 
        title={
          I18n.t('confirm')}
          onPress={() => loginEmailAndPassword()}></Button>
        {/*<Button 
          title={I18n.t('confirm') + ' Google'}
          onPress={() => loginGoogle()}
        ></Button>*/}
    </SafeAreaView>
  );
};

export default Login;
