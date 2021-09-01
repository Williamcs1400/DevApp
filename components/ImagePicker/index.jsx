import React, {useState, useEffect} from 'react';
import {View, Platform, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Card, useTheme} from 'react-native-paper';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Ionicons} from '@expo/vector-icons';
import * as ExpoImagePicker from 'expo-image-picker';
import I18n from 'i18n-js';
import Text from '../Text';
import Label from '../Label';

const ImagePicker = ({label, imageCallback}) => {
  const {colors} = useTheme();
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("image: " + result);

    if (!result.cancelled) {
      setImage(result.uri);
      if (imageCallback) {
        imageCallback(result.uri);
      }
    }
  };

  return (
    <View style={{padding: 16}}>
      {label && <Label name={label} />}
      <Card
        elevation={3}
        onPress={pickImage}
        theme={{roundness: 0}}
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.terciaryBlack,
        }}
      >
        <Card.Content style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          {image ? (
            <Image source={{uri: image}} style={{width: 200, height: 200}} />
          ) : (
            <>
              <Ionicons name="add-circle-outline" size={32} color={colors.iconColor} />
              <Text color={colors.iconColor} fontSize={20}>
                {I18n.t('addPicture')}
              </Text>
            </>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

export default ImagePicker;

ImagePicker.propTypes = {
  label: PropTypes.string,
};

ImagePicker.defaultProps = {
  label: '',
};
