import React from 'react';
import {View, ScrollView, Text} from 'react-native';

const ChatList = ({route, navigation}) => (
  <View style={{flex: 1}}>
    <ScrollView contentContainerStyle={{padding: 8}}>
      <Text>chats aparecerão aqui</Text>
    </ScrollView>
  </View>
);

export default ChatList;
