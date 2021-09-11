import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {TextInput as TextInputPaper, useTheme} from 'react-native-paper';
import {useController} from 'react-hook-form';
import Label from '../Label';

const TextInput = ({label, placeholder, isSecure = false, onChange}) => {
  const {colors} = useTheme();

  return (
    <View style={{padding: 16}}>
      {label.length > 0 && <Label name={label} />}

      <TextInputPaper
        placeholder={placeholder}
        underlineColor={colors.primaryTeal}
        selectionColor={colors.primaryTeal}
        outlineColor={colors.primaryTeal}
        dense
        theme={{
          colors: {
            primary: colors.primaryTeal,
          },
          roundness: 0,
        }}
        secureTextEntry={isSecure}
        onChangeText={onChange}
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
  isSecure: PropTypes.bool,
};

TextInput.defaultProps = {
  placeholder: '',
  label: '',
  error: false,
  isSecure: false,
};
