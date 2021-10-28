/* eslint-disable no-buffer-constructor */
/* eslint-disable react/prop-types */
import React, {createRef, useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useTheme, Avatar, Button} from 'react-native-paper';
import firebase from 'firebase';
import {TextInput, Text} from '../../components';

const MessageBox = ({message, initials}) => {
  const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');
  const {colors} = useTheme();

  return (
    <View
      style={{
        display: 'flex',
        // flexDirection: message.author === email64 ? 'row-reverse' : 'row',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: message.author === email64 ? colors.terciaryTeal : 'white',
        width: 280,
        alignSelf: message.author === email64 ? 'flex-end' : 'flex-start',
        borderRadius: 4,
        padding: 8,
        margin: 4,
      }}
    >
      <Text fontSize={16}>{`${message.message}`}</Text>
    </View>
  );
};

const getInitials = (fullName) => {
  let initials = fullName.split(' ') || [];

  initials = ((initials.shift()?.[0] || '') + (initials.pop()?.[0] || '')).toUpperCase();

  return initials;
};

const Chat = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState('');
  const [chatObj, setChatObj] = useState({});
  const [message, setMessage] = useState('');
  const [selfUser, setSelfUser] = useState({
    id: new Buffer(firebase.auth().currentUser.email).toString('base64'),
  });
  const [recipientUser, setRecipientUser] = useState({});
  const [initials, setInitials] = useState({self: '', other: ''});
  const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');
  const {colors} = useTheme();

  // pegar o campo chats do user
  // acessar o chat com id certo

  const docRef = firebase.firestore().collection('users').doc(email64);
  const recipientDocRef = firebase.firestore().collection('users').doc(route.params.user);

  const fetchSelfUser = async () => {
    const docSnap = await docRef.get();
    setSelfUser(docSnap.data());
    const selfInitials = getInitials(docSnap.data().fullName);
    setInitials({...initials, self: selfInitials});
  };

  const fetchUser = async (userId) => {
    const user = firebase.firestore().collection('users').doc(userId);
    const userData = await user.get();
    setRecipientUser(userData.data());
    const otherInitials = getInitials(userData.data().fullName);
    setInitials({...initials, other: otherInitials});
  };

  const fetchChatFromId = async (id) => {
    const chat = await firebase.firestore().collection('chats').doc(id).get();
    setChatObj(chat.data());
    setMessages(chat.data().messages);
    fetchUser(chat.data().users.recipient.replace(/\s/g, ''));
  };

  const fetchChatFromUser = async () => {
    const existingChat = selfUser.chats.find((chat) => chat.user === route.params.user);
    // console.log(existingChat);

    if (existingChat) {
      console.log('existe chat');
      // pegar chat já existente com o usuario
      const chat = await firebase
        .firestore()
        .collection('chats')
        .doc(existingChat.id.replace(/\s/g, ''))
        .get();
      // console.log(chat.data().messages);
      setChatId(existingChat.id.replace(/\s/g, ''));
      setMessages(chat.data().messages);
    }
  };

  const createNewChat = async () => {
    console.log('criando novo chat');
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
    setChatId(res.id.replace(/\s/g, ''));

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
  };

  useEffect(() => {
    console.log('entrando chat');
    console.log(route.params);
    setMessages([]);
    fetchSelfUser();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchSelfUser();
    });

    return willFocusSubscription;
  }, []);

  useEffect(() => {
    if (route.params.chatId) {
      const id = route.params.chatId.replace(/\s/g, '');
      setChatId(id);
      fetchChatFromId(id);
    } else if (route.params.user) {
      fetchChatFromUser();
    }
  }, [selfUser]);

  useEffect(() => {
    console.log('atualizou chatId');
    console.log(chatId);
    if (message) {
      sendMessage();
    }
    if (chatId) {
      const doc = firebase.firestore().collection('chats').doc(chatId);

      const observer = doc.onSnapshot(
        (docSnapshot) => {
          setMessages(docSnapshot.data().messages);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        },
      );
    }
  }, [chatId]);

  const ref = createRef();
  const sendMessage = async () => {
    if (!chatId) {
      await createNewChat();
      return;
    }
    if (message && chatId) {
      console.log('sending message');
      // messages.push({author: 'eu', message});
      const messageObj = {
        author: email64,
        message,
        timestamp: Date.now(),
      };
      setMessage('');
      ref.current.clear();
      const chatRef = firebase.firestore().collection('chats').doc(chatId);
      chatRef.update({
        last: messageObj,
        messages: firebase.firestore.FieldValue.arrayUnion(messageObj),
      });
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 8}}>
        {recipientUser && <Text>Chat com {recipientUser.fullName}</Text>}
        {messages.map((mes) => (
          <MessageBox key={mes.timestamp} message={mes} initials={initials} />
        ))}
      </ScrollView>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 4}}
      >
        <View style={{flex: 5}}>
          <TextInput onChange={setMessage} value={message} ref={ref} />
        </View>
        <TouchableOpacity onPress={() => sendMessage()} style={{marginRight: 12}}>
          <Avatar.Icon
            icon="send"
            style={{backgroundColor: colors.secondaryTeal}}
            size={52}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
