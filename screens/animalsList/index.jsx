import React, { useState, useEffect } from 'react';
import I18n from 'i18n-js';
import {View, Text, ScrollView, Image } from 'react-native';
import {useTheme, Card, IconButton} from 'react-native-paper';
import firebase from 'firebase';
import styles from './styles';

const AnimalsList = ({navigation}, props) => {
  const db = firebase.firestore();
  const [animals, setAnimals] = useState([]);
  const [allFieldsAnimals, setAllFieldsAnimals] = useState([]);
  I18n.locale = 'pt';
  let cont = 0;

  const getList = () => {
    db.collection('animal').get()
      .then((querySnapshot) => {
        let aux = []
        let auxAll = []
        querySnapshot.forEach((doc) => {
            auxAll.push(doc.get('values'));

            if(doc.get('values.photo') == null){
              const animal = {
                key: cont++,
                nome: doc.get('values.name'),
                photo: 'https://firebasestorage.googleapis.com/v0/b/devapps-meau-9acf8.appspot.com/o/images%2Fanimals%2Fdefault%2Fdefault.jpg?alt=media&token=d3ffc04c-9048-45ea-9410-b12d00a381e5',
              };
              aux.push(animal);
            }else{
              const animal = {
                key: cont++,
                nome: doc.get('values.name'),
                photo: doc.get('values.photo'),
              };
              aux.push(animal);
            }
        });
        setAnimals(aux);
        setAllFieldsAnimals(auxAll);
      })
      .catch((e) => {
        console.error('Error: ' + e);
      });
  };

  function selectCard(selectKey){
    console.log('selectCard - selectKey: ' + selectKey);
    navigation.navigate('AnimalProfileScreen', {animal: allFieldsAnimals[selectKey]});
  }
  
  function selectAdopt(selectKey){
    console.log('selectAdopt:', selectKey);
  }

  useEffect(() => {
    getList();
    // console.log(animals);
  }, []);

  return(
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      {animals.map(({ nome, photo, key}) => (
        <Card style={styles.card}>
          <View style={styles.flex}>
            <Text style={styles.textCard}>
              {nome}
            </Text>
            <IconButton
              icon="alert-circle"
              color={'#434343'}
              size={30}
              style={styles.iconAlert}
              onPress={() => selectCard(key)}
            />
          </View>
          <Image
            style={{width: '100%',height: 400, alignSelf:'center'}}
            source={{uri: photo}}>          
          </Image>
          <View style={styles.viewBottom} >
            <Text style={styles.textBottom} onPress={() => selectAdopt(key)}>
              {I18n.t('toAdopt')}
            </Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  </View>
    );
  };

export default AnimalsList;