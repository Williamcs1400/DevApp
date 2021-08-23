import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Card, useTheme} from 'react-native-paper';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Ionicons} from '@expo/vector-icons';
import Text from '../Text';
import Label from '../Label';

const ImagePicker = ({label}) => {
  const {colors} = useTheme();

  return (
    <View style={{padding: 16}}>
      {label && <Label name={label} />}
      <Card
        elevation={3}
        onPress={() => {}}
        theme={{roundness: 0}}
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.terciaryBlack,
        }}
      >
        <Card.Content style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Ionicons name="add-circle-outline" size={32} color={colors.iconColor} />
          <Text color={colors.iconColor} fontSize={20}>
            adicionar fotos
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ImagePicker;

ImagePicker.propTypes = {
  label: PropTypes.string,
};

ImagePicker.defaultProps = {
  label: '',
};
