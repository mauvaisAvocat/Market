import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import Login from './Login';
import axios from 'axios';

const Registro = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [telefono, setTelefono] = useState('');
  const [aiVisible, setAiVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(true);
  const [tiEnabled, setTiEnabled] = useState(true);

  const validaRegistro = async () => {
    if (nombre.length < 3) {
      Alert.alert(
        'ERROR!',
        'Nombre incompleto',
        [
          {
            title: 'Corregir',
            onPress: () => {
              setNombre('');
            },
          },
        ],
        {
          cancelable: false,
        }
      );
      return;
    }

    if (email.length < 10) {
      Alert.alert(
        'ERROR!',
        'Email incompleto',
        [
          {
            title: 'Corregir',
            onPress: () => {
              setEmail('');
            },
          },
        ],
        {
          cancelable: false,
        }
      );
      return;
    }

    if (contrasena.length < 8 || contrasena.length > 25) {
      Alert.alert(
        'ERROR!',
        'Contraseña incompleta (deben ser 8 dígitos mínimo)',
        [
          {
            title: 'Corregir',
            onPress: () => {
              setContrasena('');
            },
          },
        ],
        {
          cancelable: false,
        }
      );
      return;
    }

    const res = await axios.post('https://www.market-app.xyz/api/v1/register', {
      name: nombre,
      email: email,
      password: contrasena,
    });
    if (res.status === 201) {
      Alert.alert(
        'Hey!',
        `Has sido registrado exitosamente ${nombre}`,
        [
          {
            title: 'Aceptar',
            onPress: () => {
              setAiVisible(true);
              setBtnVisible(false);
              setTiEnabled(false);
              setTimeout(() => {
                setAiVisible(false);
                setBtnVisible(true);
                setTiEnabled(true);
              }, 3000);
            },
          },
        ],
        {
          cancelable: false,
        }
      );
    }
    console.log(res.data);
    console.log(res.status);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        marginVertical: 20,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#f3f4f6',
      }}
    >
      <ImageBackground
        source={require('./../../assets/images/logo.png')}
        style={{
          height: 200,
          width: 200,
          alignSelf: 'center',
          overflow: 'hidden',
          borderRadius: 100,
          borderColor: 'transparent',
          borderStyle: 'solid',
          marginVertical: 20,
          borderWidth: 2,
        }}
      />
      <Text
        style={{
          fontWeight: '500',
          fontSize: 20,
          textAlign: 'center',
          alignSelf: 'center',
          marginVertical: 10,
          color: '#000',
        }}
      >
        Registro
      </Text>

      <TextInput
        placeholder="Nombre*"
        keyboardType="default"
        style={{
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderColor: '#1f2937',
          borderWidth: 1,
          marginVertical: 5,
          fontSize: 16,
          borderRadius: 5,
          color: '#000',
        }}
        placeholderTextColor="#000"
        value={nombre}
        onChangeText={(val) => {
          setNombre(val);
        }}
        editable={tiEnabled}
      />

      <TextInput
        placeholder="Email*"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={{
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderColor: '#1f2937',
          borderWidth: 1,
          marginVertical: 5,
          fontSize: 16,
          borderRadius: 5,
          color: '#000',
        }}
        placeholderTextColor="#000"
        value={email}
        onChangeText={(val) => {
          setEmail(val);
        }}
        editable={tiEnabled}
      />

      <TextInput
        placeholder="Contraseña*"
        keyboardType="default"
        style={{
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderColor: '#1f2937',
          borderWidth: 1,
          marginVertical: 5,
          fontSize: 16,
          borderRadius: 5,
          color: '#000',
        }}
        placeholderTextColor="#000"
        value={contrasena}
        onChangeText={(val) => {
          setContrasena(val);
        }}
        editable={tiEnabled}
        secureTextEntry
      />

      <ActivityIndicator
        size="large"
        color="#fff"
        style={{
          marginVertical: 15,
          display: aiVisible ? 'flex' : 'none',
        }}
      />

      <View
        style={{
          marginBottom: 10,
          display: btnVisible ? 'flex' : 'none',
        }}
      >
        <Button title="Registrarse" color="#1f2937" onPress={validaRegistro} />
      </View>

      <Button
        title="¿Ya tienes una cuenta? Inicia sesión"
        color="#C00739"
        onPress={() => {
          props.navigation.navigate('Login');
        }}
      />
    </ScrollView>
  );
};

export default Registro;
