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

    db.collection('animal').get().then((querySnapshot) => {
      let aux = []
      let auxAll = []
      querySnapshot.forEach((doc) => {
        auxAll.push(doc.get('values'));
        if(doc.get('values.photo') == null){
          const animal = {
            key: cont++,
            nome: doc.get('values.name'),
            photo: 'https://firebasestorage.googleapis.com/v0/b/devapps-meau-9acf8.appspot.com/o/images%2Fanimals%2Fdefault%2Fdefault.jpg?alt=media&token=d3ffc04c-9048-45ea-9410-b12d00a381e5',
            hash: doc.id
          };
          aux.push(animal);
        }else{
          const animal = {
            key: cont++,
            nome: doc.get('values.name'),
            photo: doc.get('values.photo'),
            hash: doc.id
          };
          aux.push(animal);
        }
      });
        setAnimals(aux);
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
    const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64')
    
    if(allFieldsAnimals[selectKey].creatorUser != email64){
      db.collection('notifications').add({
        requesterUser: email64,
        ownerUser: allFieldsAnimals[selectKey].creatorUser,
        idAnimal: animals[selectKey].hash,
        nameAnimal: animals[selectKey].nome,
        photoAnimal: animals[selectKey].photo,
        notified: false,
      }).then(function(docRef) {
        console.log("Document written notification: " + docRef.id);
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });;
    }
  }

  useEffect(() => {
    getList();
    console.log(animals);
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
