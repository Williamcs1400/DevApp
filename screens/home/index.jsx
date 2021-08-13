import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import I18n from 'i18n-js';
import {useTheme, withTheme, TouchableRipple, Switch} from 'react-native-paper';
import styles from './styles';
import {PreferencesContext} from '../../preferencesContext';

const HomeScreen = ({navigation}) => {
  const [lang, setLang] = useState(I18n.locale);
  const {colors, fonts} = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);

  const switchLang = () => {
    setLang(lang === 'pt' ? 'en' : 'pt');
    I18n.locale = lang;
  };

  return (
    <View style={{...styles.home, backgroundColor: colors.background}}>
      <Text style={{color: colors.primary}}>{I18n.t('home')}</Text>

      <TouchableRipple>
        <Switch onValueChange={toggleTheme} color="red" value={isThemeDark} />
      </TouchableRipple>

      <Text style={{...fonts.thin, color: colors.text}}>thin</Text>
      <Text style={{...fonts.light, color: colors.text}}>light</Text>
      <Text style={{...fonts.regular, color: colors.text}}>regular</Text>
      <Text style={{...fonts.medium, color: colors.text}}>medium</Text>
      <Text style={{...fonts.bold, color: colors.text}}>bold</Text>

      <Button color={colors.primaryOrange} title="primaryOrange" />
      <Button color={colors.secondaryOrange} title="secondaryOrange" />
      <Button color={colors.terciaryOrange} title="terciaryOrange" />
      <Button color={colors.primaryTeal} title="primaryTeal" />
      <Button color={colors.secondaryTeal} title="secondaryTeal" />
      <Button color={colors.terciaryTeal} title="terciaryTeal" />

      <Button
        color={colors.primaryOrange}
        title={I18n.t('goToDetails')}
        onPress={() => navigation.navigate('Details')}
      />
      <Button color={colors.primaryTeal} title={lang} onPress={switchLang} />
    </View>
  );
};

export default withTheme(HomeScreen);
