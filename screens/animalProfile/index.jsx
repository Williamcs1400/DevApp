import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {TextInput, Text, ImagePicker, Label} from '../../components';

const AnimalProfile = (props) => {
  const {animal} = props.route.params;
  console.log(props.animal);

  return (
    <ScrollView>
      <View style={{padding: 8}}>
        <Text fontWeight="bold" fontSize={21}>
          {animal.name} - {animal.species} - {animal.sex}
        </Text>
        {animal.photo && (
          <Image source={{uri: animal.photo}} style={{width: 200, height: 200}} />
        )}
        <Text>Age: {animal.age}</Text>
        <Text>Size: {animal.size}</Text>

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
    </ScrollView>
  );
};

export default AnimalProfile;
