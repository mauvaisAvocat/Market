import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import formStyle from '../styles/styles.forms';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnVisible, setBtnVisible] = useState(true);
  const [aiVisible, setAiVisible] = useState(false);
  const [tiEnabled, setTiEnabled] = useState(true);
  const [user, setUser] = useState({});

  const validaLogin = async () => {
    if (username.length < 10) {
      Alert.alert('ERROR', 'Correo incorrecto', [
        {
          text: 'Cerrar',
          onPress: () => setUsername(''),
        },
      ]);

      return;
    }

    if (password.length < 8) {
      Alert.alert('ERROR', 'Contraseña incorrecta', [
        {
          text: 'Cerrar',
          onPress: () => setPassword(''),
        },
      ]);

      return;
    }
    try {
      const res = await axios.post('https://www.market-app.xyz/api/v1/login', {
        email: username,
        password: password,
      });
      const json = await res.data;

      setUser(json);
      console.log(user);
      console.log(res.status);
      console.log(json);
      console.log(username);

      if (res.status === 200) {
        try {
          AsyncStorage.setItem('@access_token', json.access_token);
          AsyncStorage.setItem('@user.email', json.user.email);
          AsyncStorage.setItem('@user.name', json.user.name);
          AsyncStorage.setItem(
            '@user.markets',
            JSON.stringify(json.user.markets)
          );
          AsyncStorage.setItem(
            '@user.profile_photo_url',
            json.user.profile_photo_url
          );

          console.log('setting on storage: @access_token ', json.access_token);
          console.log('setting on storage: @user.email ', json.user.email);
          console.log('setting on storage: @user.name ', json.user.name);
          console.log(
            'setting on storage: @user.markets ',
            JSON.stringify(json.user.markets)
          );
          console.log(
            'setting on storage: @user.profile_photo_url ',
            json.user.profile_photo_url
          );
        } catch (e) {
          console.log('Error guardando el login: ', e);
        }

        Alert.alert(
          'Hey!',
          `Bienvenido ${username}`,
          [
            {
              title: 'Aceptar',
              onPress: () => {
                setBtnVisible(false);
                setAiVisible(true);
                setTiEnabled(false);
                setTimeout(() => {
                  setBtnVisible(true);
                  setAiVisible(false);
                  setTiEnabled(true);
                  //Direccionar a Home

                  props.navigation.navigate('MenuInicial');
                }, 350);
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={formStyle.contenedor}>
      <Image
        source={require('./../../assets/images/login.png')}
        style={formStyle.imagen}
      />

      <TextInput
        placeholder="Ingrese correo*"
        colorText="#fff"
        placeholderTextColor="#fff"
        keyboardType="email-address"
        style={formStyle.input}
        maxLength={50}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(val) => setUsername(val)}
        value={username}
        editable={tiEnabled}
      />

      <TextInput
        placeholder="Ingrese contraseña*"
        colorText="#fff"
        placeholderTextColor="#fff"
        keyboardType="default"
        style={formStyle.input}
        minLenght={8}
        maxLength={25}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        onChangeText={(val) => setPassword(val)}
        value={password}
        editable={tiEnabled}
      />

      <ActivityIndicator
        color="#000"
        size="large"
        style={{
          marginVertical: 15,
          display: aiVisible ? 'flex' : 'none',
        }}
      />
      <View
        style={{
          display: btnVisible ? 'flex' : 'none',
        }}
      >
        <TouchableOpacity style={formStyle.estiloBoton} onPress={validaLogin}>
          <Text style={formStyle.estiloBotonText}>
            <AntDesign size={22} name="login" />
            {'  '}
            Iniciar de sesión
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={formStyle.estiloBotonR}
        onPress={() => {
          props.navigation.navigate('Registro');
        }}
      >
        <Text style={formStyle.estiloBotonText}>
          <AntDesign size={22} name="adduser" />
          {'  '}
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
