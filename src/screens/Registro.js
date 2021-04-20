import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, ScrollView, ActivityIndicator, Button, Alert } from 'react-native';
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
                Alert.alert('ERROR!', 'Nombre incompleto', [
                    {
                        title: 'Corregir',
                        onPress: () => {
                            setNombre('');
                        }
                    },
                ],
                    {
                        cancelable: false,
                    }
                );
                return;
            }

            if (apellido1.length < 2) {
                Alert.alert('ERROR!', 'Apellido Paterno incompleto', [
                    {
                        title: 'Corregir',
                        onPress: () => {
                            setApellido1('');
                        }
                    },
                ],
                    {
                        cancelable: false,
                    }
                );
                return;
            }

            if (apellido2.length > 0 && apellido2.length < 3) {
                Alert.alert('ERROR!', 'Apellido 2 incorrecto', [
                    {
                        title: 'Corregir',
                        onPress: () => {
                            setApellido2('');
                        }
                    },
                ],
                    {
                        cancelable: false,
                    }
                );

                return;
            }

            if (telefono.length !== 10) {
                Alert.alert('ERROR!', 'Teléfono incompleto', [
                    {
                        title: 'Corregir',
                        onPress: () => {
                            setTelefono('');
                        }
                    },
                ],
                    {
                        cancelable: false,
                    }
                );
                return;
            }

            if (email.length < 10) {
                Alert.alert('ERROR!', 'Email incompleto', [
                    {
                        title: 'Corregir',
                        onPress: () => {
                            setEmail('');
                        }
                    },
                ],
                    {
                        cancelable: false,
                    }
                );
                return;
            }

            if (contrasena.length < 8 || contrasena.length > 25) {
                Alert.alert('ERROR!', 'Contraseña incompleta (deben ser 8 dígitos mínimo)', [
                    {
                        title: 'Corregir',
                        onPress: () => {
                            setContrasena('');
                        }
                    },
                ],
                    {
                        cancelable: false,
                    }
                );
                return;
            }
        const res = await axios.post('https://www.market-app.xyz/api/v1/register', {
            'name': nombre,
            'email': email,
            'password': contrasena,
        });
        if (res.status === 201) {
            Alert.alert('Hey!', `Has sido registrado exitosamente ${nombre}`, [
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
          backgroundColor: '#000',
        }}
      >
        <ImageBackground
          source={require('./../../assets/images/register.png')}
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            overflow: 'hidden',
            borderRadius: 100,
            borderColor: '#C70039',
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
            color: '#FFF',
          }}
        >
          Registro
        </Text>

        <TextInput
          placeholder='Nombre*'
          keyboardType='default'
          style={{
            width: '100%',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderColor: '#1429A3',
            borderWidth: 1,
            marginVertical: 5,
            fontSize: 16,
            borderRadius: 5,
            color: '#fff',
          }}
          placeholderTextColor='#fff'
          value={nombre}
          onChangeText={(val) => {
              setNombre(val);
          }}
          editable={tiEnabled}
        />

        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 1,
              marginRight: 5,
            }}
          >
            <TextInput
              placeholder='Apellido paterno*'
              keyboardType='default'
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderColor: '#1429A3',
                borderWidth: 1,
                marginVertical: 5,
                fontSize: 16,
                borderRadius: 5,
                color: '#fff',
              }}
              placeholderTextColor='#fff'
              value={apellido1}
              onChangeText={(val) => {
                  setApellido1(val);
              }}
              editable={tiEnabled}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: 5,
            }}
          >
            <TextInput
              placeholder='Apellido materno'
              keyboardType='default'
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderColor: '#1429A3',
                borderWidth: 1,
                marginVertical: 5,
                fontSize: 16,
                borderRadius: 5,
                color: '#fff',
              }}
              placeholderTextColor='#fff'
              value={apellido2}
              onChangeText={(val) => {
                  setApellido2(val);
              }}
              editable={tiEnabled}
            />
          </View>
        </View>

        <TextInput
          placeholder='Teléfono*'
          keyboardType='number-pad'
          style={{
            width: '100%',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderColor: '#1429A3',
            borderWidth: 1,
            marginVertical: 5,
            fontSize: 16,
            borderRadius: 5,
            color: '#fff',
          }}
          placeholderTextColor='#fff'
          value={telefono}
          onChangeText={(val) => {
              setTelefono(val);
          }}
          editable={tiEnabled}
        />

        <TextInput
          placeholder='Email*'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          style={{
            width: '100%',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderColor: '#1429A3',
            borderWidth: 1,
            marginVertical: 5,
            fontSize: 16,
            borderRadius: 5,
            color: '#fff',
          }}
          placeholderTextColor='#fff'
          value={email}
          onChangeText={(val) => {
              setEmail(val);
          }}
          editable={tiEnabled}
        />

        <TextInput
          placeholder='Contraseña*'
          keyboardType='default'
          style={{
            width: '100%',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderColor: '#1429A3',
            borderWidth: 1,
            marginVertical: 5,
            fontSize: 16,
            borderRadius: 5,
            color: '#fff',
          }}
          placeholderTextColor='#fff'
          value={contrasena}
          onChangeText={(val) => {
              setContrasena(val);
          }}
          editable={tiEnabled}
          secureTextEntry
        />

        <ActivityIndicator
          size='large'
          color='#fff'
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
          <Button title='Registrarse' color='#1429A3' onPress={validaRegistro} />
        </View>

        <Button
          title='Do you have an account?, login here now'
          color='#C00739'
          onPress={() => {
              props.navigation.navigate('Login');
          }}
        />
      </ScrollView>
    );
}
 
export default Registro;
















