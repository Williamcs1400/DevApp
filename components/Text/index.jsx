import React from 'react';
import {ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import {Text as TextPaper, useTheme} from 'react-native-paper';

const Text = ({children, color, fontSize, fontWeight, style}) => {
  const {colors, fonts} = useTheme();
  const weight = {
    regular: fonts.regular,
    bold: fonts.bold,
    medium: fonts.medium,
    thin: fonts.thin,
    light: fonts.light,
  };

  return (
    <TextPaper
      style={{...weight[fontWeight], color: color || colors.text, fontSize, ...style}}
    >
      {children}
    </TextPaper>
  );
};

export default Text;

Text.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.oneOf(['regular', 'medium', 'bold', 'light', 'thin']),
  style: ViewPropTypes.style,
};

Text.defaultProps = {
  color: '',
  fontSize: 14,
  fontWeight: 'regular',
  style: {},
};
