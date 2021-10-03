import React, {useState, useEffect} from 'react';
import I18n from 'i18n-js';
import {View, ScrollView, Text} from 'react-native';
import firebase from 'firebase';
import {AnimalCard} from '../../components';

const AnimalsList = ({route, navigation}) => {
  const db = firebase.firestore();
  const [animals, setAnimals] = useState([]);
  const [allFieldsAnimals, setAllFieldsAnimals] = useState([]);
  const [name, setName] = useState();
  const [flag, setFlag] = useState(false);
  I18n.locale = 'pt';

  const getList = async () => {
    const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');

    db.collection('animal').where('values.creatorUser', '!=', email64).get().then((querySnapshot) => {
      let aux = [];
      let auxAll = [];
      let count = 0;
      querySnapshot.forEach((doc) => {
        auxAll.push(doc.get('values'));
        if(doc.get('values.photo') == null){
          const animal = {
            key: count++,
            nome: doc.get('values.name'),
            photo: 'https://firebasestorage.googleapis.com/v0/b/devapps-meau-9acf8.appspot.com/o/images%2Fanimals%2Fdefault%2Fdefault.jpg?alt=media&token=d3ffc04c-9048-45ea-9410-b12d00a381e5',
            hash: doc.id,
            creatorUser: doc.get('values.creatorUser'),
          };
          aux.push(animal);
        }else{
          const animal = {
            key: count++,
            nome: doc.get('values.name'),
            photo: doc.get('values.photo'),
            hash: doc.id,
            creatorUser: doc.get('values.creatorUser'),
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

  async function getCurrentName(){
    const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');

    await db.collection('users').doc(email64).get().then((querySnapshot) => {
      let fullName = querySnapshot.get('fullName');
      setName(fullName);
    }); 
    setFlag(true);
  } 

  const selectCard = (selectKey) => {
    console.log(`selectCard - selectKey: ${selectKey}`);
    navigation.navigate('AnimalProfileScreen', {animal: allFieldsAnimals[selectKey]});
  };

  useEffect(() => {
    getList();
    if(!flag){
      getCurrentName();
    }
    console.log(animals);
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{padding: 8}}>
        {allFieldsAnimals.map((animal) => (
          <AnimalCard
            animal={animal}
            currentUserName={name}
            key={animal.name + animal.photo}
            onPressCard={() => selectCard(animal.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AnimalsList;
