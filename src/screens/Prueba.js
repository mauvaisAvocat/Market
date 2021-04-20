import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../styles/styles.forms';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Prueba = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [token, setToken] = useState('');
  const [relation, setRelation] = useState('');
  const [products, setProducts] = useState([]);
    let arraySells = [];

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
    const getSell = async () => {
        try {
            const result = await AsyncStorage.getItem('@access_token');
            setToken(result);
            //const result2 = await AsyncStorage.getItem('@user.markets');
            //const jsonValue = await JSON.parse(result2);
            //const json = await jsonValue.relation_id;
            //setRelation(json);
        } catch (e) {
            console.log(e);
        }
    };

    getSell();

  const handleBarCodeScanned = async ({ type, data }) => {
      setScanned(true);
      console.log(`https://www.market-app.xyz/api/v1/products?barcode=${data}`);
      const res = await axios.get(`https://www.market-app.xyz/api/v1/products?barcode=${data}`, {
              headers: {
                  Authorization: 'Bearer ' + token
              }
      });
      const json = await res.data;
      console.log(json);
      //alert(`Bar code with type ${type} and data ${data} has been scanned!`)
      if (json.stock > 0) {
                Alert.alert('¡Hey!', `Bar code: ${data}
Producto: ${json.name}
Precio: ${json.price}`, [
                                {
                                    text: 'Cancelar',
                                    onPress: () => {
                                        
                                    }
                                },
                                {
                                    text: 'Agregar a lista',
                                    onPress: () => {
                                        arraySells.push({
                                            'quant': 1,
                                            'product_id': json.id,
                                    });
                                    setProducts(arraySells);
                                    console.log(json);
                                    console.log(arraySells[0]);
                                    }
                                },
                                {
                                    text: 'Finalizar venta',
                                    onPress: async () => {
                                        try {
                                            const res = await axios.post('https://www.market-app.xyz/api/v1/sell', {
                                                'sells': products,
                                                'relation_id': 1,
                                            });
                                            console.log(res.data);
                                            console.log(products[0]);
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    },
                                },
                            ],
                                {
                                    cancelable: false,
                                }
                            );
      }

      if (json.stock <= 0) {
          Alert.alert('ERROR', 'No hay suficiente stock...', [
              {
                  title: 'Aceptar',
                  onPress: null,
              },
          ],
              {
                  cancelable: false,
              }
          );
      }

      console.log(data);
  };
    
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.contenedor}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      
    </View>
  );
}
export default Prueba;