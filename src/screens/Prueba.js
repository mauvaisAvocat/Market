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
  const [market, setMarket] = useState('');
  const [products, setProducts] = useState([]);
  const [sells, setSells] = useState();
  const [Total, setTotal] = useState();
  var arraySells = [];

  var countSells = 0;
  var countTotal = 0;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      setSells(0);
      setTotal(0);
    })();
  }, []);

  const getSell = async () => {
    try {
      const result = await AsyncStorage.getItem('@access_token');
      setToken(result);

      const relation_id = await AsyncStorage.getItem('@user.markets');
      setMarket(relation_id);
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
    let array = products;
    let thisTotal = Total;
    let thisSells = sells;

    setScanned(true);
    console.log(
      `haciendo peticion https://www.market-app.xyz/api/v1/products?barcode=${data}`
    );
    const res = await axios.get(
      `https://www.market-app.xyz/api/v1/products?barcode=${data}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const json = await res.data;
    console.log(json);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`)
    if (json.stock > 0) {
      if (countTotal == 0) {
        Alert.alert(
          '¡Hey!',
          `
        
        Bar code: ${data}
        Producto: ${json.name}
        Precio: ${json.price}`,
          [
            {
              text: 'Cancelar',
              onPress: () => {
                setScanned(false);
              },
            },
            {
              text: 'Agregar a la venta',
              onPress: async () => {
                try {
                  array.push({
                    quant: 1,
                    product_id: json.id,
                  });

                  setProducts(array);
                  console.log(
                    '-----------------------------------------------------'
                  );
                  console.log(array);
                  console.log('relation_id: ', market);

                  console.log('Res:  ---------------------------');
                  console.log(res.data);

                  console.log('Array: ------------------------------');
                  console.log(array);
                  setScanned(false);

                  // setProducts(array);
                } catch (e) {
                  console.log(e);
                  setScanned(false);
                }
              },
            },
            {
              text: 'Finalizar venta',
              onPress: async () => {
                setSells(sells ? sells + 1 : 1);
                setTotal(Total ? Total + json.price : json.price);

                try {
                  array = products;

                  array.push({
                    quant: 1,
                    product_id: json.id,
                  });

                  setProducts(array);
                  console.log(json);
                  console.log(array);
                  console.log('relation_id: ', market);

                  const res = await axios.post(
                    'https://www.market-app.xyz/api/v1/sell',
                    {
                      sells: array,
                      relation_id: market,
                    }
                  );
                  if (res.status == 200) {
                    Alert.alert(
                      'Venta confirmada',
                      'Venta confirmada, continua vendiendo',
                      [
                        {
                          text: 'aceptar',
                          onPress: () => {
                            setScanned(false);
                          },
                        },
                      ]
                    );
                  }
                  console.log(res.data);
                  console.log(arraySells);
                  setScanned(false);
                } catch (e) {
                  console.log(e);
                  setScanned(false);
                }
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        countTotal += json.price;
        countSells += 1;

        Alert.alert(
          '¡Hey!',
          `
        
        Bar code: ${data}
          Producto: ${json.name}
          Precio: ${json.price}`,
          [
            {
              text: 'Cancelar',
              onPress: () => {
                setScanned(false);
              },
            },
            {
              text: 'Agregar a la venta',
              onPress: async () => {
                try {
                  array.push({
                    quant: 1,
                    product_id: json.id,
                  });

                  setProducts(array);
                  console.log(
                    '-----------------------------------------------------'
                  );
                  console.log(array);
                  console.log('relation_id: ', market);

                  console.log('Res:  ---------------------------');
                  console.log(res.data);

                  console.log('Array: ------------------------------');
                  console.log(array);
                  setScanned(false);

                  // setProducts(array);
                } catch (e) {
                  console.log(e);
                  setScanned(false);
                }
              },
            },
            {
              text: 'Finalizar venta',
              onPress: async () => {
                setSells(sells ? sells + 1 : 1);
                setTotal(Total ? Total + json.price : json.price);

                try {
                  array = products;

                  array.push({
                    quant: 1,
                    product_id: json.id,
                  });

                  setProducts(array);
                  console.log(json);
                  console.log(array);
                  console.log('relation_id: ', market);

                  const res = await axios.post(
                    'https://www.market-app.xyz/api/v1/sell',
                    {
                      sells: array,
                      relation_id: market,
                    }
                  );
                  if (res.status == 200) {
                    Alert.alert(
                      'Venta confirmada',
                      'Venta confirmada, continua vendiendo',
                      [
                        {
                          text: 'aceptar',
                          onPress: () => {
                            setScanned(false);
                          },
                        },
                      ]
                    );
                  }
                  console.log(res.data);
                  console.log(arraySells);
                  setScanned(false);
                } catch (e) {
                  console.log(e);
                  setScanned(false);
                }
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      }
    }

    if (json.stock <= 0) {
      Alert.alert(
        'ERROR',
        'No hay suficiente stock...',
        [
          {
            title: 'Aceptar',
            onPress: null,
          },
        ],
        {
          cancelable: false,
        }
      );
      setScanned(false);
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
};
export default Prueba;
