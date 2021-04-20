import { useFocusEffect } from '@react-navigation/core';
import formStyle from '../../styles/styles.forms';
import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import AppModal from './AppModal';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MiCuenta = (props) => {
  const [modalImg, setModalImg] = useState(false);
  const [docUsuario, setDocUsuario] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  const datosUser = async () => {
    try {
      const result = await AsyncStorage.getItem('@user.name');
      setName(result);
      const result2 = await AsyncStorage.getItem('@user.email');
      setEmail(result2);
      const result3 = await AsyncStorage.getItem('@user.profile_photo_url');
      setImage(result3);
    } catch (e) {
      console.log(e);
    }
  };

  //Titulo del screen en foco
  useFocusEffect(() => {
    props.navigation.dangerouslyGetParent().setOptions({
      title: 'Mi cuenta',
    });
  });

  datosUser();

  const tomarImagenGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const imgGaleria = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!imgGaleria.cancelled) {
        setDocUsuario({
          ...docUsuario,
          ['avatar']: imgGaleria.uri,
        });

        setModalImg(false);

        const blob = await (await fetch(imgGaleria.uri)).blob();

        /**
         * Creamos un archivo de tipo imagen para
         * guardar el contenido blob e indicamos el nombre
         * del archivo y sus poropiedades
         *
         * File ([blob], nombre, propiedades)
         */
        const file = new File([blob], `${docUsuario.id}.jpg`, {
          type: 'image/jpeg',
        });

        blob.close();
      } else {
        Alert.alert('ERROR', 'Selecciona una imagen de tu galería');
      }
    }
  };

  const tomarFotoCamara = async () => {
    const permisoCamara = await Permissions.askAsync(Permissions.CAMERA);

    const permisoGaleria = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );
    if (
      permisoCamara.status === 'granted' &&
      permisoGaleria.status === 'granted'
    ) {
      const imgCamara = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      console.log(imgCamara);
      if (!imgCamara.cancelled) {
        setDocUsuario({
          ...docUsuario,
          ['avatar']: imgCamara.uri,
        });

        setModalImg(false);
      } else {
        Alert.alert('ERROR', 'Toma una foto para continuar');
      }
    } else {
      Alert.alert('ERROR', 'Faltan permisos para continuar');
    }
  };

  return (
    <View style={formStyle.contenedor}>
      {modalImg ? (
        <AppModal
          show={modalImg}
          layerBgOpacity={0.5}
          modalBgColor="#fff"
          modalOpacity={1}
          modalContent={
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  marginVertical: 1,
                  fontSize: 18,
                  fontWeight: '500',
                }}
              >
                <FontAwesome5 name="camera" size={20} /> CAMBIAR IMAGEN
              </Text>
              <View
                style={{
                  marginVertical: 12,
                }}
              />

              <Button
                color="#1429A3"
                title="Tomar foto"
                onPress={tomarFotoCamara}
              />

              <View
                style={{
                  marginVertical: 8,
                }}
              />

              <Button
                color="#1429A3"
                title="Galería"
                onPress={tomarImagenGaleria}
              />

              <View
                style={{
                  marginVertical: 8,
                }}
              />

              <Button
                title="Cancelar"
                color="#C70039"
                onPress={() => setModalImg(false)}
              />
            </View>
          }
        />
      ) : null}
      <ScrollView>
        <TouchableOpacity onPress={() => setModalImg(true)}>
          <ImageBackground
            source={
              typeof docUsuario.avatar !== 'undefined'
                ? { uri: docUsuario.avatar }
                : { uri: image }
            }
            style={formStyle.imagen}
          ></ImageBackground>
        </TouchableOpacity>

        <TextInput style={formStyle.input} value={name} />
        <TextInput style={formStyle.input} value={email} />
        <TouchableOpacity style={formStyle.estiloBoton}>
          <Text style={formStyle.estiloBotonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MiCuenta;
