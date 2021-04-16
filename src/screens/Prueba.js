import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../styles/styles.forms';
import axios from 'axios';

const Prueba = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  

  const handleBarCodeScanned =  ({ type, data }) => {
      setScanned(true);
      console.log(`https://www.market-app.xyz/api/v1/products?barcode=${data}`);
      const res =  axios.get(`https://www.market-app.xyz/api/v1/products?barcode=${data}`);
      console.log(res);
      //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      Alert.alert('¡Hey!', `Bar code: ${data}
Producto:
Precio:`, [
                                {
                                    text: 'Cancelar',
                                    onPress: () => {
                                        if(scanned) {
                                            setScanned(false);
                                        }
                                    }
                                },
                                {
                                    text: 'Agregar a lista',
                                    onPress: () => {
                                        if (!scanned) {
                                            setScanned(true);
                                        }
                                    }
                                },
                ],
                            {
                                cancelable: false,
                            }
                            );
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