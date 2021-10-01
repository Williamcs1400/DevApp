import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Card, useTheme, IconButton, Button} from 'react-native-paper';
import I18n from 'i18n-js';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '..';
import firebase from 'firebase';

const AnimalCard = (props) => {
  const {colors} = useTheme();
  const {animal, onPressCard} = props;
  const db = firebase.firestore();
  const {username, setUsername} = useState();

  async function selectAdopt() {
    console.log('selectAdopt: ', animal.name);
    const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');

    if(animal.creatorUser != email64){
      await db.collection('notifications').add({
        requesterUser: email64,
        ownerUser: animal.creatorUser,
        nameAnimal: animal.name,
        photoAnimal: animal.photo,
        notified: false,
      }).then(function(docRef) {
        console.log("Document written notification: " + docRef.id);
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
    }
  }

  // useEffect(() => {
  //   const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');
  //   db.collection('users').doc(email64).get().then((docRef) => {
  //     setUsername(docRef.get('fullName'));
  //   });
  // }, []);

  return (
    <Card
      mode="elevated"
      elevation={6}
      theme={{roundness: 5}}
      style={{
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
      }}
      
    >
      <Card.Title
        style={{backgroundColor: colors.terciaryOrange, minHeight: 30}}
        titleStyle={{
          color: colors.primaryBlack,
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          fontSize: 24,
        }}
        title={animal.name}
        right={() => (
          <IconButton
            icon="alert-circle"
            color={colors.primaryBlack}
            style={{margin: 0, paddingRight: 12}}
            onPress={onPressCard}
          />
        )}
      />
      <Card.Cover
        source={{
          uri:
            animal.photo ||
            'https://firebasestorage.googleapis.com/v0/b/devapps-meau-9acf8.appspot.com/o/images%2Fanimals%2Fdefault%2Fdefault.jpg?alt=media&token=d3ffc04c-9048-45ea-9410-b12d00a381e5',
        }}
        style={{height:350}}
      />
      <Card.Content>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            paddingTop: 4,
          }}
        >
          {/* <Text color={colors.primaryBlack}>{animal.sex}</Text>
          <Text color={colors.primaryBlack}>{animal.age}</Text>
          <Text color={colors.primaryBlack}>{animal.size}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: -12,
          }}
        >
          <Text color={colors.primaryBlack}>LOCATION - CITY</Text> */}
          <TouchableOpacity onPress={() => selectAdopt()}>
            <Text style={{fontSize: 25, color: 'gray'}}>Adotar</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
};

export default AnimalCard;
