import React, { useState, useEffect, Component } from 'react';
import {View, Text, ScrollView, Linking, FlatList, Image, StyleSheet } from 'react-native';
import {Button, Container } from 'react-native-elements';
import {useTheme, Card} from 'react-native-paper';
import firebase from 'firebase';
import styles from './styles';

const AnimalsList = (props) => {
  const dbUser = firebase.firestore();
  const {colors, fonts} = useTheme();

  const [animals, setAnimals] = useState([]);
  let cont = 0;

  const getList = () => {
    dbUser.collection('animal').get()
      .then((querySnapshot) => {
        let aux = []
        querySnapshot.forEach((doc) => {
            if(doc.get('photo') == null){
              const animal = {
                nome: doc.get('values.name'),
                photo: 'https://firebasestorage.googleapis.com/v0/b/devapps-meau-9acf8.appspot.com/o/images%2Fanimals%2Fdefault%2Fdefault.jpg?alt=media&token=d3ffc04c-9048-45ea-9410-b12d00a381e5',
              };
              aux.push(animal);
            }else{
              const animal = {
                nome: doc.get('values.name'),
                photo: doc.get('photo'),
              };
              aux.push(animal);
            }
        });
        setAnimals(aux);     
      })
      .catch((e) => {
        console.error('Error: ' + e);
      });
  };

  useEffect(() => {
    getList();
    console.log(animals);
  }, []);

  return(
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      {animals.map(({ nome, photo}) => (
        
        <Card style={styles.card}>
          <Text style={styles.textCard}>
            {nome}
          </Text>
          <Image
          style={{width: '100%',height: 400, alignSelf:'center'}}
          source={{uri: photo}}>
          
          </Image>
        </Card>
        
      ))}
    </ScrollView>
  </View>
    );
  };

export default AnimalsList;