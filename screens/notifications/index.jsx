import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView } from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import { Audio } from 'expo-av';
import firebase from 'firebase';
import styles from './styles'

const Notifications = ({route, navigation}) => {
  const db = firebase.firestore();
  const [listNotifications, setListNotifications] = useState([]);
  const [sound, setSound] = React.useState();

  const getNotifications = async () => {
    console.log('Searching for news notifications');
    const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');
    let aux = [];

    await db.collection('notifications').where('ownerUser', '==', email64).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          const noti = {
            idAnimal: doc.get('idAnimal'),
            requesterUser: doc.get('requesterUser'),
            ownerUser: doc.get('ownerUser'),
            nameAnimal: doc.get('nameAnimal'),
          };
          aux.push(noti);

          if(doc.get('notified') == false){
            playSoundNotification();
            updateNotification(doc.id)
          }

        });
      }).catch((e) => {
        console.error('Error: ' + e);
      });
    setListNotifications(aux);
    setTimeout(getNotifications, 10000);
  }

  async function playSoundNotification(){
    const { sound } = await Audio.Sound.createAsync(require('../../sources/meow.mp3'));
    setSound(sound);
    await sound.playAsync()
  }

  function updateNotification(id){
    console.log('Update state of notification');
    const update = firebase.firestore();
    update.collection('notifications').doc(id).update({
      notified: true
    })
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return(
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      {listNotifications.map(({ nameAnimal, ownerUser, requesterUser}) => (
        <Card style={styles.card}>
          <Text>{requesterUser} está pedindo para adotar o {nameAnimal}</Text>
        </Card>
      ))}
    </ScrollView>
  </View>
  );
};

export default Notifications;