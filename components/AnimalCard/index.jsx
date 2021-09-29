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
        title={animal.name}
        right={() => (
          <IconButton
            icon="heart-outline"
            color={colors.primaryBlack}
            style={{margin: 0, paddingRight: 12}}
          />
        )}
      />
      <Card.Cover
        source={{
          uri:
            animal.photo ||
            'https://firebasestorage.googleapis.com/v0/b/devapps-meau-9acf8.appspot.com/o/images%2Fanimals%2Fdefault%2Fdefault.jpg?alt=media&token=d3ffc04c-9048-45ea-9410-b12d00a381e5',
        }}
      />
      <Card.Content>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            paddingTop: 4,
          }}
        >
          <Text color={colors.primaryBlack}>{animal.sex}</Text>
          <Text color={colors.primaryBlack}>{animal.age}</Text>
          <Text color={colors.primaryBlack}>{animal.size}</Text>
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
