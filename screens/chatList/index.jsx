import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import firebase from 'firebase';
import {Avatar, Card, useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from '../../components';

const getInitials = (fullName) => {
  let initials = fullName.split(' ') || [];

  initials = ((initials.shift()?.[0] || '') + (initials.pop()?.[0] || '')).toUpperCase();

  return initials;
};

const Chat = ({chatObj, onPressCallback}) => {
  const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={onPressCallback}>
      <Card.Title
        title={chatObj.user.name}
        titleStyle={{color: colors.primaryTeal, fontSize: 16}}
        subtitle={`${chatObj.lastMessage.author === email64 ? 'Enviado:' : ''} ${
          chatObj.lastMessage.message.length > 25
            ? `${chatObj.lastMessage.message.substring(0, 25)}...`
            : chatObj.lastMessage.message
        }`}
        subtitleStyle={{color: colors.secondaryBlack, fontSize: 16}}
        left={() =>
          chatObj.user.photo ? (
            <Avatar.Image size={52} source={{uri: chatObj.user.photo}} />
          ) : (
            <Avatar.Text size={52} label={getInitials(chatObj.user.name)} />
          )
        }
        leftStyle={{alignSelf: 'center', marginTop: 10, marginRight: 24}}
        right={() => (
          <Text fontWeight="regular" color={colors.secondaryBlack}>{`${new Date(
            chatObj.lastMessage.timestamp,
          )
            .getHours()
            .toString()
            .padStart(2, '0')}:${new Date(chatObj.lastMessage.timestamp)
            .getMinutes()
            .toString()
            .padStart(2, '0')}`}</Text>
        )}
        rightStyle={{alignSelf: 'flex-start', marginTop: 18}}
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
    if (!docSnap.data().chats) {
      return;
    }
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
          photo: user.data().photoURL,
        },
        lastMessage: lastMessage.data().last,
      };

      return chatObj;
    });

    Promise.all(chatListArray).then((resolved) => {
      resolved.sort((a, b) => a.lastMessage.timestamp < b.lastMessage.timestamp);
      setChatList(resolved);
    });
  };

  useEffect(() => {
    fetchChatList();

    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchChatList();
    });

    return willFocusSubscription;
  }, []);
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{padding: 8}}>
        {chatList.map((c) => (
          <Chat
            chatObj={c}
            key={c.id}
            onPressCallback={() =>
              navigation.jumpTo('Chat', {user: c.user.id, chatId: c.id})
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatList;
