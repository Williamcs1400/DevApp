import React, {useState} from "react";
import I18n from 'i18n-js';
import { View, Text, useColorScheme, Image, Button, TouchableOpacity } from 'react-native';
import {useTheme, withTheme, TouchableRipple, Switch} from 'react-native-paper';
import Ops from '../../sources/Ops.png'
import styles from "./styles";

const ChangeEntry = () => {

  const [lang, setLang] = useState(I18n.locale);
  const {colors, fonts} = useTheme();

    return (
        <View style={styles.home}>
        <Image source={Ops} style={styles.Image} />

        <Text style={styles.textRegister}>Você não pode realizar esta ação sem possuir um cadastro!</Text>

        <TouchableOpacity color={colors.primaryTeal} style={styles.button}>
            <Text style={styles.textButton}>FAZER CADASTRO</Text>
        </TouchableOpacity>
        
        <Text style={styles.textLogin}>Já possui cadastro?</Text>

        <TouchableOpacity color={colors.primaryTeal} style={styles.button}>
            <Text style={styles.textButton}>FAZER LOGIN</Text>
        </TouchableOpacity>
        </View>
    );
}

export default ChangeEntry;