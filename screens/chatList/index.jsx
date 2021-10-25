import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import firebase from 'firebase';
import {Avatar, Card} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from '../../components';

const getInitials = (fullName) => {
  let initials = fullName.split(' ') || [];

  initials = ((initials.shift()?.[0] || '') + (initials.pop()?.[0] || '')).toUpperCase();

  return initials;
};

const Chat = ({chatObj, onPressCallback}) => {
  const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');

  return (
    <TouchableOpacity onPress={onPressCallback}>
      <Card.Title
        title={chatObj.user.name}
        subtitle={`${chatObj.lastMessage.author === email64 ? 'Enviado:' : ''} ${
          chatObj.lastMessage.message.length > 25
            ? `${chatObj.lastMessage.message.substring(0, 25)}...`
            : chatObj.lastMessage.message
        }`}
        left={() => <Avatar.Text size={42} label={getInitials(chatObj.user.name)} />}
        right={() => (
          <Text fontWeight="light">{`${new Date(
            chatObj.lastMessage.timestamp,
          ).getHours()}:${new Date(chatObj.lastMessage.timestamp).getMinutes()}`}</Text>
        )}
      />
    </TouchableOpacity>
  );
};
const ChatList = ({route, navigation}) => {
  const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');

  const [chatList, setChatList] = useState([]);

  const fetchChatList = async () => {
    // pegar o campo chats do user
    // acessar o chat com id certo

    const docRef = firebase.firestore().collection('users').doc(email64);
    const docSnap = await docRef.get();
    const chatListArray = docSnap.data().chats.map(async (chat) => {
      const user = await firebase.firestore().collection('users').doc(chat.user).get();
      const lastMessage = await firebase
        .firestore()
        .collection('chats')
        .doc(chat.id.replace(/\s/g, ''))
        .get('last');

      const chatObj = {
        id: chat.id,
        user: {
          id: chat.user,
          name: user.data().fullName,
        },
        lastMessage: lastMessage.data().last,
      };

      return chatObj;
    });

    Promise.all(chatListArray).then((resolved) => {
      setChatList(resolved);
      console.log(resolved);
    });
  };

  useEffect(() => {
    fetchChatList();
  }, []);
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{padding: 8}}>
        {chatList.map((c) => (
          <Chat
            chatObj={c}
            key={c.id}
            onPressCallback={() => navigation.navigate('Chat', {user: c.user.id})}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatList;
