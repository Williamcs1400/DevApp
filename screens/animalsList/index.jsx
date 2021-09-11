import React, { useState, useEffect } from 'react';
import {View, Button, Text, ScrollView} from 'react-native';
import firebase from 'firebase';

const AnimalsList = (props) => {
  const dbUser = firebase.firestore();

  useEffect(() => {
    dbUser.collection('animal').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log('Dados: ', doc.data());
        });
    });
  });

  return(
    <View style={{alignItems:"center", alignSelf:'center'}}>
      <Text style={{fontSize:40}}>Lista de animais</Text>
    </View>
  );
};

export default AnimalsList;