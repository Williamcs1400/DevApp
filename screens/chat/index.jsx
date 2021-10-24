import React, {createRef, useState, useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-paper';
import firebase from 'firebase';
import {TextInput} from '../../components';

const MessageBox = ({message}) => (
  <Text>{`<${message.author}> - ${message.message}`}</Text>
);

const Chat = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');

  // pegar o campo chats do user
  // acessar o chat com id certo

  const docRef = firebase.firestore().collection('users').doc(email64);
  const recipientDocRef = firebase.firestore().collection('users').doc(route.params.user);
  const fetchChat = async () => {
    const docSnap = await docRef.get();
    const existingChat = docSnap.data().chats.find((chat) => {
      chat.user === route.params.user;
    });

    if (existingChat) {
      // pegar chat já existente com o usuario
      const chat = await firebase
        .firestore()
        .collection('chats')
        .doc(existingChat.id.replace(/\s/g, ''))
        .get();
      console.log(chat.data().messages);
      setMessages(chat.data().messages);
    } else {
      // criar chat com a pessoa
      // pegar o id gerado do chat e adicionar o chat no perfil dos dois usuarios
      const newChat = {
        last: {
          author: '',
          message: '',
          timestamp: null,
        },
        messages: [],
        users: {
          creator: email64,
          recipient: route.params.user,
        },
      };
      const res = await firebase.firestore().collection('chats').add(newChat);
      setMessages([{author: 'eu', message: res.id}]);

      docRef.update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          id: res.id,
          user: route.params.user,
        }),
      });

      recipientDocRef.update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          id: res.id,
          user: email64,
        }),
      });
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

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
          <MessageBox key={mes.message} message={mes} />
        ))}
        <TextInput onChange={setMessage} value={message} ref={ref} />
        <Button onPress={() => sendMessage()}>Enviar</Button>
      </ScrollView>
    </View>
  );
};

export default Chat;
