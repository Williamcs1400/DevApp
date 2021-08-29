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
      <View>
        <Text>{text}</Text>
      </View>

    );
  }

  const InfoCard = ({text}) => {
    const {colors} = useTheme();

    return (
      <View>
        <Card>
          <Card.Content>
            <Paragraph>{text}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
  
  return (
    <ScrollView>
      <View>
        <InfoCard text={I18n.t('signUpDisclaimer')} />
      </View>

      <SectionHeader text={I18n.t('personalInfo')} />
      <TextInput
        label="full name"
        value={fullName}
        onChange={(t) => setFullName(t)}
        placeholder={I18n.t('fullName')}
      />
      <TextInput
        label="age"
        value={age}
        onChange={(t) => setAge(t)}
        placeholder={I18n.t('age')}
      />
      <TextInput
        label="email"
        value={email}
        onChange={(t) => setEmail(t)}
        placeholder={I18n.t('email')}
      />
      <TextInput
        label="province"
        value={province}
        onChange={(t) => setProvince(t)}
        placeholder={I18n.t('province')}
      />
      <TextInput
        label="city"
        value={city}
        onChange={(t) => setCity(t)}
        placeholder={I18n.t('city')}
      />
      <TextInput
        label="address"
        value={address}
        onChange={(t) => setAddress(t)}
        placeholder={I18n.t('address')}
      />
      <TextInput
        label="phone"
        value={phone}
        onChange={(t) => setPhone(t)}
        placeholder={I18n.t('phone')}
      />

      <SectionHeader text={I18n.t('profileInfo')} />
      <TextInput
        label="username"
        value={username}
        onChange={(t) => setUsername(t)}
        placeholder={I18n.t('username')}
      />
      <TextInput
        label="password"
        value={password}
        onChange={(t) => setPassword(t)}
        placeholder={I18n.t('fullName')}
        secureTextEntry={true}
      />
      <TextInput
        label="password confirm"
        value={passwordConfirm}
        onChange={(t) => setPasswordConfirm(t)}
        placeholder={I18n.t('passwordConfirm')}
        secureTextEntry={true}
      />

      <SectionHeader text={I18n.t('profilePicture')} />
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
