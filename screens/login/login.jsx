import React, {useState, setState} from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import I18n from 'i18n-js';
import styles from './styles';
import firebase from 'firebase';
import {TextInput} from '../../components';
global.Buffer = global.Buffer || require('buffer').Buffer

const Login = ({navigation}) => {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangepassword] = React.useState(null);
  const dbUser = firebase.firestore();

  function loginEmailAndPassword(){
    if(email != null && password != null){
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
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

    }else{
      console.log('Email ou senha vazios')
    }
  }
  
  return (
    <SafeAreaView style={styles.home}>
      <TextInput
        style={styles.input}
        onChange={(t) => onChangeEmail(t)}
        value={email}
        label="Email"
        autoCapitalize='none'
        placeholder="Email"
        keyboardType={'email-address'}
      />
      <TextInput
        style={styles.input}
        onChange={(t) => onChangepassword(t)}
        value={password}
        label={I18n.t('password')}
        isSecure={true}
        placeholder={I18n.t('password')}
      />
      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={() => loginEmailAndPassword()}
        >
        <Text>{I18n.t('confirm')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
