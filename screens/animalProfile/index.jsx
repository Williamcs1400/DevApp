import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {Text} from '../../components';
import styles from './styles';

const AnimalProfile = (props) => {
  const {animal} = props.route.params;
  console.log(props.animal);

  function image(){
    if(animal.photo == null){
      return 'https://firebasestorage.googleapis.com/v0/b/devapps-meau-9acf8.appspot.com/o/images%2Fanimals%2Fdefault%2Fdefault.jpg?alt=media&token=d3ffc04c-9048-45ea-9410-b12d00a381e5';
    }
    return animal.photo;
  }

  return (
    <ScrollView>
      <View>
        
        <Image source={{uri: image()}} style={{width: '100%', height: 400}} />

        <View style={styles.viewInternal}>
          <Text style={styles.textName}>
            {animal.name}
          </Text>

          <View style={styles.listHorizontal}>
            <Text style={styles.textFielf}>
              Sexo
            </Text>
            <Text style={styles.textFielf}>
              Porte
            </Text>
            <Text style={styles.textFielf}>
              Idade
            </Text>
          </View>
          
          <View style={styles.listHorizontal}>
            <Text style={styles.textValue}>
              {animal.sex}
            </Text>
            <Text style={styles.textValue}>
              {animal.size}
            </Text>
            <Text style={styles.textValue}>
              {animal.age}
            </Text>
          </View>

          <Text fontWeight="bold">Personality</Text>
          <Text>playful: {JSON.stringify(animal.personality.playful)}</Text>
          <Text>shy: {JSON.stringify(animal.personality.shy)}</Text>
          <Text>calm: {JSON.stringify(animal.personality.calm)}</Text>
          <Text>guard: {JSON.stringify(animal.personality.guard)}</Text>
          <Text>lovely: {JSON.stringify(animal.personality.lovely)}</Text>
          <Text>lazy: {JSON.stringify(animal.personality.lazy)}</Text>

          <Text fontWeight="bold">Health</Text>
          <Text>vaccinated: {JSON.stringify(animal.health.vaccinated)}</Text>
          <Text>vermifugated: {JSON.stringify(animal.health.vermifugated)}</Text>
          <Text>neutered: {JSON.stringify(animal.health.neutered)}</Text>
          <Text>isSick: {JSON.stringify(animal.health.isSick)}</Text>
          <Text>{animal.health.diseases}</Text>

          <Text fontWeight="bold">Needs</Text>
          <Text>food: {JSON.stringify(animal.needs.food)}</Text>
          <Text>financialAid: {JSON.stringify(animal.needs.financialAid)}</Text>
          <Text>needsMedications: {JSON.stringify(animal.needs.needsMedications)}</Text>
          <Text>{animal.needs.medications}</Text>
          <Text>needsObjects: {JSON.stringify(animal.needs.needsObjects)}</Text>
          <Text>{animal.needs.objects}</Text>

          <Text>{animal.history}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnimalProfile;
