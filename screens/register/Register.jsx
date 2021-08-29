import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import I18n from 'i18n-js';
import {useTheme, Button, Card, Paragraph} from 'react-native-paper';
import {TextInput, Text, ImagePicker} from '../../components';

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

const Register = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const {colors} = useTheme();

  const SectionHeader = ({text}) => {
    const {colors} = useTheme();

    return (
      <View style={{marginLeft: 15}}>
        <Text style={{color: colors.primaryTeal}}>{String(text).toUpperCase()}</Text>
      </View>
    );
  }

  const InfoCard = ({text}) => {
    const {colors} = useTheme();

    return (
      <View style={{margin: 15}}>
        <Card style={{backgroundColor: colors.secondaryTeal, borderRadius: 5}}>
          <Card.Content>
            <Paragraph style={{textAlign: 'center'}}>{text}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
  
  return (
    <ScrollView style={{marginBottom: 50}}>
      <View>
        <InfoCard text={I18n.t('signUpDisclaimer')} />
      </View>

      <SectionHeader text={I18n.t('personalInfo')} />
      <TextInput
        value={fullName}
        onChange={(t) => setFullName(t)}
        placeholder={I18n.t('fullName')}
      />
      <TextInput
        value={age}
        onChange={(t) => setAge(t)}
        placeholder={I18n.t('age')}
      />
      <TextInput
        value={email}
        onChange={(t) => setEmail(t)}
        placeholder={I18n.t('email')}
      />
      <TextInput
        value={province}
        onChange={(t) => setProvince(t)}
        placeholder={I18n.t('province')}
      />
      <TextInput
        value={city}
        onChange={(t) => setCity(t)}
        placeholder={I18n.t('city')}
      />
      <TextInput
        value={address}
        onChange={(t) => setAddress(t)}
        placeholder={I18n.t('address')}
      />
      <TextInput
        value={phone}
        onChange={(t) => setPhone(t)}
        placeholder={I18n.t('phone')}
      />

      <SectionHeader text={I18n.t('profileInfo')} />
      <TextInput
        value={username}
        onChange={(t) => setUsername(t)}
        placeholder={I18n.t('username')}
      />
      <TextInput
        value={password}
        onChange={(t) => setPassword(t)}
        placeholder={I18n.t('password')}
        isSecure={true}
      />
      <TextInput
        value={passwordConfirm}
        onChange={(t) => setPasswordConfirm(t)}
        placeholder={I18n.t('passwordConfirm')}
        isSecure={true}
      />

      <ImagePicker label="profile picture" />

      <Button
        mode="contained"
        theme={{roundness: 0}}
        style={{width: '60%', alignSelf: 'center'}}
      >
        {I18n.t('confirmSignUp')}
      </Button>
    </ScrollView>
  );
};

export default Register;
