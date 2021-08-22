import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {TextInput as TextInputPaper, Text, useTheme} from 'react-native-paper';

const TextInput = ({label, placeholder, onChange, value, error}) => {
  const {colors, fonts} = useTheme();

  return (
    <View style={{padding: 16}}>
      {label && (
        <Text style={{...fonts.regular, color: colors.primaryTeal, marginBottom: 8}}>
          {String(label).toUpperCase()}
        </Text>
      )}
      <TextInputPaper
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        underlineColor={colors.primaryTeal}
        selectionColor={colors.primaryTeal}
        outlineColor={colors.primaryTeal}
        dense
        error={error}
        theme={{
          colors: {
            primary: colors.primaryTeal,
          },
          roundness: 0,
        }}
      />
    </View>
  );
};

export default TextInput;

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

TextInput.defaultProps = {
  placeholder: '',
  label: '',
  error: false,
};
