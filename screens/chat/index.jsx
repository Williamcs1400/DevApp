import React, {createRef, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-paper';
import firebase from 'firebase';
import {TextInput} from '../../components';

const MessageBox = ({message}) => (
  <Text>{`<${message.author}> - ${message.message}`}</Text>
);

const messages = [
  {
    author: 'eu',
    message: 'teste',
  },
  {
    author: 'voce',
    message: 'teste2',
  },
  {
    author: 'eu',
    message: 'teste',
  },
  {
    author: 'voce',
    message: 'teste2',
  },
];

const Chat = ({route, navigation}) => {
  const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');
  const me = firebase
    .firestore()
    .collection('users')
    .doc(email64)
    .get()
    .then((a) => console.log(a));
  const [message, setMessage] = useState('');
  const ref = createRef();
  const sendMessage = () => {
    if (message) {
      messages.push({author: 'eu', message});
      setMessage('');
      ref.current.clear();
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{padding: 8}}>
        <Text>chat com {route.params.user}</Text>
        {messages.map((mes) => (
          <MessageBox message={mes} />
        ))}
        <TextInput onChange={setMessage} value={message} ref={ref} />
        <Button onPress={() => sendMessage()}>Enviar</Button>
      </ScrollView>
    </View>
  );
};

export default Chat;
