import React, {useEffect, useState} from 'react';
import {useLinkBuilder, DrawerActions, CommonActions} from '@react-navigation/native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View} from 'react-native';
import {Avatar, useTheme} from 'react-native-paper';
import firebase from 'firebase';
import {Text} from '..';

const CustomDrawer = (props) => {
  const [user, setUser] = useState({});
  const {state, descriptors, navigation} = props;
  const buildLink = useLinkBuilder();
  const {colors} = useTheme();
  const getUser = async () => {
    const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64');
    const docRef = firebase.firestore().collection('users').doc(email64);
    const userData = await docRef.get();
    setUser(userData.data());
  };
  const {currentUser} = firebase.auth();
  const getInitials = (fullName = '') => {
    let initials = fullName.split(' ') || [];

    initials = (
      (initials.shift()?.[0] || '') + (initials.pop()?.[0] || '')
    ).toUpperCase();

    return initials;
  };

  useEffect(() => {
    if (currentUser) {
      getUser();
    }
  }, [currentUser]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{height: 160, backgroundColor: colors.secondaryTeal, display: 'flex'}}>
        <View style={{flex: 3, padding: 12, display: 'flex', justifyContent: 'center'}}>
          {user.photoURL ? (
            <Avatar.Image
              size={62}
              source={{uri: user.photoURL}}
              backgroundColor={colors.primaryTeal}
            />
          ) : (
            <Avatar.Text
              size={62}
              label={getInitials(user.fullName)}
              backgroundColor={colors.primaryTeal}
            />
          )}
        </View>
        <View style={{flex: 1, padding: 12}}>
          <Text fontWeight="medium" color={colors.primaryBlack}>
            {user.fullName}
          </Text>
        </View>
      </View>
      {state.routes.map((route, i) => {
        const isHidden = descriptors[route.key].options?.hidden; // <--- Added this line
        if (isHidden === true) return null; // <--- Added this line

        const focused = i === state.index;
        const {
          title,
          drawerLabel,
          drawerIcon,
          drawerActiveTintColor,
          drawerInactiveTintColor,
          drawerActiveBackgroundColor,
          drawerInactiveBackgroundColor,
          drawerLabelStyle,
          drawerItemStyle,
        } = descriptors[route.key].options;

        return (
          <DrawerItem
            key={route.key}
            label={
              drawerLabel !== undefined
                ? drawerLabel
                : title !== undefined
                ? title
                : route.name
            }
            icon={drawerIcon}
            focused={focused}
            activeTintColor={drawerActiveTintColor}
            inactiveTintColor={drawerInactiveTintColor}
            activeBackgroundColor={drawerActiveBackgroundColor}
            inactiveBackgroundColor={drawerInactiveBackgroundColor}
            labelStyle={drawerLabelStyle}
            style={drawerItemStyle}
            to={buildLink(route.name, route.params)}
            onPress={() => {
              navigation.dispatch({
                ...(focused
                  ? DrawerActions.closeDrawer()
                  : CommonActions.navigate(route.name)),
                target: state.key,
              });
            }}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
