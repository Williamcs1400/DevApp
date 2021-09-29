import React, {useState, useEffect} from 'react';
import I18n from 'i18n-js';
import {View, ScrollView} from 'react-native';
import firebase from 'firebase';
import {AnimalCard} from '../../components';

const AnimalsList = ({route, navigation}) => {
  const db = firebase.firestore();
  const [allFieldsAnimals, setAllFieldsAnimals] = useState([]);
  I18n.locale = 'pt';

  const getList = async () => {
    db.collection('animal')
      .get()
      .then((querySnapshot) => {
        const auxAll = [];
        querySnapshot.forEach((doc) => {
          auxAll.push(doc.get('values'));
        });
        setAllFieldsAnimals(auxAll);
      })
      .catch((e) => {
        console.error(`Error: ${e}`);
      });
  };

  const selectCard = (selectKey) => {
    console.log(`selectCard - selectKey: ${selectKey}`);
    navigation.navigate('AnimalProfileScreen', {animal: allFieldsAnimals[selectKey]});
  };

  function selectAdopt(selectKey) {
    console.log('selectAdopt:', selectKey);
  }

  useEffect(() => {
    getList();
    // console.log(animals);
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{padding: 8}}>
        {allFieldsAnimals.map((animal) => (
          <AnimalCard
            animal={animal}
            key={animal.name + animal.photo}
            onPressCard={() => selectCard(animal.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AnimalsList;
