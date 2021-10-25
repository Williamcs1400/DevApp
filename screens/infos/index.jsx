import React from 'react';
import {View, Button, Text, Pressable} from 'react-native';
import styles from './styles';

const Infos = ({navigation}) => {

  let year = new Date().getFullYear();

  return (
    <View style={styles.view}>
      <View style={styles.viewMain}>
        <Text style={styles.textUniver}>Universidade de Brasilia{'\n'}Instituto de Ciências Exatas{'\n'}Departamento de Ciencia da Computacao{'\n'}Desenvolvimento de aplicativos - 1/2021{'\n'}Professor Wilson Veneziano</Text>
        <Text style={styles.textTitleDev}>Desenvolvido por:</Text>
        <Text style={styles.textStudents}>Andrey Emmanuel Matrosov Mazépas{'\n'}William Coelho da Silva</Text>
      </View>
      <View style={styles.viewRights}>
        <Text style={styles.textRights}>Copyright © 2021 - {year} Todos os direitos reservados</Text>
      </View>
    </View>
  );

};

export default Infos;
