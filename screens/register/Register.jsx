import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import I18n from 'i18n-js';
import {useTheme, Button, Card, Paragraph} from 'react-native-paper';
import {TextInput, Text, ImagePicker} from '../../components';
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
  const [photo, setPhoto] = useState(null);
  const dbUser = firebase.firestore();
  const storage = firebase.storage().ref();

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

  async function uploadImageAsync(uri) {
    
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    return blob;
  }

  async function loginEmailAndPassword(){
    if(email != null && password != null){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        const email64 = new Buffer(email).toString('base64')
        navigation.navigate('Home')
        dbUser.collection("users").doc(email64).set({
          email: email,
          fullName: fullName,
          age: age,
          province: province,
          city: city,
          anddress: address,
          phone: phone,
          userName: username,
          photoURL: ""
        })
        .then((docRef) => {
            console.log("photo: " + photo)
            uploadImageAsync(photo).then(blob =>{

            if(blob != null){
              storage
              .child('images')
              .child('users')
              .child(email64)
              .child('profilePicture')
              .put(blob).then(function(snapshot){
                console.log('Uploaded a blob or file!');

                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  dbUser.collection("users").doc(email64).update({
                    photoURL: downloadURL,
                  })
                  console.log('File available at', downloadURL);
                });
              });
            }
        });
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
      })
      .catch(error => {
        console.log('ERROR')
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
        console.error(error);
      });
    }else{
      console.log('Email ou senha vazios')
    }
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

      <ImagePicker 
        label="profile picture" 
        imageCallback={(photo) => setPhoto(photo)}
        />

      <Button
        mode="contained"
        theme={{roundness: 0}}
        style={{width: '60%', alignSelf: 'center'}}
        onPress={() => loginEmailAndPassword()}
      >
        {I18n.t('confirmSignUp')}
      </Button>
    </ScrollView>
  );
};

export default Register;
