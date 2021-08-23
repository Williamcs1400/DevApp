import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from 'react-native-paper';
import Text from '../Text';

const Label = ({name}) => {
  const {colors} = useTheme();
  return (
    <Text
      fontWeight="regular"
      color={colors.primaryTeal}
      style={{marginBottom: 16}}
      fontSize={14}
    >
      {String(name).toUpperCase()}
    </Text>
  );
};

export default Label;

Label.propTypes = {
  name: PropTypes.string.isRequired,
};
