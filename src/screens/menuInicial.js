import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MiCuenta from './private/miCuenta';
import NuevaVenta from './nuevaVenta';
import Lugar from './Lugar';
import Catalogo from './private/Catalogo';
import Markets from './private/Markets';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { Alert, BackHandler, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/core';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();


const MenuInicial = (props) => {

    const [token, setToken] = useState('');

    const getTokenStorage = async () => {
        try {
            const result = await AsyncStorage.getItem('@access_token');
            setToken(result);
            console.log(token);
        } catch (e) {
            console.log(e);
        }        
    };

    getTokenStorage();
  const backAction = async () => {
      
    Alert.alert(
      '¡Espera!',
      '¿Realmente desea salir?',
      [
        {
          text: 'Cancelar',
          onPress: null,
          style: 'cancel',
        },
        {
          text: 'Salir',
          onPress: async () => {
            try {
                const res = await axios.post('https://www.market-app.xyz/api/v1/logout',{},
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                console.log(res.status);
                console.log(res.data);
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
                props.navigation.navigate('Login');
                
            } catch (e) {
                console.log(e);
            }  
          },
          style: 'default',
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingRight: 30,
            paddingVertical: 10,
          }}
          onPress={() => {
            props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        >
          <Entypo name='menu' size={25} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            paddingRight: 10,
            paddingLeft: 30,
            paddingVertical: 10,
          }}
          onPress={backAction}
        >
          <AntDesign name='poweroff' size={21} />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  //Estructura del Drawer
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Mi Cuenta' component={MiCuenta} />
      <Drawer.Screen name='Nueva Venta' component={NuevaVenta} />
      <Drawer.Screen name='Lugar' component={Lugar} />
      <Drawer.Screen name='Catalogo' component={Catalogo} />
      <Drawer.Screen name='Markets' component={Markets} />
    </Drawer.Navigator>
  );
};

export default MenuInicial;
