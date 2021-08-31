import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Checkbox, RadioButton, useTheme, Button} from 'react-native-paper';
import {TextInput, Text, ImagePicker, Label} from '../../components';
import firebase from 'firebase';

const styles = {
  inputGroupView: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '33%',
  },
  inputGroupFlex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

const RadioInputs = ({label, options, onValueChange, value}) => {
  const {colors} = useTheme();

  return (
    <View style={{padding: 16}}>
      <RadioButton.Group
        onValueChange={(newValue) => onValueChange(newValue)}
        value={value}
      >
        <Label name={label} />
        <View style={styles.inputGroupFlex}>
          {options.map((option) => (
            <View key={option.value} style={styles.inputGroupView}>
              <RadioButton color={colors.primaryTeal} value={option.value} />
              <Text>{option.name}</Text>
            </View>
          ))}
        </View>
      </RadioButton.Group>
    </View>
  );
};

const CheckboxInputs = ({label, options}) => {
  const {colors} = useTheme();

  return (
    <View style={{padding: 16}}>
      <Label name={label} />
      <View style={styles.inputGroupFlex}>
        {options.map((option) => (
          <View key={option.name} style={[styles.inputGroupView, {marginBottom: 16}]}>
            <Checkbox
              status={option.checked ? 'checked' : 'unchecked'}
              onPress={option.setChecked}
              color={colors.primaryTeal}
            />
            <Text>{option.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const RegisterAnimalScreen = ({navigation}) => {
  // TODO: DEFINITIVAMENTE TEM JEITO MELHOR QUE ISSO
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [sex, setSex] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');
  const [playful, setPlayful] = useState(false);
  const [shy, setShy] = useState(false);
  const [calm, setCalm] = useState(false);
  const [guard, setGuard] = useState(false);
  const [lovely, setLovely] = useState(false);
  const [lazy, setLazy] = useState(false);
  const [vaccinated, setVaccinated] = useState(false);
  const [vermifugated, setVermifugated] = useState(false);
  const [neutered, setNeutered] = useState(false);
  const [sick, setSick] = useState(false);
  const [sicknesses, setSicknesses] = useState('');
  const dbUser = firebase.firestore();

  const {colors} = useTheme();

  function saveFirebase(){
    console.log('AAAAAAAAAAAAAAAAAAAAAA');
    const email64 = new Buffer(firebase.auth().currentUser.email).toString('base64')
    dbUser.collection("animal").doc(email64).set({
      name,
      species,
      sex,
      size,
      age,
      playful,
      shy,
      calm,
      guard,
      lovely,
      lazy,
      vaccinated,
      vermifugatedm,
      neutered,
      sick,
      sicknesses
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }

  return (
    <ScrollView>
      <View>
        <TextInput
          label="nome do animal"
          value={name}
          onChange={(t) => setName(t)}
          placeholder="Nome do animal"
        />
        <ImagePicker label="fotos do animal" />
        <RadioInputs
          label="Espécie"
          options={[
            {name: 'Cachorro', value: 'dog'},
            {name: 'Gato', value: 'cat'},
          ]}
          onValueChange={setSpecies}
          value={species}
        />
        <RadioInputs
          label="sexo"
          options={[
            {name: 'Macho', value: 'male'},
            {name: 'Female', value: 'female'},
          ]}
          onValueChange={setSex}
          value={sex}
        />
        <RadioInputs
          label="porte"
          options={[
            {name: 'Pequeno', value: 'small'},
            {name: 'Médio', value: 'medium'},
            {name: 'Grande', value: 'large'},
          ]}
          onValueChange={setSize}
          value={size}
        />
        <RadioInputs
          label="idade"
          options={[
            {name: 'Filhote', value: 'infant'},
            {name: 'Adulto', value: 'adult'},
            {name: 'Idoso', value: 'senior'},
          ]}
          onValueChange={setAge}
          value={age}
        />
        <CheckboxInputs
          label="Temperamento"
          options={[
            {
              name: 'Brincalhão',
              checked: playful,
              setChecked: () => setPlayful(!playful),
            },
            {name: 'Tímido', checked: shy, setChecked: () => setShy(!shy)},
            {name: 'Calmo', checked: calm, setChecked: () => setCalm(!calm)},
            {name: 'Guarda', checked: guard, setChecked: () => setGuard(!guard)},
            {name: 'Amoroso', checked: lovely, setChecked: () => setLovely(!lovely)},
            {name: 'Preguiçoso', checked: lazy, setChecked: () => setLazy(!lazy)},
          ]}
        />
        <CheckboxInputs
          label="Saúde"
          options={[
            {
              name: 'Vacinado',
              checked: vaccinated,
              setChecked: () => setVaccinated(!vaccinated),
            },
            {
              name: 'Vermifugado',
              checked: vermifugated,
              setChecked: () => setVermifugated(!vermifugated),
            },
            {
              name: 'Castrado',
              checked: neutered,
              setChecked: () => setNeutered(!neutered),
            },
            {name: 'Doente', checked: sick, setChecked: () => setSick(!sick)},
          ]}
        />
        <TextInput
          placeholder="Doenças do animal"
          value={sicknesses}
          onChange={(t) => setSicknesses(t)}
        />

        <View style={{padding: 16}}>
          <Label name="necessidades do animal" />
          <View style={styles.inputGroupView}>
            <Checkbox status="checked" color={colors.primaryTeal} />
            <Text>Alimento</Text>
          </View>
          <View style={styles.inputGroupView}>
            <Checkbox status="checked" color={colors.primaryTeal} />
            <Text>Auxílio financeiro</Text>
          </View>
          <View style={styles.inputGroupView}>
            <Checkbox status="checked" color={colors.primaryTeal} />
            <Text>Medicamentos</Text>
          </View>
          <TextInput
            placeholder="Nome do medicamento"
            value={sicknesses}
            onChange={(t) => setSicknesses(t)}
          />
          <View style={styles.inputGroupView}>
            <Checkbox status="checked" color={colors.primaryTeal} />
            <Text>Objetos</Text>
          </View>
          <TextInput
            placeholder="Especifique o(s) objeto(s)"
            value={sicknesses}
            onChange={(t) => setSicknesses(t)}
          />
        </View>

        <TextInput
          placeholder="Compartilhe a história do animal"
          label="sobre o animal"
          value={sicknesses}
          onChange={(t) => setSicknesses(t)}
        />

        <Button
          mode="contained"
          theme={{roundness: 0}}
          style={{width: '60%', alignSelf: 'center'}}
          onPress={() => saveFirebase()}
        >
          PROCURAR AJUDA
        </Button>
      </View>
    </ScrollView>
  );
};

export default RegisterAnimalScreen;
