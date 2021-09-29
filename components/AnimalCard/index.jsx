import React from 'react';
import PropTypes from 'prop-types';
import {Card, useTheme, IconButton} from 'react-native-paper';
import I18n from 'i18n-js';
import {View} from 'react-native';
import {Text} from '..';

const AnimalCard = (props) => {
  const {colors} = useTheme();
  const {animal, onPressCard} = props;

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
      onPress={onPressCard}
    >
      <Card.Title
        style={{backgroundColor: colors.terciaryOrange, minHeight: 30}}
        titleStyle={{
          color: colors.primaryBlack,
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          fontSize: 16,
        }}
        title={animal.nome}
        right={() => (
          <IconButton
            icon="heart-outline"
            color={colors.primaryBlack}
            style={{margin: 0, paddingRight: 12}}
          />
        )}
      />
      <Card.Cover source={{uri: animal.photo}} />
      <Card.Content>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            paddingTop: 4,
          }}
        >
          <Text color={colors.primaryBlack}>GENDER</Text>
          <Text color={colors.primaryBlack}>AGE</Text>
          <Text color={colors.primaryBlack}>SIZE</Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: -12,
          }}
        >
          <Text color={colors.primaryBlack}>LOCATION - CITY</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default AnimalCard;
