import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {Audio} from 'expo-av';
import firebase from 'firebase';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from './styles';

const Notifications = ({route, navigation}) => {
  const db = firebase.firestore();
  const dbAnimal = firebase.firestore();
  const [listNotifications, setListNotifications] = useState([]);
  const [sound, setSound] = React.useState();
  const [showAlert, setshowAlert] = useState(false);
  const [chosenKey, setChosenKey] = useState();

  const getNotifications = async () => {
    console.log('Searching for news notifications');
    const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');
    const aux = [];
    let key = 0;
    await db
      .collection('notifications')
      .where('ownerUser', '==', email64)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const noti = {
            key,
            id: doc.id,
            idAnimal: doc.get('idAnimal'),
            requesterUser: doc.get('requesterUser'),
            requesterId: doc.get('requesterId'),
            ownerUser: doc.get('ownerUser'),
            nameAnimal: doc.get('nameAnimal'),
            photoUser: doc.get('photoUser'),
          };
          key++;
          aux.push(noti);

          if (doc.get('notified') == false) {
            playSoundNotification();
            updateNotification(doc.id);
          }
        });
      })
      .catch((e) => {
        console.error(`Error: ${e}`);
      });
    setListNotifications(aux);
  };

  console.log('listNotifications: ', listNotifications);

  async function playSoundNotification() {
    const {sound} = await Audio.Sound.createAsync(require('../../sources/meow.mp3'));
    setSound(sound);
    await sound.playAsync();
  }

  function updateNotification(id) {
    console.log('Update state of notification');
    const update = firebase.firestore();
    update.collection('notifications').doc(id).update({
      notified: true,
    });
  }

  async function confirmNotification() {
    setshowAlert(false);
    // await dbAnimal.collection('notifications').doc(listNotifications[chosenKey].id).update({accepted: 'yes'});
    await dbAnimal
      .collection('animal')
      .doc(listNotifications[chosenKey].idAnimal)
      .update({'values.creatorUser': listNotifications[chosenKey].requesterId})
      .then((docRef) => {
        console.log(`Document written: ${docRef.id}`);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  function showAlertFun(key) {
    setChosenKey(key);
    setshowAlert(true);
  }

  function hideAlertFun() {
    setshowAlert(false);
  }

  useEffect(() => {
    getNotifications();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getNotifications();
    });

    return willFocusSubscription;
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scroolStyle}>
        {listNotifications.length === 0 && <Text>Você não possui notificações.</Text>}
        {listNotifications.map(({key, nameAnimal, requesterUser, photoUser}) => (
          <Card style={styles.card} onPress={() => showAlertFun(key)}>
            <View style={styles.mainView}>
              <Image source={{uri: photoUser}} style={styles.imageUser} />
              <Text style={styles.textAdopt}>
                {requesterUser} está pedindo para adotar o {nameAnimal}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
      <View style={styles.container}>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Adoção"
          message="Tem certeza que quer aceitar esta oferta de adoção?"
          closeOnTouchOutside
          closeOnHardwareBackPress={false}
          showCancelButton
          showConfirmButton
          cancelText="Recusar oferta"
          confirmText="Aceitar oferta"
          confirmButtonColor="#F4D03F"
          onCancelPressed={() => hideAlertFun()}
          onConfirmPressed={() => confirmNotification()}
        />
      </View>
    </View>
  );
};

export default Notifications;
