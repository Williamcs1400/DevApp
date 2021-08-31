import React, {useState, useEffect} from 'react';
import {ScrollView, View, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {Checkbox, RadioButton, useTheme, Button} from 'react-native-paper';
import {TextInput, Text, ImagePicker, Label} from '../../components';

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
  const {colors} = useTheme();
  const {register, setValue, getValues, watch, handleSubmit} = useForm({
    defaultValues: {
      name: '',
      photo: null,
      species: '',
      sex: '',
      size: '',
      age: '',
      personality: {
        playful: false,
        shy: false,
        calm: false,
        guard: false,
        lovely: false,
        lazy: false,
      },
      health: {
        vaccinated: false,
        vermifugated: false,
        neutered: false,
        isSick: false,
        diseases: '',
      },
      needs: {
        food: false,
        financialAid: false,
        needsMedications: false,
        medications: '',
        needsObjects: false,
        objects: '',
      },
      history: '',
    },
  });
  const onSubmit = (data) => Alert.alert(JSON.stringify(data));

  useEffect(() => {
    register('name');
    register('photo');
    register('species');
  }, [register]);

  return (
    <ScrollView>
      <View>
        <TextInput
          label="nome do animal"
          placeholder="Nome do animal"
          onChange={(text) => setValue('name', text)}
        />
        <ImagePicker
          label="fotos do animal"
          imageCallback={(photo) => setValue('photo', photo)}
        />
        <RadioInputs
          label="Espécie"
          options={[
            {name: 'Cachorro', value: 'dog'},
            {name: 'Gato', value: 'cat'},
          ]}
          onValueChange={(newValue) => setValue('species', newValue)}
          value={watch('species')}
        />
        <Text>{getValues('species')}</Text>
        <RadioInputs
          label="sexo"
          options={[
            {name: 'Macho', value: 'male'},
            {name: 'Female', value: 'female'},
          ]}
          onValueChange={(newValue) => setValue('sex', newValue)}
          value={watch('sex')}
        />
        <RadioInputs
          label="porte"
          options={[
            {name: 'Pequeno', value: 'small'},
            {name: 'Médio', value: 'medium'},
            {name: 'Grande', value: 'large'},
          ]}
          onValueChange={(newValue) => setValue('size', newValue)}
          value={watch('size')}
        />
        <RadioInputs
          label="idade"
          options={[
            {name: 'Filhote', value: 'infant'},
            {name: 'Adulto', value: 'adult'},
            {name: 'Idoso', value: 'senior'},
          ]}
          onValueChange={(newValue) => setValue('age', newValue)}
          value={watch('age')}
        />
        <CheckboxInputs
          label="Temperamento"
          options={[
            {
              name: 'Brincalhão',
              checked: watch('personality.playful'),
              setChecked: () =>
                setValue('personality.playful', !watch('personality.playful')),
            },
            {
              name: 'Tímido',
              checked: watch('personality.shy'),
              setChecked: () => setValue('personality.shy', !watch('personality.shy')),
            },
            {
              name: 'Calmo',
              checked: watch('personality.calm'),
              setChecked: () => setValue('personality.calm', !watch('personality.calm')),
            },
            {
              name: 'Guarda',
              checked: watch('personality.guard'),
              setChecked: () =>
                setValue('personality.guard', !watch('personality.guard')),
            },
            {
              name: 'Amoroso',
              checked: watch('personality.lovely'),
              setChecked: () =>
                setValue('personality.lovely', !watch('personality.lovely')),
            },
            {
              name: 'Preguiçoso',
              checked: watch('personality.lazy'),
              setChecked: () => setValue('personality.lazy', !watch('personality.lazy')),
            },
          ]}
        />
        <CheckboxInputs
          label="Saúde"
          options={[
            {
              name: 'Vacinado',
              checked: watch('health.vaccinated'),
              setChecked: () =>
                setValue('health.vaccinated', !watch('health.vaccinated')),
            },
            {
              name: 'Vermifugado',
              checked: watch('health.vermifugated'),
              setChecked: () =>
                setValue('health.vermifugated', !watch('health.vermifugated')),
            },
            {
              name: 'Castrado',
              checked: watch('health.neutered'),
              setChecked: () => setValue('health.neutered', !watch('health.neutered')),
            },
            {
              name: 'Doente',
              checked: watch('health.sick'),
              setChecked: () => setValue('health.sick', !watch('health.sick')),
            },
          ]}
        />
        <TextInput
          placeholder="Doenças do animal"
          onChange={(t) => setValue('health.diseases', t)}
        />

        <View style={{padding: 16}}>
          <Label name="necessidades do animal" />
          <View style={styles.inputGroupView}>
            <Checkbox
              status={watch('needs.food') ? 'checked' : 'unchecked'}
              onPress={() => setValue('needs.food', !watch('needs.food'))}
              color={colors.primaryTeal}
            />
            <Text>Alimento</Text>
          </View>
          <View style={styles.inputGroupView}>
            <Checkbox
              status={watch('needs.financialAid') ? 'checked' : 'unchecked'}
              onPress={() => setValue('needs.financialAid', !watch('needs.financialAid'))}
              color={colors.primaryTeal}
            />
            <Text>Auxílio financeiro</Text>
          </View>
          <View style={styles.inputGroupView}>
            <Checkbox
              status={watch('needs.needsMedications') ? 'checked' : 'unchecked'}
              onPress={() =>
                setValue('needs.needsMedications', !watch('needs.needsMedications'))
              }
              color={colors.primaryTeal}
            />
            <Text>Medicamentos</Text>
          </View>
          <TextInput
            placeholder="Nome do medicamento"
            onChange={(t) => setValue('needs.medications', t)}
          />
          <View style={styles.inputGroupView}>
            <Checkbox
              status={watch('needs.needsObjects') ? 'checked' : 'unchecked'}
              onPress={() => setValue('needs.needsObjects', !watch('needs.needsObjects'))}
              color={colors.primaryTeal}
            />
            <Text>Objetos</Text>
          </View>
          <TextInput
            placeholder="Especifique o(s) objeto(s)"
            onChange={(t) => setValue('objects', t)}
          />
        </View>

        <TextInput
          placeholder="Compartilhe a história do animal"
          label="sobre o animal"
          onChange={(t) => setValue('history', t)}
        />

        <Button
          mode="contained"
          theme={{roundness: 0}}
          style={{width: '60%', alignSelf: 'center'}}
          onPress={handleSubmit(onSubmit)}
        >
          PROCURAR AJUDA
        </Button>
      </View>
    </ScrollView>
  );
};

export default RegisterAnimalScreen;
