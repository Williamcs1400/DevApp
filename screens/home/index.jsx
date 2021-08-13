import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import I18n from 'i18n-js';
import {useTheme, withTheme} from 'react-native-paper';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const [lang, setLang] = useState(I18n.locale);
  const {colors, fonts} = useTheme();

  const switchLang = () => {
    setLang(lang === 'pt' ? 'en' : 'pt');
    I18n.locale = lang;
  };

  return (
    <View style={styles.home}>
      <Text style={fonts.regular}>{I18n.t('home')}</Text>

      <Text style={fonts.thin}>thin</Text>
      <Text style={fonts.light}>light</Text>
      <Text style={fonts.regular}>regular</Text>
      <Text style={fonts.medium}>medium</Text>
      <Text style={fonts.bold}>bold</Text>

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
